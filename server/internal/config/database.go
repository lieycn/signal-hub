package config

import (
	"github.com/xframe-go/x/db"
	"github.com/xframe-go/x/env"
	"github.com/xframe-go/x/x"
)

func registerDB() {
	x.RegisterDB(func() db.Config {
		return db.Config{
			Databases: map[string]db.DriverConf{
				"default": {
					Driver:   env.String("DB_DRIVER", "sqlite"),
					Host:     env.String("DB_HOST", "127.0.0.1"),
					Port:     uint(env.Int("DB_PORT", 3306)),
					Username: env.String("DB_USERNAME", "root"),
					Password: env.String("DB_PASSWORD", ""),
					DB:       env.String("DB_DATABASE", "signal-hub"),
					Charset:  env.String("DB_CHARSET", "utf8mb4"),
					Debug:    env.Bool("DB_DEBUG", true),
				},
			},
		}
	})
}
