wuApp.controller("accountController", [
    "$scope",
    "$http",
    "$location",
    "authService",
    "accountService",
    "localStorageService",
    function($scope,$http,$location,authService,accountService,localStorageService){
    $scope.account={
      accountHolderName:"",
        bankName:"",
        accountNo:"",
        balance:"",
        ifscCode:"",
    };

    //show account details
    var id=authService.getUserID();
    var userId=localStorageService.getUserID();
    $http.get("http://localhost:8081/api/user/account/"+userId)
            .then(function(response){
                console.log(response.data);
                $scope.account=response.data[0];
                console.log($scope.account);
            });


    //update account details
     $scope.submit= function(form){
        console.log($scope.account);
        $http
             .put("http://localhost:8082/api/account/update/"+userId, $scope.account)
             .then(function(response){
                  console.log(response.data);
                  Swal.fire("User bank details updated Successfully!!");
                  $location.path("/dashboard/profile");

             })
             .catch(function(error){
                console.log("Error:",error);
             })
     };
    },
]);
