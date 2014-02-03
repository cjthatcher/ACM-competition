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
    ctrl:  'signupCtrl'
  },
  {
    label: 'Login',
    state: 'login',
    url:   '/login',
    tmpl:  'tmpl/login.html',
    ctrl:  'loginCtrl'
  },
  {
    state: 'admin',
    url:   '/admin',
    tmpl:  'tmpl/admin.html',
    ctrl:  'adminCtrl',
    abstract: true,
    hidden: true
  },
  {
    label: 'Admin',
    state: 'admin.events',
    url:   '/events',
    tmpl:  'tmpl/admin-events.html',
    ctrl:  'adminEventsCtrl',
  },
  {
    state: 'admin.news',
    url: '/news',
    tmpl:  'tmpl/admin-news.html',
    ctrl:  'adminNewsCtrl',
    hidden: true
  },
  {
    state: 'admin.questions',
    url: '/events/:key',
    tmpl:  'tmpl/admin-questions.html',
    ctrl:  'adminQuestionsCtrl',
    hidden: true
  },
  {
    label: 'Events',
    state: 'events',
    url:   '/events',
    tmpl:  'tmpl/events.html',
    ctrl:  'eventsCtrl'
  },
  {
    state: 'specificEvent',
    url:   '/event/:key',
    tmpl:  'tmpl/event.html',
    ctrl:  'eventCtrl',
    hidden: true
  },
  {
    state: 'specificEvent.question',
    url:   '/:id',
    tmpl:  'tmpl/event-question.html',
    ctrl:  'eventQuestionCtrl',
    hidden: true
  }
];

angular.module('acm').factory('nav',
  function() {
    'use strict';
    return nav;
  }
);
