package model

import (
	"github.com/dromara/carbon/v2"
	"gorm.io/gorm"
)

type Account struct {
	ID         uint64          `json:"id"`
	Platform   string          `json:"platform" gorm:"size:32;not null"`
	Name       string          `json:"name" gorm:"size:64;not null"`
	Avatar     string          `json:"avatar" gorm:"size:255"`
	PlatformID string          `json:"platform_id" gorm:"size:64;not null"`
	Config     *PlatformConfig `json:"config" gorm:"serializer:json"`
	IsActive   *bool           `json:"is_active" gorm:"default:true"`
	LastSyncAt *carbon.Carbon  `json:"last_sync_at" gen:"time"`
	CreatedAt  carbon.Carbon   `json:"created_at"`
	UpdatedAt  carbon.Carbon   `json:"updated_at"`
	DeletedAt  gorm.DeletedAt  `json:"-"`

	// Associations
	Members  []Member  `json:"members,omitempty" gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE"`
	Messages []Message `json:"messages,omitempty" gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE"`
}

type PlatformConfig struct {
	V2ex *V2exConfig `json:"v2ex,omitempty"`
}

type V2exConfig struct {
	PersonalAccessToken string `json:"personal_access_token"`
}
