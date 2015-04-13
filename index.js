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
 * Create an indieweb server and listen on env.PORT
 */
function main() {
  const getPort = require('./lib/get-port');
  var configPort = config.get('PORT');
  Promise.resolve(configPort || getPort())
  .then(function (port) {
    log('listening on port '+port)
    createServer().listen(port);    
  })
}
