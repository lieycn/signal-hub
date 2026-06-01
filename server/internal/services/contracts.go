package services

import (
	"context"

	"github.com/lieycn/signal-hub/internal/model"
)

type PlatformDriver interface {
	Connect(ctx context.Context, config *model.PlatformConfig) (*model.Account, error)
	SyncMessage(ctx context.Context, account *model.Account) ([]model.Message, error)
}
