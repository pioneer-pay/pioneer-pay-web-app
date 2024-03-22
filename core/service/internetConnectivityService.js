// internetConnectivityService.js

// Define a module for internet connectivity configuration
angular.module('InternetConnectivityService', ['wuApp'])

// Run block to set up internet connectivity checking
.run(['$rootScope', '$interval', '$timeout', 'networkInfoService', function ($rootScope, $interval, $timeout, networkInfoService) {
    // Initialize isOnline property on $rootScope
    $rootScope.isOnline = networkInfoService.isOnline();
    $rootScope.showOnlineMessage = $rootScope.isOnline;

    // Function to update online status
    function updateOnlineStatus() {
        $rootScope.isOnline = networkInfoService.isOnline();
        console.log($rootScope.isOnline);
        if ($rootScope.isOnline && !$rootScope.onlineMessageShown) {
            // Show "User is online" message for 1 second
            $rootScope.showOnlineMessage = true;
            $rootScope.onlineMessageShown = true;
            $timeout(function() {
                $rootScope.showOnlineMessage = false;
            }, 2000);
        } else if (!$rootScope.isOnline) {
            // If offline, reset the flag
            $rootScope.onlineMessageShown = false;
            // If offline, hide the message immediately
            $rootScope.showOnlineMessage = false;
        }
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
