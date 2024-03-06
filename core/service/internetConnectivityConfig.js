// internetConnectivityConfig.js

// Define a module for internet connectivity configuration
angular.module('InternetConnectivityConfig', ['wuApp'])

// Run block to set up internet connectivity checking
.run(['$rootScope', '$interval', 'internetConnectivityService', function ($rootScope, $interval, internetConnectivityService) {
    // Initialize isOnline property on $rootScope
    $rootScope.isOnline = internetConnectivityService.isOnline();

    // Function to update online status
    function updateOnlineStatus() {
        $rootScope.isOnline = internetConnectivityService.isOnline();
        console.log($rootScope.isOnline);
    }

    // Set up an interval to periodically check online status
    var intervalPromise = $interval(updateOnlineStatus, 3000);

    // Cancel interval when the scope is destroyed
    $rootScope.$on('$destroy', function () {
        if (angular.isDefined(intervalPromise)) {
            $interval.cancel(intervalPromise);
            intervalPromise = undefined;
        }
    });
}]);
