import debug from 'debug';
import nconf from 'nconf';

const log = debug('indieweb/config');

export default (() => {
  const config = nconf
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
    config.file(configFile)
  }

  config
    .file(__dirname + '/defaults.json')

  return config
}())

