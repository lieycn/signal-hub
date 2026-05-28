gen:
	gorm gen -i $(if $(MODEL),./internal/model/$(MODEL).go,./internal/model) -o ./internal/model/g

build:
	CGO_ENABLED=0 go build -trimpath -ldflags="-s -w -buildid="