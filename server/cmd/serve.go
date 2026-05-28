package cmd

import (
	"context"

	"github.com/lieywe/msghub/internal/config"
	"github.com/lieywe/msghub/internal/routes"
	"github.com/spf13/cobra"
	"github.com/xframe-go/x/x"
)

var ServeCmd = &cobra.Command{
	Use: "serve",
	Run: func(cmd *cobra.Command, args []string) {
		config.Register()

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
