let wuApp = angular.module("wuApp", ["ngRoute", "ui.bootstrap"]);

wuApp.requires.push('InternetConnectivityConfig');
//ROUTING
wuApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
    })
    .when('/logout',{
      controller:'logoutController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerController',
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController',
    })
    .when('/dashboard/profile', {
      templateUrl: 'views/profile.html',
      controller: 'profileController',
    })
    .when('/dashboard/profile/addProfile',{
      templateUrl: 'views/addProfile.html',
      controller: 'addProfileController',
    })
    .when('/dashboard/profile/account',{
      templateUrl: 'views/account.html',
      controller: 'accountController',
    })
    .when('/dashboard/history',{
      templateUrl:'views/history.html',
      controller:'historyController',
    })
    .when("/dashboard/confirmation", {
      templateUrl: "views/confirmation.html",
      controller: "confirmController",
    })
    .when('/receiver', {
      templateUrl: 'views/receiver.html',
      controller:'receiverController'
    })
    .when('/transaction',{
      templateUrl: 'views/transaction.html',
      controller:'transactionController',
    })
    .when("/status", {
      templateUrl: "views/statuspage.html",
      controller: "statusController",
    })
    .otherwise({ redirectTo: '/' });
});

//DIRECTIVES

wuApp.directive('basicNav', function () {
  return {
    templateUrl: 'directives/navbar.html',
    replace: true,
  };
});

wuApp.directive('dashNav', ['localStorageService', 'accountService','profileService','internetConnectivityService', function (localStorageService,accountService,profileService,internetConnectivityService) {
  return {
    templateUrl: 'directives/navdashboard.html',
    replace: true,
    controller: function ($scope,$location) {
      $scope.logout = function () {
        localStorageService.clearUserID('userId');
        accountService.clearAccountID('accountId');
        profileService.clearUserName('userName');
        localStorage.clear();
        $location.path('/login');
      };
      $scope.userName = profileService.getUserName();
      
    }
  };
}]);

wuApp.directive('commonFooter', function () {
  return {
    templateUrl: 'directives/footer.html',
    replace: true,
  };
});
