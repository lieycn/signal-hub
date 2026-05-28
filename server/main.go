package main

import (
	"github.com/lieywe/msghub/cmd"
	"github.com/xframe-go/x/x"
)

func main() {
	x.New().
		AddCommand(cmd.ServeCmd).
		AddCommand(cmd.InstallCmd).
		AddCommand(cmd.JWTCmd).
		Start()
}
