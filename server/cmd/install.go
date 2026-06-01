package cmd

import (
	"github.com/lieywe/msghub/internal/config"
	"github.com/lieywe/msghub/internal/model"
	"github.com/spf13/cobra"
	"github.com/xframe-go/x/x"
)

var InstallCmd = &cobra.Command{
	Use: "install",
	Run: func(cmd *cobra.Command, args []string) {
		config.Register()
		install()
	},
}

func install() {
	models := []any{
		model.Account{},
		model.Message{},
		model.Member{},
	}

	err := x.DB().Migrator().AutoMigrate(models...)
	if err != nil {
		x.Logger().Error(err)
		return
	}

	x.Logger().Info("Migration complete")
}
