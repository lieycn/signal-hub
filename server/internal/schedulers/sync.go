package schedulers

import (
	"context"

	"github.com/lieycn/signal-hub/internal/model"
	"github.com/lieycn/signal-hub/internal/services"
	"github.com/xframe-go/x/x"
	"golang.org/x/sync/errgroup"
)

type SyncMessage struct{}

func (m SyncMessage) Run() {
	ctx := context.Background()
	accounts, err := x.Model[model.Account]().Find(ctx)
	if err != nil {
		x.Logger().Error(err)
		return
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
		x.Logger().Error(err)
	}
}
