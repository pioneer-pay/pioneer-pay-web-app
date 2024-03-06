wuApp.controller("profileController", [
    "$scope",
    "$http",
    "authService",
    "accountService",
    "localStorageService",
    function($scope,$http,authService,accountService,localStorageService){
      $scope.user = {
        firstName: '',
        lastName: '',
        emailId:'',
        mobileNumber:'',
        dob:'',
        address1:'',
        country:'',
        address2:'',
        zip:'',
        city:'',
        state:''
      };
    $scope.account={
      accountHolderName:'',
        bankName:'',
        accountNo:'',
        balance:'',
        ifscCode:''
    };


    //show profile details
    var id= authService.getUserID();
    var userId = localStorageService.getUserID();
        $http
             .get("http://localhost:8081/api/user/"+userId)
             .then(function(response){
                console.log(response.data);
                $scope.user= response.data;
                console.log(JSON.stringify($scope.user));
             })
             .catch(function(error){
                console.log("Error:",error);
             });

        $http
            .get("http://localhost:8081/api/user/account/"+userId)
            .then(function(response){
                console.log(response.data);
                $scope.account=response.data[0];
                $scope.accountId=response.data[0].accountId;
                // accountService.setAccountID=response.data[0].accountId;
                console.log($scope.account);
            });

    }
])
