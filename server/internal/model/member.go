package model

import (
	"github.com/dromara/carbon/v2"
	"gorm.io/gorm"
)

type Member struct {
	ID               uint64         `gorm:"primary_key;auto_increment" json:"id"`
	AccountID        uint64         `gorm:"uniqueIndex:uniq_acc_member" json:"account_id"`
	Platform         string         `gorm:"index" json:"platform"`
	PlatformMemberId string         `gorm:"size:32;uniqueIndex:uniq_acc_member" json:"platform_member_id"`
	Name             string         `gorm:"size:255" json:"name"`
	Avatar           string         `gorm:"size:255" json:"avatar"`
	CreatedAt        *carbon.Carbon `json:"created_at"`
	UpdatedAt        *carbon.Carbon `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `json:"-"`

	// Associations
	Account   *Account   `json:"account,omitempty" gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE"`
	Messages  []Message  `json:"messages,omitempty" gorm:"foreignKey:FromMemberId;constraint:OnDelete:SET NULL"`
}
