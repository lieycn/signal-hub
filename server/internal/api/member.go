package api

import "github.com/lieycn/signal-hub/internal/model"

type CreateMember struct {
}

func (a CreateMember) ToModel() model.Member {
	return model.Member{}
}
