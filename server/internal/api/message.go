package api

import "github.com/lieywe/msghub/internal/model"

type CreateMessage struct {
}

func (a CreateMessage) ToModel() model.Message {
	return model.Message{}
}
