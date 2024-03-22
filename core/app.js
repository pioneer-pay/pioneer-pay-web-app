let wuApp = angular.module("wuApp", ["ngRoute", "ui.bootstrap"]);

wuApp.requires.push('InternetConnectivityService');

wuApp.run(function($rootScope, $timeout) {
  // Show splash screen initially
  $rootScope.showSplash = true;
  // Hide splash screen when the window has fully loaded
  window.addEventListener("load", function() {
    $rootScope.$apply(function() {
      $rootScope.showSplash = false;
    }.bind(this));
  });  
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
    .when('/dashboard/notification',{
      templateUrl:'views/notification.html',
      controller: 'notificationController'
    })
    .when('/dashboard/profile/addProfile',{
      templateUrl: 'views/addProfile.html',
      controller: 'addProfileController',
    })
    .when('/dashboard/profile/account',{
      templateUrl: 'views/account.html',
      controller: 'accountController',
    })
    .when('dashboard/reminderModalContent',{
         templateUrl: 'views/reminderModalContent.html',
         controller:'reminderModalController',
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
    .when("/verify", {
      templateUrl: "views/verifymail.html",
      controller: "verifyController",
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


wuApp.directive('dashNav', ['localStorageService', 'accountService','profileService','networkInfoService','notificationService', function (localStorageService,accountService,profileService,networkInfoService,notificationService) {
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
      $scope.logoutAvailable = $scope.isOnline;

      //listen to changes in online status
      $rootScope.$on('internetStatusChanged', function (event, isOnline) {
        $scope.isOnline = isOnline;
        $scope.logoutAvailable = isOnline;
      });

      
      // Get unread notification count
      var userId = localStorageService.getUserID();
      notificationService.getUnreadCount(userId)
          .then(function(unreadCount) {
              $scope.unreadCount = unreadCount;
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
