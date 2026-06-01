package api

import "github.com/lieycn/signal-hub/internal/model"

type CreateMessage struct {
}

func (a CreateMessage) ToModel() model.Message {
	return model.Message{}
}
