var log = require('debug')('indieweb');
const xtend = require('xtend');
const HomePage = require('./lib/indieweb-home');

/**
 * Create an indieweb server
 */
var createServer = module.exports = function (config) {
  var app = require('express')()

  // Require HTTPS?
  if (config.https && config.https.require) {
    log('Configuring to require HTTPS')
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
  Promise.resolve(config.PORT || getPort(config.findPortBase))
  .then(function (port) {
    log('listening for HTTP on port '+port)
    createServer(config).listen(port);    
  })
  .then(null, function (err) {
    console.error(err);
    process.exit(1);
  })
}
