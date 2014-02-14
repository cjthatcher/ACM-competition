/* global angular */
angular.module('acm').factory('adminPosts',
  function ($http) {
    'use strict';

    function getPosts(cb) {
      _check($http.get('/posts'), function (err, data) {
        cb(err, data && data.posts);
      });
    }

    function createPost(post, cb) {
      _check($http.post('/a/post', post), function (err, data) {
        cb(err, data && data.id);
      });
    }

    function deletePost(name, cb) {
      _check($http.delete('/a/post/' + name), cb);
    }

    function updatePost(post, cb) {
      _check($http.post('/a/updatePost', post), cb);
    }

    function _check(promise, cb) {
      promise.success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, data);
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    return {
      all: getPosts,
      create: createPost,
      remove: deletePost,
      update: updatePost
    };
  }
);
