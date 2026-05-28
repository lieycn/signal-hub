package handlers

import (
	"github.com/lieywe/msghub/internal/api"
	"github.com/lieywe/msghub/internal/model"
	"github.com/lieywe/msghub/internal/repositories"
	"github.com/xframe-go/x/handlers"
	"github.com/xframe-go/x/responses"
)

type Member struct {
	responses.Base
	*handlers.Handler[model.Member, api.CreateMember, api.CreateMember, uint64]
}

func NewMember() *Member {
	return &Member{
		Handler: handlers.NewHandler[model.Member, api.CreateMember, api.CreateMember, uint64](
			repositories.NewMemberRepository(),
		),
	}
}
