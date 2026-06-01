package routes

import (
	"github.com/labstack/echo/v5"
	"github.com/lieywe/msghub/internal/handlers"
	"github.com/lieywe/msghub/public"
	"github.com/xframe-go/x/x"
)

func Register() {
	v1 := x.Server().Group("/api/v1")

	x.Server().StaticFS("/", echo.MustSubFS(public.Static, "static"))

	x.Server().Resource(v1, "accounts", handlers.NewAccount())
	x.Server().Resource(v1, "messages", handlers.NewMessage())
	x.Server().Resource(v1, "members", handlers.NewMember())

	x.Server().POST("/api/v1/sync", handlers.Sync{}.Handle)
}
