package handlers

import (
	"github.com/labstack/echo/v5"
	"github.com/lieywe/msghub/internal/model"
	"github.com/lieywe/msghub/internal/services"
	"github.com/xframe-go/x/responses"
	"github.com/xframe-go/x/x"
	"golang.org/x/sync/errgroup"
)

type Sync struct {
	responses.Base
}

func (s Sync) Handle(c *echo.Context) error {
	var (
		ctx = c.Request().Context()
	)

	accounts, err := x.Model[model.Account]().Find(ctx)
	if err != nil {
		return s.Failed(c, err)
	}

	errs := errgroup.Group{}

	for _, account := range accounts {
		errs.Go(func() error {
			driver, err := services.Driver(account.Platform)
			if err != nil {
				return err
			}

			if _, err := driver.SyncMessage(ctx, &account); err != nil {
				return err
			}
			return nil
		})
	}

	if err := errs.Wait(); err != nil {
		return s.Failed(c, err)
	}

	return s.Success(c, nil)
}
