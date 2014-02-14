/* jshint node:true */
'use strict';

var db = require('../utils/db.js');

module.exports = function(app){
  app.get('/posts',         getPosts);
  app.get('/a/post/:id',    app.m.isAdmin, getPost);
  app.post('/a/post',       app.m.isAdmin, createPost);
  app.post('/a/updatePost', app.m.isAdmin, updatePost);
  app.delete('/a/post/:id', app.m.isAdmin, deletePost);
};

function getPosts(req, res) {
  db.getPosts(function (err, posts) {
    if (err) return res.fail(err);

    res.send({
      success: true,
      posts: posts
    });
  });
}

function getPost(req, res) {
  db.getPost(req.params.id, function (err, post) {
    if (err) return res.fail(err);
    res.send({
      success: true,
      post: post
    });
  });
}

function createPost(req, res) {
  var post = {
    title: req.body.title,
    author: req.body.author,
    post: req.body.post
  };

  db.createPost(post, function (err, id) {
    if (err) return res.fail(err);

    res.send({
      success: true,
      id: id
    });
  });
}

function updatePost(req, res) {
  db.updatePost(req.body, function (err) {
    if (err) return res.fail(err);

    res.send({
      success: true
    });
  });
}

function deletePost(req, res) {
  db.deletePost(req.params.id, function (err) {
    if (err) return res.fail(err);

    res.send({
      success: true
    });
  });
}
