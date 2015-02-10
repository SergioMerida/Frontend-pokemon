//Starting parse
Parse.initialize("HSCFVbY3VUVA7SXb2Zg1eLtf2clDeU60BWJEgZcD", "8QU6FAgnN1DgXM8Y1oireg2kqWcr4iMGw93YTE1U");
//Starting angular and setting routes
var pokemonModule = angular.module('pokemonModule', ["ngRoute"]).config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'log.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}).run(['$rootScope', "$location", function($scope, $location) {
  $scope.scenario = 'Sign up';
  $scope.currentUser = Parse.User.current();
  $scope.signUp = function(form, newPath) {
    var user = new Parse.User();
    user.set("email", form.email);
    user.set("username", form.username);
    user.set("password", form.password);
    
    user.signUp(null, {
      success: function(user) {
        $scope.currentUser = user;
        $location.path(newPath);
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to sign up:  " + error.code + " " + error.message);
      }
    });
  };
  
  $scope.logIn = function(form, newPath) {
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
        $scope.currentUser = user;
        $location.path(newPath);
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to log in: " + error.code + " " + error.message);
      }
    });
  };
  
  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
    $location.path("/inicio");
  };
}]);