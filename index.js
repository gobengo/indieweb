require("babel/register")({
  stage: 1,
});
const log = require('debug')('indieweb');

module.exports = function (config) {
  return require('./lib/server')(config)
}

if (require.main === module) {
  require('./main')();
}
