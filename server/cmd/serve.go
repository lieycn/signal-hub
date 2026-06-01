package cmd

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/lieycn/signal-hub/internal/config"
	"github.com/lieycn/signal-hub/internal/routes"
	"github.com/spf13/cobra"
	"github.com/xframe-go/x/env"
	"github.com/xframe-go/x/x"
)

var ServeCmd = &cobra.Command{
	Use: "serve",
	Run: func(cmd *cobra.Command, args []string) {
		db := env.String("DB_DATABASE", "signal-hub")
		_, err := os.Stat(fmt.Sprintf("%s.db", db))

		config.Register()

		if errors.Is(err, os.ErrNotExist) {
			install()
		}

		routes.Register()

		ctx, stop := context.WithCancel(context.Background())

		x.AddShutdownListener(func() {
			stop()
			<-ctx.Done()
		})

		go x.Server().Run(ctx)

		x.Wait()
	},
}
