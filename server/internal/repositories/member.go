package repositories

import (
	"context"
	"sync"

	"github.com/lieycn/signal-hub/internal/model"
	"github.com/lieycn/signal-hub/internal/model/g"
	"github.com/xframe-go/x/repository"
	"gorm.io/gorm"
)

type MemberRepository[M any] struct {
	*repository.Repository[model.Member, uint64]
}

var _ repository.Interface[model.Member, uint64] = &MemberRepository[model.Member]{}

var NewMemberRepository = sync.OnceValue(func() *MemberRepository[model.Member] {
	return &MemberRepository[model.Member]{
		Repository: repository.New[model.Member, uint64](
			func(m model.Member) uint64 {
				return m.ID
			},
			repository.WithKeywordExpression[model.Member, uint64](func(tx *gorm.DB, keyword string) *gorm.DB {
				pattern := "%" + keyword + "%"
				return tx.Where(
					tx.WithContext(context.Background()).
						Or(g.Member.Name.Like(pattern)),
				)
			}),
		),
	}
})
