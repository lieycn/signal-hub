package handlers

import (
	"github.com/lieywe/msghub/internal/api"
	"github.com/lieywe/msghub/internal/model"
	"github.com/lieywe/msghub/internal/repositories"
	"github.com/xframe-go/x/handlers"
	"github.com/xframe-go/x/requests"
	"github.com/xframe-go/x/responses"
)

type Message struct {
	responses.Base
	*handlers.Handler[model.Message, api.CreateMessage, api.CreateMessage, uint64]
}

func NewMessage() *Message {
	return &Message{
		Handler: handlers.NewHandler[model.Message, api.CreateMessage, api.CreateMessage, uint64](
			repositories.NewMessageRepository(),
			handlers.BeforeFetch[model.Message, api.CreateMessage, api.CreateMessage, uint64](
				func(req *handlers.Context, param *requests.QueryParams) error {
					//ctx := req.Request().Context()
					//driver, err := services.Driver(constants.PlatformV2ex)
					//if err != nil {
					//	return err
					//}
					//
					//first, err := x.Model[model.Account]().First(ctx)
					//if err != nil {
					//	return err
					//}
					//_, err = driver.Messages(ctx, first.Config)
					//if err != nil {
					//	return err
					//}

					return nil
				},
			),
		),
	}
}
