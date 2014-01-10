/* global angular */
var nav;
nav = [
  {
    label: 'Main',
    state: 'index',
    url:   '/',
    tmpl:  'tmpl/main.html',
    ctrl:  'mainCtrl'
  },
  {
    label: 'Signup',
    state: 'signup',
    url:   '/signup',
    tmpl:  'tmpl/signup.html',
    ctrl:  'signupCtrl',
    loggedIn: false
  },
  {
    label: 'Login',
    state: 'login',
    url:   '/login',
    tmpl:  'tmpl/login.html',
    ctrl:  'loginCtrl',
    loggedIn: false
  }
];

angular.module('acm').factory('nav',
  function() {
    'use strict';
    return nav;
  }
);
