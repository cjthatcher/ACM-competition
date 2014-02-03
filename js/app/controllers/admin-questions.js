/* global angular, Firebase */
angular.module('acm').controller('adminQuestionsCtrl',
  function ($scope, $stateParams, $firebase, $state, $modal) {
    'use strict';

    var eventRef = new Firebase('https://acm.firebaseio.com/events/' + $stateParams.key);
    $scope.event = $firebase(eventRef);

    var questionsRef = new Firebase('https://acm.firebaseio.com/questions/' + $stateParams.key);
    $scope.questions = $firebase(questionsRef);

    var answersRef = new Firebase('https://acm.firebaseio.com/answers/' + $stateParams.key);
    $scope.answers = $firebase(answersRef);

    $scope.updateEvent = function (key, val) {
      $scope.event[key] = val;
      $scope.event.$save(key);
    };

    $scope.back = function () {
      $state.transitionTo('admin.events');
    };

    $scope.newQuestion = function () {
      $modal.open({
        templateUrl: 'tmpl/m/create-question.html?cache=' + Math.random(),
        controller: 'createQuestion'
      }).result.then(function (result) {
        $scope.questions.$add(result.question).then(function (result2) {
          var key = result2.path.m[2];
          $scope.answers[key] = result.answer;
          $scope.answers.$save(key);
        });
      });
    };

    $scope.deleteQuestion = function (key) {
      $scope.questions.$remove(key);
      $scope.answers.$remove(key);
    };

    $scope.saveQuestion = function (key, field, val) {
      var q = $scope.questions.$child(key);
      q[field] = val;
      q.$save(field);
    };

    $scope.saveAnswer = function (key, val) {
      $scope.answers[key] = val;
      $scope.answers.$save(key);
    };
  }
);
