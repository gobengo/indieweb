'use strict';
import portfinder from 'portfinder';

/**
 * Get an available port that an app could listen on.
 * Starts looking at the provided basePort.
 * Promise<Number>
 */
export default function getPort(basePort) {
  return new Promise(function (resolve, reject) {
    portfinder.basePort = basePort;
    portfinder.getPort(function (err, port) {
      if (err) return reject(err);
      resolve(port);
    })
  })
}
