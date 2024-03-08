wuApp.controller("loginController", [
  "$scope",
  "$location",
  "$http",
  "$timeout",
  "authService",
  "localStorageService",
  "BACKEND_URL",
  function ($scope, $location, $http,$timeout, authService,localStorageService, BACKEND_URL) {
    $scope.loginUser = {
      emailId: "",
      password: "",
    };

    $scope.showSuccessMessage = false;
    $scope.successMessage = "";
    
    //login user
    $scope.login = function (form) {

      console.log(JSON.stringify($scope.loginUser));
      $http
        .post(BACKEND_URL+"/api/user/signin", $scope.loginUser)
        .then(function (response) {
          console.log(response.data);
          $scope.responseMessage = response.data.message;
          $scope.status = response.data.status;
          $scope.userId = response.data.userId;
          authService.setUserID($scope.userId);
          localStorageService.saveUserID($scope.userId);
          $scope.userId = localStorageService.getUserID();
          if ($scope.loginForm.$valid && $scope.status === true) {
            $scope.responseMessage = null;
            $location.path("/dashboard");

            $scope.showSuccessMessage = true;
            $scope.successMessage = "User Logged In Successfully!!";

            $timeout(function () {
              $scope.showSuccessMessage = false;
            }, 10000);

          Swal.fire("User Logged In Successfully!!");
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
          $scope.responseMessage = "Login failed";
          $scope.loginUser = {};
          form.$setPristine();
          form.$setUntouched();
        });
    };
  },
]);
