wuApp.service('notificationService', ['$http', 'localStorageService', function($http, localStorageService) {
    var service = {};

    service.getUnreadCount = function(userId) {
        return $http.get("http://localhost:8081/api/notification/unread/" + userId)
            .then(function(response) {
                console.log(response.data.length);
                return response.data.length; 
            })
            .catch(function(error) {
                console.log("Error:", error);
                return 0; 
            });
    };

    return service;
}]);
