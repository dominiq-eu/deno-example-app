# Makefile

COMPOSE = docker-compose
DOCKER = docker
RUN = $(DOCKER) run -it -v "$(PWD)/build/deno_linux_x64:/bin/deno" -v "$(PWD)/src:/data" -w /data  ubuntu:18.04


default: help


.PHONY: help
help:
	@echo "Usage: make [build|dev|test|run]"
	@echo "\t build  Build container"
	@echo "\t dev    Enter dev environment"
	@echo "\t test   Run tests"
	@echo "\t run    Run program"
	

.PHONY: dev
dev:
	@echo "Entering dev environment.."
	$(RUN) /bin/bash

.PHONY: test
test:
	@echo "Run Tests.."
	$(RUN) deno test
	

.PHONY: run
run:
	$(RUN) deno --allow-read main.ts


.PHONY: build
build:
	make -C $@

