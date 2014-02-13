/* global angular */
var nav;
nav = [
  {
    state: 'index',
    url:   '/',
    tmpl:  'tmpl/index.html',
    ctrl:  'indexCtrl',
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
    url:   '/events',
    tmpl:  'tmpl/admin/events.html',
    ctrl:  'adminEventsCtrl',
    admin: true
  },
  {
    state: 'admin.users',
    url:   '/users',
    tmpl:  'tmpl/admin/users.html',
    ctrl:  'adminUsersCtrl',
    hidden: true,
    admin: true
  },
  {
    state: 'admin.results',
    url:   '/results',
    tmpl:  'tmpl/admin/results.html',
    ctrl:  'adminResultsCtrl',
    hidden: true,
    admin: true
  },
  {
    state: 'admin.event',
    url:   '/event/:id',
    tmpl:  'tmpl/admin/event.html',
    ctrl:  'adminEventCtrl',
    hidden: true,
    admin: true
  },
  {
    state: 'admin.results.result',
    url:   '/:id',
    tmpl:  'tmpl/admin/result.html',
    ctrl:  'adminResultCtrl',
    hidden: true,
    admin: true
  },
  {
    label: 'Events',
    state: 'events',
    url:   '/events',
    tmpl:  'tmpl/events.html',
    ctrl:  'eventsCtrl',
    loggedIn: true
  },
  {
    state: 'event',
    url:   '/event/:id',
    tmpl:  'tmpl/event.html',
    ctrl:  'eventCtrl',
    hidden: true,
    loggedIn: true
  },
  {
    state: 'event.question',
    url:   '/q/:index',
    tmpl:  'tmpl/question.html',
    ctrl:  'questionCtrl',
    hidden: true,
    loggedIn: true
  },
  {
    state: 'event.leaderboard',
    url:   '/high-scores',
    tmpl:  'tmpl/leaderboard.html',
    ctrl:  'leaderboardCtrl',
    hidden: true,
    loggedIn: true
  }
];

angular.module('acm').factory('nav',
  function () {
    'use strict';
    return nav;
  }
);
