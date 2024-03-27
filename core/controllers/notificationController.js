wuApp.controller("notificationController", [
    "$scope",
    "$http",
    "$window",
    "localStorageService",
    
    function ($scope, $http,$window, localStorageService) {
      $scope.notifications={
        id:"",
        message:"",
        timestamp:"",
        isRead:"",
      };
      $scope.unreadCount = 0;
      
      var userId=localStorageService.getUserID();
      console.log(userId);

      $http
      .get("http://localhost:8081/api/notification/all/" + userId)
      .then(function (response) {
        console.log(response.data);
        $scope.notifications = response.data;
      })
      .catch(function (error) {
        console.log("Error:", error);
      });

      $scope.markAsRead = function(id) {
        console.log(id);
        $http.put("http://localhost:8081/api/notification/" + id+"/read")
            .then(function(response) {
                console.log("mark as read");
                $window.location.reload();
            })
            .catch(function(error) {
                console.error("Error marking notification as read:", error);
            });
    };



    }

    ])