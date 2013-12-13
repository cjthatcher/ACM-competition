// /* global $ */
'use strict';

// $.get('/items', function(data) {
//   for (var d in data)
//   {
//     var string = data[d];
//     addItem(string);
//   }
// });

// var addItem = function(name) {
//   var myItem = $('<li>');
//   myItem.text(name);
//   $('ul').append(myItem);
// };

// function controller($scope) {
//   $scope.test = 7;

//   $scope.companies=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];

//   $scope.fibs = [1, 1, 2, 3, 5, 8, 13, 21];

//   $scope.range = function (num) {
//     var array = [];
//     for (var i = 0; i < num; i++)
//     {
//       array.push(i);
//     }

//     return array;
//   }
// }

function controller($scope, $http) {

  $http.get("/user").success(function(data){
    if(data.success)
      $scope.user = data.user;
  });

  $scope.signup = function() {
    var user = {
        username: $scope.username,
        password: $scope.password,
        first_name: $scope.first_name,
        last_name: $scope.last_name,
        email: $scope.email
    };

    $http.post('/signup', user).success(function(data) {
      console.log('w00t!');
      console.log(data);
      if (!data.success)
        $scope.error = data.err;
      else
        $scope.user = data.user;
    })

    return false;
  }

  $scope.logout = function() {
    $http.post('/logout').success(function(){
      $scope.user = false;
      window.location.reload();
    })
  }
}
