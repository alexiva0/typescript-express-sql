NODE_MODULES_BIN := node_modules/.bin
WEBPACK=$(NODE_MODULES_BIN)/webpack
CONCURRENTLY=$(NODE_MODULES_BIN)/concurrently
NODEMON=$(NODE_MODULES_BIN)/nodemon
TSC=$(NODE_MODULES_BIN)/tsc
ESLINT=$(NODE_MODULES_BIN)/eslint

.PHONY: build-dev
build-dev:
	@MODE="development" $(WEBPACK) --watch

.PHONY: dev-server
dev-server:
	@$(NODEMON) dist/bundle.js

.PHONY: dev
dev:
	@MODE="development" NODEMON=true $(WEBPACK)

.PHONY: lint
lint:
	@$(ESLINT) . --ext .ts,.js --quiet
