package services

import (
	"context"

	"github.com/lieywe/msghub/internal/model"
)

type PlatformDriver interface {
	Connect(ctx context.Context, config *model.PlatformConfig) (*model.Account, error)
	SyncMessage(ctx context.Context, account *model.Account) ([]model.Message, error)
}
