package handlers

import (
	"context"

	"github.com/labstack/echo/v5"
	"github.com/lieywe/msghub/internal/api"
	"github.com/lieywe/msghub/internal/model"
	"github.com/lieywe/msghub/internal/repositories"
	"github.com/lieywe/msghub/internal/services"
	"github.com/xframe-go/x/handlers"
	"github.com/xframe-go/x/responses"
	"github.com/xframe-go/x/x"
)

type Account struct {
	responses.Base
	*handlers.Handler[model.Account, api.CreateAccount, api.UpdateAccount, uint64]
}

func NewAccount() *Account {
	return &Account{
		Handler: handlers.NewHandler[model.Account, api.CreateAccount, api.UpdateAccount, uint64](
			repositories.NewAccountRepository(),
		),
	}
}

func (a *Account) Create(c *echo.Context) error {
	var (
		req = handlers.NewContext(c)
		cfg api.CreateAccount
		ctx = c.Request().Context()
	)

	if err := req.Validated(&cfg); err != nil {
		return a.Failed(c, err)
	}

	driver, err := services.Driver(cfg.Platform)
	if err != nil {
		return a.Failed(c, err)
	}

	account, err := driver.Connect(ctx, cfg.Config)
	if err != nil {
		return a.Failed(c, err)
	}

	go func() {
		driver, err = services.Driver(account.Platform)
		if err != nil {
			x.Logger().Error(err)
			return
		}

		if _, err = driver.SyncMessage(context.Background(), account); err != nil {
			x.Logger().Error(err)
			return
		}
	}()

	return a.Success(c, account)
}
