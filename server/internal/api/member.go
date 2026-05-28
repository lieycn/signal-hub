package api

import "github.com/lieywe/msghub/internal/model"

type CreateMember struct {
}

func (a CreateMember) ToModel() model.Member {
	return model.Member{}
}
