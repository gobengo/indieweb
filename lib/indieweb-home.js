'use strict';
import tidyHtml from './tidy-html';

// Private method to render HTML for the homepage
const _renderHtml = Symbol('IndieWebHome#renderHtml');
const _config = Symbol('IndieWebHome#config');

/** 
 * A 'Home' Server
 * Currently it just renders some boilerplate HTML.
 */
export default class IndieWebHome {
  constructor(config) {
    this[_config] = config;
  }
  [_renderHtml]() {
    return renderHomePageHtml.call(this, this[_config])
  }
  express() {
    return async (req, res, next) => {
      try {
        const html = await this[_renderHtml]()
        res.send(html)
      } catch (e) {
        next(e);
      }
    }  
  }
}

function renderHomePageHtml({
  indieweb: {
    domain,
    me
  },
  title
}) {
  const html = `
    <!doctype html>
    <head>
      <link rel="pingback" href="https://webmention.io/${ domain }/xmlrpc" />
      <link rel="webmention" href="https://webmention.io/${ domain }/webmention" />
      <title>${ title }</title>
    </head>
    <h1>${ title }</h1>
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

