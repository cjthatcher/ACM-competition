/* global angular */
angular.module('acm').controller('questionCtrl',
  function ($scope, $rootScope, $window, $state, $stateParams, $upload, $log, alerts, events) {
    'use strict';

    var MAX_SIZE = 1000000; // little less than a MB

    var id = $stateParams.id;
    var index = $stateParams.index;

    events.get(id, function (err, event) {
      if (err) {
        $log.error(err);
        return;
      }
      if (!event.questions) {
        $state.transitionTo('event', {
          id: id
        });
        return;
      }
      if (index >= event.questions.length) {
        $state.transitionTo('event', {
          id: id
        });
        return;
      }
      $scope.question = event.questions[index];
    });

    $scope.downloadInput = function () {
      var name = $scope.question.name + '-input.txt';
      var url = '/inp/' + id + '/' + index + '/' + name;
      $window.open(url, '_blank');
    };

    var files = {};

    $scope.setFile = function (which, $files) {
      files[which] = $files[0];
    };

    $scope.submitAnswer = function () {
      if (!files.out)
        return alerts.create('danger', 'Missing your output file!');

      if (!files.src)
        return alerts.create('danger', 'Missing your source file!');

      if (files.out.size > MAX_SIZE)
        return alerts.create('danger', 'Your output file is too big! You sure it\'s text?');

      if (files.src.size > MAX_SIZE)
        return alerts.create('danger', 'Your source file is too big! You sure it\'s text?');

      var outFiles = [];
      outFiles.push(files.out);
      outFiles.push(files.src);

      $upload.upload({
        url: '/upload/' + id + '/' + index,
        file: outFiles
      }).success(function (data) {
        if (!data.success) return alerts.create('danger', data.err);
        alerts.create('success', data.msg);
        $scope.question.solved = true;
        $rootScope.$emit('q:solved', index);
      }).error(function (err) {
        if (err && err.error && err.error.message === 'Request Entity Too Large') {
          err = 'Your files were way too big!! You sure they\'re just code and text?';
        }
        alerts.create('danger', err);
      });
    };
  }
);
