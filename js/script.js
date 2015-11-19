// Javascript Code.
Parse.initialize("o738tDIjX7Oq1jSB1PtSG6LfVeZqOgpaKH0pK3dt", "p7JfKdqPlYwWoenFcH1pnxR73YDzNaHAjz6iAwhq");

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
      templateUrl:'templates/login.html',
      controller: 'MainController',
      controllerAs: 'LoginCtrl'
    })
    .when('/list-songs', {
      templateUrl:'templates/list-songs.html',
      controller: 'ChartController',
      controllerAs: 'ChartCtrl'
    });
});

myApp.controller('MainController', function($scope, $window) {

  $scope.signUp = function() {

    var username_sign = $("#signup-user").val();
    var password_sign = $("#signup-password").val();
    var email_sign = $("#signup-email").val();

    var user = new Parse.User();
    user.set("username", username_sign);
    user.set("password",password_sign);
    user.set("email", email_sign);

    user.signUp(null, {
      success: function(user) {
        $window.location.href = '#/list-songs';
      },
      error: function(user, error) {
        alert("Error: " + error.message);
        //console.log("Error: " + error.message);
      }
    });
  };

  $scope.login = function() {

    var username_login = $("#login-email").val();
    var password_login = $("#login-password").val();

    Parse.User.logIn(username_login, password_login, {
      success: function(user) {
        //alert("Log in success!");
        $window.location.href = '#/list-songs';
      }, error: function(user, error) {
        alert("Error: " + error.message);
        //console.log("Error: " + error.message);
      }
    });
  };

  $scope.logout = function() {
    Parse.User.logOut();
  };

});

myApp.controller('ChartController', function($scope, $http) {
  $http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=85b8c37b1a6be5182a5ed0549c4a7400&format=json')
    .success(function(data){
      $scope.listTracksInfo = data['tracks']['track'];
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

  $("#signup-email").keyup(function() {
    var email = $(this).val();
    $("#signup-user").val(email);
  });
});