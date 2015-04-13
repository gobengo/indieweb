import configModule from './config';
import createServer from '.';
import debug from 'debug';
import getPort from './lib/get-port';

const log = debug('indieweb/main');

/**
 * Create an indieweb server and listen on config.PORT
 * If a port is not configured, find one
 */
export default async function main() {
  const config = configModule.get();
  try {
    const port = await Promise.resolve(config.PORT || getPort(config.findPortBase));
    log('listening for HTTP on port '+port)
    createServer(config).listen(port);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
