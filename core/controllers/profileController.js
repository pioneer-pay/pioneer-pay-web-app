wuApp.controller("profileController", [
    "$scope",
    "$http",
    "$location",
    "authService",
    "accountService",
    "networkInfoService",
    "localStorageService",
    function($scope,$http,$location,authService,accountService,networkInfoService,localStorageService){
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


    //internet connection
    $scope.$on('internetStatusChanged', function (event, isOnline) {
      $scope.isOnline = isOnline;
      // Update other buttons on the profile page based on online status if needed
      // console.log("profile");
    });

    $scope.navigateToUpdateProfile = function () {
      // Navigate to the profile update page only if online
      if ($scope.isOnline) {
          $location.path('/dashboard/profile/addProfile');
      }
    };

    $scope.navigateToUpdateAccount = function () {
      // Navigate to the account update page only if online
      if ($scope.isOnline) {
          $location.path('/dashboard/profile/account');
      }
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
