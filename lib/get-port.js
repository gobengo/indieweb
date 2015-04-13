'use strict';

const portfinder = require('portfinder');

/**
 * Get an available port that an app could listen on.
 * Starts looking at the provided basePort.
 * Promise<Number>
 */
module.exports = function getPort(basePort) {
  return new Promise(function (resolve, reject) {
    createPortfinder(basePort).getPort(function (err, port) {
      if (err) return reject(err);
      resolve(port);
    })
  })
}

/**
 * Create a portfinder that starts at the provided basePort.
 */
function createPortfinder(basePort) {
  const finder = Object.create(portfinder);
  finder.basePort = basePort;
  return finder;
}
