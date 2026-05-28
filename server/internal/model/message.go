package model

import "github.com/dromara/carbon/v2"

type Message struct {
	ID           uint64         `json:"id" gorm:"primary_key"`
	AccountID    uint64         `json:"account_id" gorm:"uniqueIndex:uniq_account_origin"`
	Platform     string         `json:"platform" gorm:"size:64;uniqueIndex:uniq_account_origin"`
	FromMemberId uint64         `json:"from_member_id"`
	OriginID     string         `json:"origin_id" gorm:"size:64;uniqueIndex:uniq_account_origin"`
	Title        string         `json:"title" gorm:"size:1024"`
	Content      string         `json:"content" gorm:"text"`
	SendAt       *carbon.Carbon `json:"send_at" gen:"time"`
	CreatedAt    carbon.Carbon  `json:"created_at"`
	UpdatedAt    carbon.Carbon  `json:"updated_at"`

	// Associations
	Account     *Account `json:"account,omitempty" gorm:"foreignKey:AccountID;constraint:OnDelete:CASCADE"`
	FromMember  *Member  `json:"from_member,omitempty" gorm:"foreignKey:FromMemberId;constraint:OnDelete:SET NULL"`
}
