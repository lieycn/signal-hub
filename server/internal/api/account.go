package api

import "github.com/lieycn/signal-hub/internal/model"

type CreateAccount struct {
	Platform string                `json:"platform" v:"required"`
	Config   *model.PlatformConfig `json:"config" v:"required"`
}

func (a CreateAccount) ToModel() model.Account {
	return model.Account{
		Platform: a.Platform,
		Config:   a.Config,
	}
}

type UpdateAccount struct {
	IsActive *bool `json:"is_active"`
}

func (a UpdateAccount) ToModel() model.Account {
	return model.Account{
		IsActive: a.IsActive,
	}
}
