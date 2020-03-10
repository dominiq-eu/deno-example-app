# Makefile

COMPOSE = docker-compose
DOCKER = docker
RUN = $(DOCKER) run -it -v "$(PWD)/dev-env/deno_linux_x64:/bin/deno" -v "$(PWD)/dev-env/cache:/root/.cache/deno" -v "$(PWD)/src:/data" -w /data  ubuntu:18.04


default: help


.PHONY: help
help:
	@echo "Usage: make [dev|test|run]"
	@echo "\t dev    Enter dev environment"
	@echo "\t test   Run tests"
	@echo "\t run    Run program"
	

.PHONY: dev
dev:
	@echo "Entering dev environment.."
	@$(RUN) /bin/bash

.PHONY: test
test:
	@$(RUN) deno test
	

.PHONY: run
run:
	@$(RUN) deno --allow-read main.ts

