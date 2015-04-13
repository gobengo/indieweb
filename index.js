var log = require('debug')('indieweb');
var config = require('./config');

/**
 * Create an indieweb server
 */
var createServer = module.exports = function () {
  var app = require('express')()
  var msg = "Is this the indieweb?";
  app.get('/', function (req, res, next) {
    res.send(msg)
  });
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
