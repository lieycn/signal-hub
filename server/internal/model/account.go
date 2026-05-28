package model

import (
	"github.com/dromara/carbon/v2"
	"gorm.io/gorm"
)

type Account struct {
	ID         uint64          `json:"id"`
	Platform   string          `json:"platform"`
	Name       string          `json:"name"`
	Avatar     string          `json:"avatar"`
	PlatformID string          `json:"platform_id"`
	Config     *PlatformConfig `json:"config" gorm:"serializer:json"`
	LastSyncAt *carbon.Carbon  `json:"last_sync_at" gen:"time"`
	CreatedAt  carbon.Carbon   `json:"created_at"`
	UpdatedAt  carbon.Carbon   `json:"updated_at"`
	DeletedAt  gorm.DeletedAt  `json:"-"`

	// Associations
	Members   []Member   `json:"members,omitempty" gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE"`
	Messages  []Message  `json:"messages,omitempty" gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE"`
}

type PlatformConfig struct {
	V2ex *V2exConfig `json:"v2ex,omitempty"`
}

type V2exConfig struct {
	PersonalAccessToken string `json:"personal_access_token"`
}
