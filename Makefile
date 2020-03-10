# Makefile

COMPOSE = docker-compose
DOCKER = docker


default: dev


.PHONY: help
help:
	@echo "Usage: make [build|dev]"
	

.PHONY: dev
dev:
	@echo "Entering dev environment.."
	$(DOCKER) run -it -v "$(PWD)/build/deno_linux_x64:/bin/deno" -v "$(PWD)/src:/data" -w /data  ubuntu:18.04 /bin/bash

.PHONY: test
test:
	@echo "Run Tests.."
	

.PHONY: format
format:
	@echo "Format the sourcecode"

.PHONY: run
run:
	$(COMPOSE) -f ./build/docker-compose.yml up


.PHONY: build
build:
	make -C $@

