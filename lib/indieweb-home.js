'use strict';
const tidyHtml = require('./tidy-html');

// Private method to render HTML for the homepage
var renderHtml = Symbol('IndieWebHome#renderHtml');

/** 
 * A 'Home' Server
 * Currently it just renders some boilerplate HTML.
 */
module.exports = class IndieWebHome {
  constructor(config) {
    this[renderHtml] = renderHomePageHtml.bind(this, config);
  }
  express() {
    var self = this;
    return function (req, res, next) {
      self[renderHtml]()
      .then(function (html) {
        res.send(html);
      })
    }    
  }
}

function renderHomePageHtml(config) {
  const domain = config.indieweb.domain;
  const me = config.indieweb.me;
  const html = `
    <!doctype html>
    <head>
      <link rel="pingback" href="https://webmention.io/${ domain }/xmlrpc" />
      <link rel="webmention" href="https://webmention.io/${ domain }/webmention" />
      <title>${ config.title }</title>
    </head>
    <h1>${ config.title }</h1>
      <p>
        Welcome to my <a href="http://indiewebcamp.com/indieweb">indieweb</a>,
        hosted at <a href="${ domain }">${ domain }</a>.
      </p>
      ${
        me.image
        ? `<img src="${ me.image }" />`
        : undefined
      }
      <h2>'me'</h2>
        <pre>${ JSON.stringify(me, null, 2) }</pre>
      <h2>Posts</h2>
        <p>#TODO</h2>
    <footer>©${ new Date().getFullYear() }</footer>
  `;
  return tidyHtml(html);
}

