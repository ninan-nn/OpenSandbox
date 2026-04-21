.PHONY: all build vet test lint

all: build vet test

build:
	go build ./...

vet:
	go vet ./...

test:
	go test -v ./...

lint:
	@which staticcheck >/dev/null 2>&1 && staticcheck ./... || echo "staticcheck not installed — skipping lint"
