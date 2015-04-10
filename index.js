var log = require('debug')('indieweb');

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
  var port = process.env.PORT || 3000
  log('listening on port '+port)
  createServer().listen(port);
}
