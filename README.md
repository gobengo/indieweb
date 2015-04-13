# indieweb

A JavaScript library (and runnable server/process) for hosting your own [#indieweb](http://indiewebcamp.com/).

## What is an indieweb?

Great question. That has an evolving answer.

Currently
* Serve HTTP at the / route

Future
* idk maybe some articles or something
* [MicroPub](http://indiewebcamp.com/Micropub)? Is that a thing?
* [Social API](https://www.w3.org/wiki/Socialwg/Social_API/Sorting_user_stories)s

## Run it

`make server`

Restart on file changes with `make watch`.

### Configuration

Configuration is accomplished with both config files (in [./config](./config)) and environment variables. Environment Variables have a higher priority.

Configuration defaults are loaded from [defaults.json](./config/defaults.json).

Accepted configuration parameters:

* `indieweb` - General settings that are passed to all modules
  * `.domain` - Public domain of your indieweb
  * `.me` - A JSON Object describing the owner of this site. Currently this uses a JSON-LD Serialization of an [AS Person](http://www.w3.org/TR/2015/WD-activitystreams-vocabulary-20150129/#dfn-person).
* `indieweb-home` - Settings for the homepage module
  * `.title` - Title of the page
* `DEBUG` - Exactly as described in [debug README](https://www.npmjs.com/package/debug). `DEBUG=*` to show all logs.
* `config` - Path to config file other than defaults.json. `config=/path/to/config.json make server`
* `PORT` - Port to listen for HTTP traffic on
* `findPortBase` - If no `PORT`, [portfinder](https://www.npmjs.com/package/portfinder) will start at this port and look 1 by 1 to find an open port
* `https` - Settings for HTTPS support
  * `.require` - Require HTTPS. All requests over http will be redirected to https.
  * `.trustXForwardedProto` - If incoming protocol is 'http', but the request has header for 'X-Forwarded-Proto: https', still treat it as if https. [Relevant StackOverflow](https://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect)

## Use in another webapp

If you prefer, you can use `indieweb` as a library.

Install with `npm install --save indieweb`.

Use like any other express app.
* TODO: easily interop with other patterns like koa

```javascript
const yourApp = require('express')();
const indiewebConfig = {};
yourApp.use('/indieweb', require('indieweb')(indiewebConfig))
```

## Want a feature?

File an issue
