/* global angular, Firebase */
angular.module('acm').controller('adminEventsCtrl',
  function ($scope, $firebase, $modal, $state) {
    'use strict';

    var eventsRef = new Firebase('https://acm.firebaseio.com/events');
    $scope.events = $firebase(eventsRef);

    var questionsRef = new Firebase('https://acm.firebaseio.com/questions');
    var questions = $firebase(questionsRef);

    var answersRef = new Firebase('https://acm.firebaseio.com/answers');
    var answers = $firebase(answersRef);

    $scope.createEvent = function () {
      $modal.open({
        templateUrl: 'tmpl/m/create-event.html?cache=' + Math.random(),
        controller: 'createEvent'
      }).result.then(function (event) {
        $scope.events.$add(event);
      });
    };

    $scope.deleteEvent = function (key) {
      $scope.events.$remove(key);
      questions.$remove(key);
      answers.$remove(key);
    };

    $scope.toggleEvent = function (key, state) {
      var event = $scope.events.$child(key);
      event.available = !state;
      event.$save('available');
    };

    $scope.editEvent = function (key) {
      $state.transitionTo('admin.questions', {
        key: key
      });
    };
  }
);
