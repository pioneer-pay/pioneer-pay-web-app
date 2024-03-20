wuApp.controller("accountController", [
    "$scope",
    "$http",
    "$location",
    "authService",
    "localStorageService",
    "accountService",
    function($scope,$http,$location,authService,localStorageService,accountService,){
    $scope.account={
      accountHolderName:"",
        bankName:"",
        accountNo:"",
        balance:"",
        ifscCode:"",
    };
    
    //cancel update
    $scope.cancelUpdate = function(){
        $location.path("/dashboard/profile");
    };

    //show account details
    var id=localStorageService.getUserID();
    $http.get("http://localhost:8081/api/user/account/"+id)
            .then(function(response){
                console.log(response.data);
                $scope.account=response.data[0];
                console.log($scope.account);
            });


    //update account details
     $scope.submit= function(form){
        console.log($scope.account);
        $http
             .put("http://localhost:8082/api/account/update/"+id, $scope.account)
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
