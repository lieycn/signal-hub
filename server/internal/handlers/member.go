package handlers

import (
	"github.com/lieycn/signal-hub/internal/api"
	"github.com/lieycn/signal-hub/internal/model"
	"github.com/lieycn/signal-hub/internal/repositories"
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
