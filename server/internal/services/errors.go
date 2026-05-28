package services

import "errors"

var (
	ErrNotSupportedPlatform = errors.New("platform not supported")
	
	ErrInvalidPlatformConfig = errors.New("invalid platform config")
)
