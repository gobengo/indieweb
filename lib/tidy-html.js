const tidyAsync = require('htmltidy2').tidy

module.exports = function (text, options) {
  options = options || {
    indent: true,
    'indent-attributes': true,
    'sort-attributes': 'alpha',
    'vertical-space': true
  };
  return new Promise(function (resolve, reject) {
    tidyAsync(text, options, function (err, tidiedHtml) {
      if (err) return reject(err)
      return resolve(tidiedHtml)
    })
  })
}
