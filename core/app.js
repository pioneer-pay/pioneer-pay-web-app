let wuApp = angular.module("wuApp", ["ngRoute", "ui.bootstrap"]);

wuApp.requires.push('InternetConnectivityService');

wuApp.run(function($rootScope, $timeout) {
  // Show splash screen initially
  $rootScope.showSplash = true;

  // Hide splash screen after 3 seconds
  $timeout(function() {
      $rootScope.showSplash = false;
  }, 3000);
});
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

wuApp.directive('dashNav', ['localStorageService', 'accountService','profileService','networkInfoService', function (localStorageService,accountService,profileService,networkInfoService) {
  return {
    templateUrl: 'directives/navdashboard.html',
    replace: true,
    controller: function ($scope,$location,$rootScope) {
      $scope.logout = function () {
        localStorageService.clearUserID('userId');
        accountService.clearAccountID('accountId');
        profileService.clearUserName('userName');
        localStorage.clear();
        $location.path('/login');
      };
      $scope.userName = profileService.getUserName();
      $scope.isOnline = networkInfoService.isOnline();
      // $scope.logoutAvailable = false;
      $scope.logoutAvailable = $scope.isOnline;

      // if ($scope.isOnline) {
      //   document.getElementById("logoutButton").removeAttribute("disabled");
      //   $scope.logoutAvailable = true;
      // }
      

      $rootScope.$on('internetStatusChanged', function (event, isOnline) {
        $scope.isOnline = isOnline;
        $scope.logoutAvailable = isOnline;
        // if (isOnline) {
        //   document.getElementById("logoutButton").removeAttribute("disabled");
        // } else {
        //   document.getElementById("logoutButton").setAttribute("disabled", "disabled");
        // }
      });
      
    }
  };
}]);

wuApp.directive('commonFooter', function () {
  return {
    templateUrl: 'directives/footer.html',
    replace: true,
  };
});
