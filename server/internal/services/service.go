package services

import "github.com/lieycn/signal-hub/internal/constants"

var drivers = map[string]PlatformDriver{
	constants.PlatformV2ex:  NewV2ex(),
	constants.PlatformLibra: NewLibra(),
}

func Driver(platform string) (PlatformDriver, error) {
	driver, ok := drivers[platform]
	if !ok {
		return nil, ErrNotSupportedPlatform
	}
	return driver, nil
}
