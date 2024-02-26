wuApp.controller("registerController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http,$location) {
    $scope.user = {
      emailId: "",
      password: "",
    };

    //register user with emailId and password
    $scope.signup = function (form) {
      console.log($scope.user);
      $http
        .post("http://localhost:8081/api/user/signup", $scope.user)
        .then(function (response) {
          console.log(response.data);
          if (response.data.status === true) {
            $scope.errorMessage = null;
            $scope.responseMessage = response.data.message;
            $scope.user = {
              emailId: "",
              password: "",
            };
            form.$setPristine();
            form.$setUntouched();
            $location.path("/login")
            Swal.fire("User Registered Successfully!!");
          }
        })
        .catch(function (error) {
          console.error(error);
          $scope.user = {};
          form.$setPristine();
          form.$setUntouched();

          $scope.errorMessage = "User Registeration Failed!";
          $scope.responseMessage = null;
        });
    };
  },
]);
