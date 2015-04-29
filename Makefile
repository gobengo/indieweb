.PHONY: build

# For debug logs, default to only this lib's logs.
# Use DEBUG=* for all.
NODE?=iojs --harmony
NODEMON?=./node_modules/.bin/nodemon --exec "iojs --harmony"
# Source env vars from .env
ENV_FILE?=.env
ENV=env $$(cat $(ENV_FILE) | xargs)

default: build

build: node_modules

clean:
	rm -rf node_modules

# if package.json changes, install
node_modules: package.json
	npm install
	touch $@

server: build
	$(ENV) $(NODE) index.js

watch: build
	$(ENV) $(NODEMON) index.js

test: build
	npm test
