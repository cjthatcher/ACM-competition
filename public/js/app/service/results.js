/* global angular, _ */
angular.module('acm').factory('results',
  function ($http) {
    'use strict';

    function getResults(id, cb) {
      $http.get('/a/results/' + id).success(function (data) {
        if (!data.success) return cb(data.err);
        cb(null, {
          all: _formatAll(data.results),
          group: _formatByQuestion(data.results)
        });
      }).error(function (err) {
        cb(err + ': Are you logged In?');
      });
    }

    function getScores(id, cb) {
      $http.get('/scores/' + id).success(function (data) {
        if (!data.success) cb(data.err);
        cb(null, {
          overall: _formatOverall(data.scores),
          group: _formatByQuestion(data.scores)
        });
      }).error(function (err) {
        cb(err);
      });
    }

    function _formatOverall(data) {
      var all = {};
      _.each(data, function (result) {
        if (!all[result.user]) {
          all[result.user] = {
            gravatar: result.gravatar,
            user: result.user,
            time: 0,
            points: 0,
            solved: 0
          };
        }
        var user = all[result.user];
        user.time = Math.max(user.time, result.time);
        user.solved++;
        user.points += 15;   // HERE'S WHERE REAL POINTS GO
      });

      all = _.toArray(all);
      all.sort(function (a, b) {
        if (a.points !== b.points) return b.points - a.points;
        return a.time - b.time;
      });

      return all;
    }

    function _formatByQuestion(data) {
      var all = {};
      _.each(data, function (result) {
        var i = result.question;
        if (!all[i]) {
          all[i] = {
            title: result.questionLabel,
            index: i,
            results: []
          };
        }
        all[i].results.push(result);
      });

      all = _.toArray(all);
      all.sort(function (a, b) {
        return a.index - b.index;
      });

      _.each(all, function (q) {
        q.results.sort(function (a, b) {
          return a.time - b.time;
        });
      });

      return all;
    }

    function _formatAll(data) {
      data.sort(function (a, b) {
        return a.time - b.time;
      });
      return data;
    }

    return {
      getScores: getScores,
      getResults: getResults
    };
  }
);
