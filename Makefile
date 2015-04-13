.PHONY: build

# For node debug, default to only this lib's logs.
# Use DEBUG=* for all.
NODE?=iojs --harmony
DEBUG?=indieweb*

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
	DEBUG=$(DEBUG) nodemon index.js

test: build config.test.json
	npm test
