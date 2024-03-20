// internetConnectivityConfig.js

// Define a module for internet connectivity configuration
angular.module('InternetConnectivityService', ['wuApp'])

// Run block to set up internet connectivity checking
.run(['$rootScope', '$interval', 'networkInfoService', function ($rootScope, $interval, networkInfoService) {
    // Initialize isOnline property on $rootScope
    $rootScope.isOnline = networkInfoService.isOnline();

    // Function to update online status
    function updateOnlineStatus() {
        $rootScope.isOnline = networkInfoService.isOnline();
        console.log($rootScope.isOnline);
        $rootScope.$broadcast('internetStatusChanged', $rootScope.isOnline);
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
