/* global angular */
var nav;
nav = [
  {
    label: 'Main',
    state: 'index',
    url:   '/',
    tmpl:  'tmpl/main.html',
    ctrl:  'mainCtrl',
    hidden: true
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
  },
  {
    state: 'admin',
    url:   '/admin',
    tmpl:  'tmpl/admin/base.html',
    ctrl:  'adminCtrl',
    hidden: true,
    abstract: true
  },
  {
    label: 'Admin',
    state: 'admin.events',
    v_url: '/events',
    url:   '/admin/events',
    tmpl:  'tmpl/admin/events.html',
    ctrl:  'adminEventsCtrl',
    admin: true
  },
  {
    state: 'admin.users',
    v_url: '/users',
    url:   '/admin/users',
    tmpl:  'tmpl/admin/users.html',
    ctrl:  'adminUsersCtrl',
    hidden: true
  }
];

angular.module('acm').factory('nav',
  function() {
    'use strict';
    return nav;
  }
);
