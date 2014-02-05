/* global angular, _ */
angular.module('acm').controller('leaderboardCtrl',
  function ($scope, $stateParams, $http, alerts) {
    'use strict';

    var id = $stateParams.id;

    $http.get('/scores/' + id).success(function (data) {
      if (!data.success) return alerts.create('danger', data.err);
      formatOverall(data.scores);
      formatByQuestion(data.scores);
    }).error(function (err) {
      alerts.create('danger', err);
    });

    function formatOverall(scores) {
      var all = {};
      _.each(scores, function (score) {
        if (!all[score.user]) {
          all[score.user] = {
            name: score.user,
            time: 0,
            points: 0,
            solved: 0
          };
        }
        var user = all[score.user];
        user.time = Math.max(user.time, score.time);
        user.solved++;
        user.points += 15;
      });
      $scope.overall = _.toArray(all);
      $scope.overall.sort(function (a, b) {
        if (a.points !== b.points) return b.points - a.points;
        return a.time - b.time;
      });
    }

    function formatByQuestion(scores) {
      var all = {};
      _.each(scores, function (score) {
        var i = score.question;
        if (!all[i]) {
          all[i] = {
            title: score.questionLabel,
            index: i,
            users: []
          };
        }
        all[i].users.push(score);
      });

      $scope.questions = _.toArray(all);

      $scope.questions.sort(function (a, b) {
        return a - b;
      });

      _.each($scope.questions, function (q) {
        q.users.sort(function (a, b) {
          return a.time - b.time;
        });
      });
    }
  }
);
