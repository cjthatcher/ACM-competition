/* global angular */
angular.module('acm').directive('protect',
  function ($rootScope, $state, user) {
    'use strict';

    function link() {
      $rootScope.$on('$stateChangeStart', function (e, to, toParams) {
        if ((to.admin !== undefined || to.loggedIn !== undefined) && user.data === undefined) {
          e.preventDefault();
          user.on(function () {
            $state.transitionTo(to.name, toParams);
          });
          return;
        }

        if (to.admin !== undefined) {
          if (!user.data) {
            e.preventDefault();
            user.state = {
              to: to,
              toParams: toParams
            };
            $state.transitionTo('login');
          } else if (!user.data.isAdmin) {
            e.preventDefault();
            $state.transitionTo('index');
          }
        }

        if (to.loggedIn === true) {
          if (!user.data) {
            e.preventDefault();
            user.state = {
              to: to,
              toParams: toParams
            };
            $state.transitionTo('login');
          }
        }

        if (to.loggedIn === false) {
          if (user.data) {
            e.preventDefault();
            $state.transitionTo('index');
          }
        }
      });
    }

    return {
      restrict: 'EA',
      link: link
    };
  }
);

