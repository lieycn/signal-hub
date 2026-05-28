package repositories

import (
	"context"
	"sync"

	"github.com/lieywe/msghub/internal/model"
	"github.com/lieywe/msghub/internal/model/g"
	"github.com/xframe-go/x/repository"
	"gorm.io/gorm"
)

type MessageRepository[M any] struct {
	*repository.Repository[model.Message, uint64]
}

var _ repository.Interface[model.Message, uint64] = &MessageRepository[model.Message]{}

var NewMessageRepository = sync.OnceValue(func() *MessageRepository[model.Message] {
	return &MessageRepository[model.Message]{
		Repository: repository.New[model.Message, uint64](
			func(m model.Message) uint64 {
				return m.ID
			},
			repository.WithKeywordExpression[model.Message, uint64](func(tx *gorm.DB, keyword string) *gorm.DB {
				pattern := "%" + keyword + "%"
				return tx.Where(
					tx.WithContext(context.Background()).
						Or(g.Message.Title.Like(pattern)),
				)
			}),
		),
	}
})
