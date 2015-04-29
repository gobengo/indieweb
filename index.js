'use strict';
const log = require('debug')('indieweb');
const xtend = require('xtend');
const HomePage = require('./lib/indieweb-home');

/**
 * Create an indieweb server
 */
var createServer = module.exports = function (config) {
  var app = require('express')()

  // Require HTTPS?
  if (config.https && config.https.require) {
    log('will redirect HTTP -> HTTPS')
    app.use(require('express-sslify').HTTPS(config.https.trustXForwardedProto))    
  }

  // Homepage
  app.use('/', new HomePage(xtend(
    config['indieweb-home'],
    {
      indieweb: config.indieweb
    }
  )).express())

  return app;
}

if (require.main === module) {
  main();
}

/**
 * Create an indieweb server and listen on config.PORT
 * If a port is not configured, find one
 */
function main() {
  const config = require('./config').get();
  const getPort = require('./lib/get-port');
  const indiewebServer = createServer(config);
  let httpPort;

  Promise.resolve(config.PORT || getPort(config.findPortBase))
  .then(function (port) {
    httpPort = port;
    // listen for http
    indiewebServer
      .listen(httpPort, function () {
        log('listening for HTTP on port '+httpPort)
      });
  })
  .then(function () {
    // maybe listen for https
    const fs = require('fs');
    const https = require('https');
    const httpsConfig = config.https;

    if ( ! (config.https && config.https.listen)) {
      // shouldn't listen on separate port for https
      return;
    }
    
    const httpsOpts = {
      key: fs.readFileSync(config.https.key),
      cert: fs.readFileSync(config.https.cert)
    };
    const httpsPort = config.https.port || (httpPort +1)
    https
      .createServer(httpsOpts, indiewebServer)
      .listen(httpsPort, function () {
        log('listening for HTTPS on port '+httpsPort)
      });
  })
  .then(null, function (err) {
    console.error(err);
    process.exit(1);
  })
}
