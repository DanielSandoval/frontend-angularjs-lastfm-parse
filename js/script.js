// Javascript Code.
var myApp = angular.module('app', ['ngRoute']);

myApp.controller('PasswordController', function PasswordController($scope) {
  $scope.title = "This is AngularJS and Jasmin!";
  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
});

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl:'templates/login.html'
    })
    .when('/list-songs', {
      templateUrl:'templates/list-songs.html',
      controller: 'ChartController',
      controllerAs: 'ChartCtrl'
    });
});

/*myApp.controller('MainController', function() {
  var user = new Parse.User();
  user.set("username", "danielsandoval");
  user.set("password","123");
  user.set("email", "danielsandoval@gmail.com");

  user.signUp(null, {
    success: function(user) {
      alert("hola mundo");
    },
    error: function(user, error) {
      alert("Ha habido un error en el Sign Up");
    }
  });
});*/

myApp.controller('ChartController', function($scope, $http) {
  $http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=85b8c37b1a6be5182a5ed0549c4a7400&format=json')
    .success(function(data){
      $scope.listTracksInfo = data['tracks']['track'];
      //$scope.imageUrl = data['tracks']['track'][0]['image'][0]['#text'];
    })
    .error(function(err) {
      return err;
    });
  $scope.selectOrder = function(orderBy) {
    $scope.typeOrder = orderBy;
  };
});

$(document).ready(function() {
  setInterval(function() {
    //This is for the images functionality
    var presentSlide = $(".active-slide");
    var nextSlide = presentSlide.next();
    //This is for the dots functionality
    var presentDot = $(".active-dot");
    var nextDot = presentDot.next();
    //This go back to start when the image and the dot are in the last
    if (nextSlide.length == 0) {
      nextSlide = $(".slide").first();
      nextDot = $(".dot").first();
    };
    //This is for the change of images
    presentSlide.fadeOut(1000).removeClass("active-slide");
    nextSlide.fadeIn(1000).addClass("active-slide");
    //These are the dots functionality
    presentDot.removeClass("active-dot");
    nextDot.addClass("active-dot");
  }, 2500);
});