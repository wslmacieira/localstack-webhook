SHELL := /bin/bash # define bash terminal
current_dir := $(shell pwd)
golang_dir := $(current_dir)/handlers/golang # define golang dir

start:
	docker compose up -d

stop:
	docker compose down

deploy:
	cd infra && terraform init && \
	terraform apply -var "LAMBDA_MOUNT_CWD=$(current_dir)" -auto-approve

build:
	cd $(golang_dir) && \
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o main main.go

nodemon:
	@npx nodemon --watch $(golang_dir) -e go,js --exec make build