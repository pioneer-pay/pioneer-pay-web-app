wuApp.controller("verifyController", [
  "$scope",
  "$http",
  "$location",
  "localStorageService",
  function ($scope, $http, $location, localStorageService) {
    let id = localStorageService.getUserID();
    $scope.userEmail = "";

    $http
      .get("http://localhost:8081/api/user/" + id)
      .then(function (response) {
        console.log(response.data);
        $scope.userEmail = response.data.emailId;
      })
      .catch(function (error) {
        console.error("Error:", error);
      });

    $scope.sendOTP = function () {
      $http
        .get("http://localhost:8081/api/user/otp/send/" + $scope.userEmail, {
          transformResponse: function (data) {
            return { message: data };
          },
        })
        .then(function (response) {
          $scope.otpResponseMessage = response.data.message;
          console.log($scope.otpResponseMessage);
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    };
  },
]);
