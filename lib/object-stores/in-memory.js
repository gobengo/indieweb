'use strict';

const _objects = Symbol('InMemoryObjectStore#_objects')

module.exports = class InMemoryObjectStore {
  constructor(config) {
    this[_objects] = [];
  }
  fetch(postId) {
    const objects = this[_objects];
    if (arguments.length) {
      // return a post
      return Promise.resolve(objects.filter(function (object) {
        return object.id === postId;
      })[0]);
    }
    // return index of posts
    return Promise.resolve(objects);
  }
  post(object) {
    this[_objects].push(object);
  }
}
