package services

import (
	"context"
	"crypto/md5"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/dromara/carbon/v2"
	ge "github.com/enetx/g"
	"github.com/enetx/surf"
	"github.com/gogf/gf/v2/container/gset"
	"github.com/lieycn/signal-hub/internal/constants"
	"github.com/lieycn/signal-hub/internal/model"
	"github.com/lieycn/signal-hub/internal/model/g"
	"github.com/xframe-go/x/x"
	"gorm.io/gorm/clause"
)

type Libra struct {
	baseUrl string
}

func NewLibra() *Libra {
	return &Libra{
		baseUrl: "https://2libra.com",
	}
}

type (
	LibraConnectResp struct {
		C int64         `json:"c"`
		M string        `json:"m"`
		D LibraUserInfo `json:"d"`
		T int64         `json:"t"`
	}

	LibraUserInfo struct {
		AvatarURL                 string              `json:"avatar_url"`
		CanEditUsername           *bool               `json:"can_edit_username"`
		CanChangePasswordDirectly bool                `json:"can_change_password_directly"`
		CreatedAt                 string              `json:"created_at"`
		DisplayName               *string             `json:"display_name"`
		Email                     string              `json:"email"`
		Enable2fa                 bool                `json:"enable_2fa"`
		ID                        string              `json:"id"`
		Username                  string              `json:"username"`
		UserNumber                string              `json:"user_number"`
		EquippedBadges            []LibraBadge        `json:"equipped_badges"`
		IsPro                     bool                `json:"is_pro"`
		ProSponsorAmount365d      string              `json:"pro_sponsor_amount_365d"`
		InviteID                  string              `json:"invite_id"`
		IsGuardian                bool                `json:"is_guardian"`
		UserAttributes            LibraUserAttributes `json:"user_attributes"`
	}

	LibraBadge struct {
		ID         string           `json:"id"`
		UserID     string           `json:"user_id"`
		BadgeID    string           `json:"badge_id"`
		Badge      LibraBadgeDetail `json:"badge"`
		EquippedAt string           `json:"equipped_at"`
	}

	LibraBadgeDetail struct {
		ID          string `json:"id"`
		Code        string `json:"code"`
		Name        string `json:"name"`
		Description string `json:"description"`
		IconURL     string `json:"icon_url"`
		Level       int    `json:"level"`
	}

	LibraUserAttributes struct {
		ExperienceAttr string `json:"experience_attr"`
		DiligenceAttr  string `json:"diligence_attr"`
		KarmaAttr      string `json:"karma_attr"`
		CharmAttr      string `json:"charm_attr"`
		CraftAttr      string `json:"craft_attr"`
		LuckAttr       string `json:"luck_attr"`
	}
)

func (v Libra) Connect(ctx context.Context, config *model.PlatformConfig) (*model.Account, error) {
	if config.Libra == nil {
		return nil, ErrInvalidPlatformConfig
	}

	client := surf.NewClient().Builder().
		BearerAuth(ge.String(config.Libra.AccessToken)).
		Impersonate().Chrome().
		Build().Unwrap()

	resp := client.Get(ge.String(fmt.Sprintf("%s/api/users/info?fields=info,exp,coins", v.baseUrl))).Do()
	if !resp.IsOk() {
		return nil, resp.Err()
	}

	var result LibraConnectResp
	if err := resp.Ok().Body.JSON(&result); err != nil {
		return nil, err
	}
	if result.C != 0 {
		return nil, errors.New(result.M)
	}

	platformID := result.D.ID
	count, err := x.Model[model.Account]().Where(
		g.Account.Platform.Eq(constants.PlatformLibra),
		g.Account.PlatformID.Eq(platformID),
	).Count(ctx, "id")
	if err != nil {
		return nil, err
	}
	if count > 0 {
		return nil, fmt.Errorf("此账号已授权")
	}

	acc := model.Account{
		Platform:   constants.PlatformLibra,
		Name:       result.D.Username,
		Avatar:     result.D.AvatarURL,
		Config:     config,
		PlatformID: platformID,
	}
	tx := x.DB().Begin()
	if err := x.Model[model.Account](tx).Create(ctx, &acc); err != nil {
		tx.Rollback()
		return nil, err
	}

	member := model.Member{
		AccountID:        acc.ID,
		Platform:         constants.PlatformLibra,
		PlatformMemberId: platformID,
		Name:             result.D.Username,
		Avatar:           result.D.AvatarURL,
	}
	err = x.DB().WithContext(ctx).Clauses(clause.OnConflict{DoNothing: true}).Create(&member).Error
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	err = tx.Commit().Error
	return &acc, err
}

type (
	LibraMessageResp struct {
		C int64            `json:"c"`
		M string           `json:"m"`
		D LibraMessageData `json:"d"`
		T int64            `json:"t"`
	}

	LibraMessageData struct {
		List       []LibraMessage `json:"list"`
		Total      int64          `json:"total"`
		Page       int64          `json:"page"`
		Limit      int64          `json:"limit"`
		TotalPages int64          `json:"total_pages"`
	}

	LibraMessage struct {
		ID         string              `json:"id"`
		Type       string              `json:"type"`
		FromUserID *string             `json:"from_user_id"`
		FromUser   *LibraMessageUser   `json:"from_user"`
		RelatedID  *string             `json:"related_id"`
		Payload    json.RawMessage     `json:"payload"`
		IsRead     bool                `json:"is_read"`
		CreatedAt  string              `json:"created_at"`
		Emojis     map[string][]string `json:"emojis"`
	}

	LibraMessageUser struct {
		ID        string `json:"id"`
		Username  string `json:"username"`
		AvatarURL string `json:"avatar_url"`
		IsPro     bool   `json:"is_pro"`
	}
)

func (v Libra) SyncMessage(ctx context.Context, account *model.Account) ([]model.Message, error) {
	if account.Config.Libra == nil {
		return nil, ErrInvalidPlatformConfig
	}

	client := surf.NewClient().Builder().WithContext(ctx).
		BearerAuth(ge.String(account.Config.Libra.AccessToken)).
		Impersonate().Chrome().
		Build().Unwrap()

	page := 1
	var allMessages []model.Message

	for {
		resp := client.Get(ge.String(fmt.Sprintf("%s/api/notifications/list?page=%d", v.baseUrl, page))).Do()
		if !resp.IsOk() {
			return nil, resp.Err()
		}

		var result LibraMessageResp
		err := resp.Ok().Body.JSON(&result)
		if err != nil {
			return nil, err
		}
		if result.C != 0 {
			return nil, errors.New(result.M)
		}

		// Collect unique member IDs from messages
		memberIDs := gset.NewTSet[string]()
		for _, res := range result.D.List {
			if res.FromUser != nil {
				memberIDs.Add(res.FromUser.ID)
			}
		}

		var existingMembers []model.Member
		if memberIDs.Size() > 0 {
			existingMembers, err = x.Model[model.Member]().Where(
				g.Member.AccountID.Eq(account.ID),
				g.Member.PlatformMemberId.In(memberIDs.Slice()...),
			).Find(ctx)
			if err != nil {
				return nil, err
			}
			for _, member := range existingMembers {
				memberIDs.Remove(member.PlatformMemberId)
			}
		}

		if memberIDs.Size() > 0 {
			members, err := v.SyncMembers(ctx, account, result.D.List, memberIDs)
			if err != nil {
				return nil, err
			}
			existingMembers = append(existingMembers, members...)
		}

		memberIDMap := make(map[string]model.Member)
		for _, member := range existingMembers {
			memberIDMap[member.PlatformMemberId] = member
		}

		// Create messages with proper member references
		msgs := make([]model.Message, 0, len(result.D.List))
		for _, res := range result.D.List {
			// Parse payload based on notification type
			var payload map[string]interface{}
			if len(res.Payload) > 0 {
				if err := json.Unmarshal(res.Payload, &payload); err != nil {
					continue
				}
			}

			title := v.getNotificationTitle(res.Type, payload)
			content := v.getNotificationContent(res.Type, payload)

			var fromMemberID *uint64
			if res.FromUser != nil {
				fromMember, exists := memberIDMap[res.FromUser.ID]
				if exists {
					id := fromMember.ID
					fromMemberID = &id
				}
			}

			createdAt := carbon.Parse(res.CreatedAt)
			if createdAt.HasError() {
				continue
			}

			var memberID uint64
			if fromMemberID != nil {
				memberID = *fromMemberID
			}

			msgs = append(msgs, model.Message{
				AccountID:    account.ID,
				Platform:     constants.PlatformLibra,
				OriginID:     res.ID,
				Title:        title,
				Content:      content,
				SendAt:       createdAt,
				FromMemberId: memberID,
			})
		}

		// Batch insert messages
		if len(msgs) > 0 {
			err = x.DB().WithContext(ctx).Clauses(clause.OnConflict{
				DoNothing: true,
			}).CreateInBatches(&msgs, 20).Error
			if err != nil {
				return nil, err
			}
			allMessages = append(allMessages, msgs...)
		}

		// Check if there are more pages
		if page >= int(result.D.TotalPages) {
			break
		}
		page++
	}

	// Update last sync time
	_, err := x.Model[model.Account]().Where(g.Account.ID.Eq(account.ID)).Set(g.Account.LastSyncAt.Set(carbon.Now())).Update(ctx)
	if err != nil {
		return nil, err
	}

	return allMessages, nil
}

func (v Libra) SyncMembers(ctx context.Context, account *model.Account, messages []LibraMessage, newMembers *gset.TSet[string]) ([]model.Member, error) {
	members := make([]model.Member, 0)
	for _, message := range messages {
		if message.FromUser != nil && newMembers.Contains(message.FromUser.ID) {
			members = append(members, model.Member{
				AccountID:        account.ID,
				Platform:         constants.PlatformLibra,
				PlatformMemberId: message.FromUser.ID,
				Name:             message.FromUser.Username,
				Avatar:           v.getAvatarURL(message.FromUser),
			})
			newMembers.Remove(message.FromUser.ID)
		}
	}

	err := x.DB().WithContext(ctx).Clauses(clause.OnConflict{DoNothing: true}).CreateInBatches(&members, 20).Error
	return members, err
}

type LibraPlatformMemberInfo struct {
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

func (v Libra) getNotificationTitle(notifType string, payload map[string]interface{}) string {
	switch notifType {
	case "reply":
		if postTitle, ok := payload["postTitle"].(string); ok {
			return fmt.Sprintf("回复了你的主题：%s", postTitle)
		}
		return "回复了你的主题"
	case "mention":
		if postTitle, ok := payload["postTitle"].(string); ok {
			return fmt.Sprintf("在主题中提到了你：%s", postTitle)
		}
		return "在主题中提到了你"
	case "level_up":
		if message, ok := payload["message"].(string); ok {
			return message
		}
		return "等级提升"
	case "badge_unlocked":
		if badgeName, ok := payload["badge_name"].(string); ok {
			return fmt.Sprintf("解锁徽章：%s", badgeName)
		}
		return "解锁徽章"
	default:
		return notifType
	}
}

func (v Libra) getNotificationContent(notifType string, payload map[string]interface{}) string {
	switch notifType {
	case "reply":
		if commentText, ok := payload["commentText"].(string); ok {
			return commentText
		}
		return ""
	case "mention":
		if commentText, ok := payload["commentText"].(string); ok {
			return commentText
		}
		return ""
	case "level_up":
		if message, ok := payload["message"].(string); ok {
			return message
		}
		return ""
	case "badge_unlocked":
		if badgeName, ok := payload["badge_name"].(string); ok {
			return badgeName
		}
		return ""
	default:
		return ""
	}
}

func (v Libra) getAvatarURL(u *LibraMessageUser) string {
	if u.ID == "" || u.AvatarURL == "" {
		return ""
	}

	// 1. 解析 avatar_url
	parts := strings.Split(u.AvatarURL, "_")
	if len(parts) != 2 {
		return ""
	}

	ext := parts[0]
	timestamp := parts[1]

	// 2. md5(userID)
	sum := md5.Sum([]byte(u.ID))
	hash := fmt.Sprintf("%x", sum)

	// 3. 分片目录
	dir1 := hash[0:4]
	dir2 := hash[4:8]

	// 4. 拼 URL
	return fmt.Sprintf(
		"https://r2.2libra.com/cdn-cgi/image/width=128,height=128,fit=cover,format=auto/avatars/%s/%s/%s.%s?t=%s",
		dir1,
		dir2,
		u.ID,
		ext,
		timestamp,
	)
}
