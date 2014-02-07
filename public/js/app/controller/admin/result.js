/* global angular, _ */
angular.module('acm').controller('adminResultCtrl',
  function ($scope, $modal, $stateParams, results, alerts) {
    'use strict';

    $scope.url = 'tmpl/leaderboard.html';

    var id = $stateParams.id;

    $scope.tabs = [
      {
        heading: 'All Submissions',
        tables: []
      },
      {
        heading: 'Submissions By Question',
        tables: []
      }
    ];

    results.getResults(id, function (err, results) {
      if (err) return alerts.create('danger', err);

      $scope.tabs[0].tables.push({
        data: results.all,
        labels: [
          { lbl: 'Question', key: 'questionLabel' }
        ]
      });

      _.each(results.group, function (question) {
        $scope.tabs[1].tables.push({
          heading: question.title,
          data: question.results
        });
      });
    });

    $scope.show = function (result) {
      $modal.open({
        templateUrl: 'tmpl/m/result-info.html',
        controller: 'mResultInfo',
        resolve: {
          result: function () {
            return result;
          }
        }
      });
    };
  }
);
