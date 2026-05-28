package model

import (
	"github.com/dromara/carbon/v2"
	"gorm.io/cli/gorm/field"
	"gorm.io/cli/gorm/genconfig"
)

var _ = genconfig.Config{
	OutPath: "internal/model/g",
	FieldNameMap: map[string]any{
		"time": field.Field[*carbon.Carbon]{},
	},
}
