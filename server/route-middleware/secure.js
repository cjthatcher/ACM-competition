/* jshint node:true */
'use strict';

module.exports = function (app) {
  app.m.isLoggedIn = isLoggedIn;
  app.m.isAdmin = isAdmin;
};

function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.forbidden();
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) return next();
  res.forbidden();
}
