var log = require('debug')('indieweb/config');

var config = module.exports = require('nconf')
  .argv({
    config: {
      describe: "Path to config file to use for config values"
    },
    port: {
      describe: "Port to listen for HTTP traffic on",
    },
    'https_only': {
      describe: "Whether the web server should redirect all http requests to https"
    },
    'https_only_trust_x_forwarded_proto': {
      describe: "Whether the web server should trust request.headers['x-forwarded-proto'] when determining whether a request was sent over HTTPS"
    }
  })
  .env()

var configFile = config.get('config');
if (configFile) {
  config = config.file(configFile)
}

config
  .file(__dirname + '/defaults.json')
