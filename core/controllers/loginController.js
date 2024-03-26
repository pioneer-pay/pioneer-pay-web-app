wuApp.controller("loginController", [
  "$scope",
  "$location",
  "$http",
  "$timeout",
  "authService",
  "localStorageService",
  "profileService",
  "networkInfoService",
  function ($scope, $location, $http,$timeout, authService,localStorageService,profileService,networkInfoService) {
    $scope.loginUser = {
      emailId: "",
      password: "",
    };

    $scope.showSuccessMessage = false;
    $scope.successMessage = "";
    
    console.log("online activity");
    $scope.isOnline = networkInfoService.isOnline();
    console.log($scope.isOnline);
    
    //login user
    $scope.login = function (form) {

      console.log(JSON.stringify($scope.loginUser));
      $http
        .post("http://localhost:8081/api/user/signin", $scope.loginUser)
        .then(function (response) {
          console.log(response.data);
          $scope.responseMessage = response.data.message;
          $scope.status = response.data.status;
          $scope.userId = response.data.userId;
          authService.setUserID($scope.userId);

          authService.setEmailID($scope.loginUser.emailId);
          console.log(authService.getEmailID());
          
          localStorageService.saveUserID($scope.userId);
          $scope.userId = localStorageService.getUserID();
          $http
             .get("http://localhost:8081/api/user/"+$scope.userId)
             .then(function(response){
                console.log(response.data);
                $scope.userName= response.data['firstName'];
                console.log($scope.userName);
                profileService.setUserName($scope.userName);
             })
             .catch(function(error){
                console.log("Error:",error);
             });
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
