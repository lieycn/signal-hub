package main

import (
	"github.com/dromara/carbon/v2"
	"github.com/lieywe/msghub/cmd"
	"github.com/xframe-go/x/x"
)

func init() {
	carbon.SetTimezone(carbon.Shanghai)
}

func main() {
	x.New().
		AddCommand(cmd.ServeCmd).
		AddCommand(cmd.InstallCmd).
		AddCommand(cmd.JWTCmd).
		Start()
}
