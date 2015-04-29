'use strict';
const tidyHtml = require('./tidy-html');
const createUUID = require('node-uuid');
const express = require('express');

// Private method to render HTML for the homepage
var _config = Symbol('IndieWebPosts#config');

/** 
 * A 'Home' Server
 * Currently it just renders some boilerplate HTML.
 */
module.exports = class IndieWebHome {
  constructor(config) {
    this[_config] = config
  }
  express() {
    const config = this[_config];
    const objects = config.objects;
    const router = express.Router();
    const self = this;
    // posts index
    router.route('/')
      .get(function (req, res, next) {
        renderPosts(config)
        .then(function (html) {
          res.send(html);
        })
        .then(null, next);
      })
      .post(require('body-parser').urlencoded({ extended: true }),
      function (req, res, next) {
        const formData = req.body;
        const submittedPost = {
          id: createUUID(),
          title: formData.title || 'Random title: '+createUUID(),
          body: formData.body
        };
        Promise.resolve(objects.post(submittedPost))
        .then(function () {
          // yay, posted
          res.redirect(req.originalUrl)          
        })
        .then(null, next);
      });
    // create a new post
    router.route('/create')
      .get(function (req, res, next) {
        renderCreate(config)
        .then(function (html) {
          res.send(html);
        })
        .then(null, next);
      })
    // a single post
    router.route('/:id')
      .get(function (req, res, next) {
        const postId = req.params.id;
        Promise.resolve(objects.fetch(postId))
        .then(function (post) {
          if ( ! post) {
            return res.status(404).send('There is no post '+postId);
          }
          return renderPost(post)
        })
        .then(function (html) {
          res.send(html)
        })
        .then(null, next);
      })
    return router;
  }
}

function renderPosts(config) {
  const domain = config.indieweb.domain;
  const me = config.indieweb.me;
  return Promise.resolve(config.objects.fetch())
  .then(function (posts) {
    const html = `
      <!doctype html>
      <head>
        <title>Posts</title>
      </head>
      <h1>Posts</h1>
        <p>
          Choose a post or <a href="./create">create a new post</a>
        </p>
        <ul>
        ${
          posts.map(function (post) {
            return `<li><h2><a href="${ post.id }">${ post.title }</a></h2></li>`
          }).join('')
        }
        </ul>
    `;
    return tidyHtml(html);
  });
}

function renderCreate(config) {
  const html = `
    <!doctype html>
    <head>
      <title>Create a Post</title>
    </head>
    <h1>Create a Post</h1>
      <form action="." method="post">
        <span class="field">
          <label>Title</label>
          <input type="text" name="title"></input>
        </span>
        <span class="field">
          <label>Body</label>
          <textarea name="body"></textarea>
        </span>
        <input type="submit" value="Post"></input>
      </form>
  `;
  return tidyHtml(html);
}

function renderPost(post) {
  console.log('the post is', post);
  const html = `
    <!doctype html>
    <head>
      <title>Post ${ post.id }</title>
    </head>
    <article>
      <h1><a href="">${ post.title }</a></h1>
      ${ post.body }
    </article>
  `;
  return tidyHtml(html);
}
