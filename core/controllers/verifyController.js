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
        .get("http://localhost:8081/api/user/otp")
        .then(function (response) {
          console.log(response.data);
          //$scope.userEmail = response.data.emailId;
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    };
  },
]);
