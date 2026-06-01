package routes

import (
	"github.com/labstack/echo/v5/middleware"
	"github.com/lieycn/signal-hub/internal/handlers"
	"github.com/lieycn/signal-hub/public"
	"github.com/xframe-go/x/x"
)

func Register() {
	v1 := x.Server().Group("/api/v1")

	x.Server().Use(middleware.StaticWithConfig(middleware.StaticConfig{
		HTML5:      true,
		Root:       "static",
		Filesystem: public.Static,
	}))

	x.Server().Resource(v1, "accounts", handlers.NewAccount())
	x.Server().Resource(v1, "messages", handlers.NewMessage())
	x.Server().Resource(v1, "members", handlers.NewMember())

	x.Server().POST("/api/v1/sync", handlers.Sync{}.Handle)
}
