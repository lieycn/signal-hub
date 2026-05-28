package config

import (
	"github.com/xframe-go/x/env"
	"github.com/xframe-go/x/server"
	"github.com/xframe-go/x/x"
)

func registerServer() {
	x.RegisterServer(func() server.Config {
		return server.Config{
			Port: env.Int("SERVER_PORT", 8080),
		}
	})
}
