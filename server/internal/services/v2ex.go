package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/dromara/carbon/v2"
	ge "github.com/enetx/g"
	"github.com/enetx/surf"
	"github.com/gogf/gf/v2/container/gmap"
	"github.com/lieywe/msghub/internal/constants"
	"github.com/lieywe/msghub/internal/model"
	"github.com/lieywe/msghub/internal/model/g"
	"github.com/spf13/cast"
	"github.com/xframe-go/x/x"
	"gorm.io/gorm/clause"
)

type V2ex struct {
	baseUrl string
}

type (
	ConnectResp struct {
		Success bool       `json:"success"`
		Message string     `json:"message"`
		Result  MemberInfo `json:"result"`
	}

	MemberInfo struct {
		Id            int    `json:"id"`
		Username      string `json:"username"`
		Url           string `json:"url"`
		Website       string `json:"website"`
		Twitter       string `json:"twitter"`
		Psn           string `json:"psn"`
		Github        string `json:"github"`
		Btc           string `json:"btc"`
		Location      string `json:"location"`
		Tagline       string `json:"tagline"`
		Bio           string `json:"bio"`
		AvatarMini    string `json:"avatar_mini"`
		AvatarNormal  string `json:"avatar_normal"`
		AvatarLarge   string `json:"avatar_large"`
		AvatarXlarge  string `json:"avatar_xlarge"`
		AvatarXxlarge string `json:"avatar_xxlarge"`
		Created       int    `json:"created"`
		LastModified  int    `json:"last_modified"`
		Pro           int    `json:"pro"`
	}
)

func NewV2ex() *V2ex {
	return &V2ex{
		baseUrl: "https://www.v2ex.com",
	}
}

func (v V2ex) Connect(ctx context.Context, config *model.PlatformConfig) (*model.Account, error) {
	if config.V2ex == nil {
		return nil, ErrInvalidPlatformConfig
	}

	client := surf.NewClient().Builder().
		BearerAuth(ge.String(config.V2ex.PersonalAccessToken)).
		Impersonate().Chrome().
		Build().Unwrap()

	resp := client.Get(ge.String(fmt.Sprintf("%s/api/v2/member", v.baseUrl))).Do()
	if !resp.IsOk() {
		return nil, resp.Err()
	}

	var result ConnectResp
	if err := resp.Ok().Body.JSON(&result); err != nil {
		return nil, err
	}
	if !result.Success {
		return nil, errors.New(result.Message)
	}

	acc := model.Account{
		Platform:   constants.PlatformV2ex,
		Name:       result.Result.Username,
		Avatar:     result.Result.AvatarNormal,
		Config:     config,
		PlatformID: cast.ToString(result.Result.Id),
	}
	err := x.Model[model.Account]().Create(ctx, &acc)
	if err != nil {
		return nil, err
	}

	return &acc, nil
}

type (
	MessageResp struct {
		Success bool      `json:"success"`
		Message string    `json:"message"`
		Result  []Message `json:"result"`
	}

	Message struct {
		ID              uint64 `json:"id"`
		MemberId        uint64 `json:"member_id"`
		ForMemberId     uint64 `json:"for_member_id"`
		Text            string `json:"text"`
		Payload         string `json:"payload"`
		PayloadRendered string `json:"payload_rendered"`
		Created         int64  `json:"created"`
		Member          struct {
			Username string `json:"username"`
		} `json:"member"`
	}
)

func (v V2ex) SyncMessage(ctx context.Context, account *model.Account) ([]model.Message, error) {
	if account.Config.V2ex == nil {
		return nil, ErrInvalidPlatformConfig
	}

	client := surf.NewClient().Builder().WithContext(ctx).
		BearerAuth(ge.String(account.Config.V2ex.PersonalAccessToken)).
		Impersonate().Chrome().
		Build().Unwrap()

	resp := client.Get(ge.String(fmt.Sprintf("%s/api/v2/notifications", v.baseUrl))).Do()
	if !resp.IsOk() {
		return nil, resp.Err()
	}

	var result MessageResp
	err := resp.Ok().Body.JSON(&result)
	if err != nil {
		return nil, err
	}

	members := gmap.NewKVMap[string, model.Member]()
	for _, res := range result.Result {
		platformMemberId := cast.ToString(res.MemberId)
		members.Set(cast.ToString(res.MemberId), model.Member{
			Platform:         constants.PlatformV2ex,
			PlatformMemberId: platformMemberId,
			Name:             res.Member.Username,
			AccountID:        account.ID,
		})
	}

	mem := members.Values()

	err = x.DB().Clauses(clause.OnConflict{
		DoNothing: true,
		DoUpdates: clause.AssignmentColumns([]string{"name"}),
	}).CreateInBatches(&mem, 100).Error
	if err != nil {
		return nil, err
	}

	memberMap := gmap.NewKVMap[string, model.Member]()
	for _, m := range mem {
		memberMap.Set(m.PlatformMemberId, m)
	}

	msgs := make([]model.Message, 0, len(result.Result))
	for _, res := range result.Result {
		title, err := CompleteRelativeURLs(res.Text, v.baseUrl)
		if err != nil {
			return nil, err
		}
		content, err := CompleteRelativeURLs(res.PayloadRendered, v.baseUrl)
		if err != nil {
			return nil, err
		}
		msgs = append(msgs, model.Message{
			AccountID:    account.ID,
			Platform:     constants.PlatformV2ex,
			OriginID:     cast.ToString(res.ID),
			Title:        title,
			Content:      content,
			SendAt:       carbon.CreateFromTimestamp(res.Created),
			FromMemberId: memberMap.Get(cast.ToString(res.MemberId)).ID,
		})
	}

	err = x.DB().WithContext(ctx).Clauses(clause.OnConflict{
		DoNothing: true,
	}).CreateInBatches(&msgs, 20).Error
	if err != nil {
		return nil, err
	}

	_, err = x.Model[model.Account]().Where(g.Account.ID.Eq(account.ID)).Set(g.Account.LastSyncAt.Set(carbon.Now())).Update(ctx)
	if err != nil {
		return nil, err
	}

	return msgs, nil
}

type PlatformMemberInfo struct {
	Id             int    `json:"id"`
	Username       string `json:"username"`
	Url            string `json:"url"`
	Website        string `json:"website"`
	Twitter        string `json:"twitter"`
	Psn            string `json:"psn"`
	Github         string `json:"github"`
	Btc            string `json:"btc"`
	Location       string `json:"location"`
	Tagline        string `json:"tagline"`
	Bio            string `json:"bio"`
	AvatarMini     string `json:"avatar_mini"`
	AvatarNormal   string `json:"avatar_normal"`
	AvatarLarge    string `json:"avatar_large"`
	AvatarXlarge   string `json:"avatar_xlarge"`
	AvatarXxlarge  string `json:"avatar_xxlarge"`
	AvatarXxxlarge string `json:"avatar_xxxlarge"`
	Created        int    `json:"created"`
	LastModified   int    `json:"last_modified"`
	Pro            int    `json:"pro"`
	Status         string `json:"status"`
}

func (v V2ex) syncMemberInfo(ctx context.Context, account *model.Account, memberName string) (*model.Member, error) {
	if account.Config.V2ex == nil {
		return nil, ErrInvalidPlatformConfig
	}

	client := surf.NewClient().Builder().WithContext(ctx).
		BearerAuth(ge.String(account.Config.V2ex.PersonalAccessToken)).
		Impersonate().Chrome().
		Build().Unwrap()

	resp := client.Get(ge.String(fmt.Sprintf("%s/api/members/show.json?username=%s", v.baseUrl, memberName))).Do()
	if !resp.IsOk() {
		return nil, resp.Err()
	}

	var info PlatformMemberInfo
	if err := resp.Ok().Body.JSON(&info); err != nil {
		return nil, err
	}

	return &model.Member{
		AccountID:        account.ID,
		Platform:         constants.PlatformV2ex,
		PlatformMemberId: cast.ToString(info.Id),
		Name:             info.Username,
		Avatar:           info.AvatarNormal,
	}, nil
}
