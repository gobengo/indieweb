var log = require('debug')('indieweb/config');

var config = module.exports = require('nconf')
  .argv({
    config: {
      describe: "Path to config file to use for config values"
    },
    PORT: {
      describe: "Port to listen for HTTP traffic on",
    }
    // TODO: https.*
  })
  .env({
    separator: '_'
  })

var configFile = config.get('config');
if (configFile) {
  config = config.file(configFile)
}

config
  .file(__dirname + '/defaults.json')
