package repositories

import (
	"context"
	"sync"

	"github.com/lieycn/signal-hub/internal/model"
	"github.com/lieycn/signal-hub/internal/model/g"
	"github.com/xframe-go/x/repository"
	"gorm.io/gorm"
)

type AccountRepository[M any] struct {
	*repository.Repository[model.Account, uint64]
}

var _ repository.Interface[model.Account, uint64] = &AccountRepository[model.Account]{}

var NewAccountRepository = sync.OnceValue(func() *AccountRepository[model.Account] {
	return &AccountRepository[model.Account]{
		Repository: repository.New[model.Account, uint64](
			func(m model.Account) uint64 {
				return m.ID
			},
			repository.WithKeywordExpression[model.Account, uint64](func(tx *gorm.DB, keyword string) *gorm.DB {
				pattern := "%" + keyword + "%"
				return tx.Where(
					tx.WithContext(context.Background()).
						Or(g.Account.Name.Like(pattern)),
				)
			}),
		),
	}
})
