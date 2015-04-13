.PHONY: build

# For debug logs, default to only this lib's logs.
# Use DEBUG=* for all.
DEBUG?=indieweb*
NODE?=iojs --harmony
NODEMON?=./node_modules/.bin/nodemon --exec "iojs --harmony"

default: build

build: node_modules

clean:
	rm -rf node_modules

# if package.json changes, install
node_modules: package.json
	npm install
	touch $@

server: build
	DEBUG=$(DEBUG) $(NODE) index.js

watch: build
	DEBUG=$(DEBUG) $(NODEMON) index.js

test: build config.test.json
	npm test
