import express from 'express';
import HomePage from './indieweb-home';
import { HTTPS } from 'express-sslify';
import xtend from 'xtend';

/**
 * Create an indieweb server
 */
module.exports = function createServer(config) {
  var app = express();

  // Require HTTPS?
  if (config.https && config.https.require) {
    log('Configuring to require HTTPS')
    app.use(HTTPS(config.https.trustXForwardedProto))    
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
