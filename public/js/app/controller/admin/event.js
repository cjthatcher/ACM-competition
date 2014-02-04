/* global angular */
angular.module('acm').controller('adminEventCtrl',
  function ($scope, $stateParams, $modal, alerts, adminEvents) {
    'use strict';

    adminEvents.get($stateParams.id, function (err, event) {
      if (err) return alerts.create('error', err);
      $scope.event = event;
    });

    $scope.editInfo = function () {
      $modal.open({
        templateUrl: 'tmpl/m/event.html',
        controller: 'mEvent',
        resolve: {
          type: identity({ title: 'Editing', btn: 'Edit' }),
          event: identity(clone($scope.event))
        }
      }).result.then(function (event) {
        alerts.create('info', 'Updating Event...');
        adminEvents.update(event, function (err) {
          if (err) return alerts.create('error', err);
          alerts.create('success', 'Event Updated!');
          $scope.event = event;
        });
      });
    };

    $scope.createQuestion = function () {
      $modal.open({
        templateUrl: 'tmpl/m/question.html',
        controller: 'mQuestion',
        resolve: {
          type: identity({ title: 'Creating', btn: 'Create' }),
          question: identity({})
        }
      }).result.then(function (question) {
        var event = clone($scope.event);
        event.questions.push(question);
        alerts.create('info', 'Creating Question...');
        adminEvents.update(event, function (err) {
          if (err) return alerts.create('error', err);
          alerts.create('success', 'Question Created!');
          $scope.event = event;
        });
      });
    };

    $scope.editQuestion = function (question, index) {
      $modal.open({
        templateUrl: 'tmpl/m/question.html',
        controller: 'mQuestion',
        resolve: {
          type: identity({ title: 'Editing', btn: 'Edit' }),
          question: identity(clone(question))
        }
      }).result.then(function (question) {
        var event = clone($scope.event);
        event.questions[index] = question;
        alerts.create('info', 'Updating Question...');
        adminEvents.update(event, function (err) {
          if (err) return alerts.create('error', err);
          alerts.create('success', 'Question Updated!');
          $scope.event = event;
        });
      });
    };

    $scope.deleteQuestion = function (index) {
      var event = clone($scope.event);
      event.questions.splice(index, 1);
      alerts.create('info', 'Deleting Question...');
      adminEvents.update(event, function (err) {
        if (err) return alerts.create('error', err);
        alerts.create('success', 'Question Deleted!');
        $scope.event = event;
      });
    };

    function clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    function identity(val) {
      return function () {
        return val;
      };
    }
  }
);
