package config

import (
	"github.com/lieycn/signal-hub/internal/schedulers"
	"github.com/xframe-go/x/scheduler"
	"github.com/xframe-go/x/x"
)

func registerScheduler() {
	x.RegisterScheduler(func(schedule *scheduler.Scheduler) {
		schedule.Schedule(scheduler.EveryMinutes(5), schedulers.SyncMessage{})
	})
}
