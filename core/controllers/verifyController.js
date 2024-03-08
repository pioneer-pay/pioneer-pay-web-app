wuApp.controller("verifyController", [
  "$scope",
  "$http",
  "$location",
  "$timeout",
  "localStorageService",
  function ($scope, $http, $location, $timeout, localStorageService) {
    let id = localStorageService.getUserID();
    $scope.userEmail = "";
    $scope.sentOtp = "";
    $scope.verifyResponse = {};

    $scope.otpInvalid = true;
    $scope.otpModified = false;

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

    $scope.validateOtp = function () {
      var pattern = /^\d{6}$/;
      $scope.otpInvalid = !pattern.test($scope.enteredOtp);
      $scope.otpModified = true;
    };

    $scope.verifyOTP = function () {
      console.log($scope.enteredOtp);
      $http
        .post(
          "http://localhost:8081/api/user/verification/" +
            $scope.userEmail +
            "?otp=" +
            $scope.enteredOtp
        )
        .then(function (response) {
          console.log(response.data);
          $scope.verifyResponse = response.data;
          if (response.data.status == true) {
            $timeout(function () {
              $location.path("/login");
            }, 5000);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    };
  },
]);
