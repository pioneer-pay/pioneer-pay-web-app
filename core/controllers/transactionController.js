wuApp.controller("transactionController",[
  "$scope",
  "$http",
  "$location",
  "authService",
  "accountService",
  "transactionService",
  "localStorageService",
  "quickResendService",
  function($scope,$http,$location,authService,accountService,transactionService,localStorageService,quickResendService){
    $scope.account={
      bankName:"",
      accountHolderName:"",
      accountNo:"",
      balance:"",
      ifscCode:""
  };
    $scope.allAccounts={
      accountHolderName:"",
      accountId:"",
      accountNo:"",
      bankName:"",
      balance:""
    };

    $scope.transaction = {
      transactionId:"",
      fromAccountId:"",
      toAccountId:"",
      dateTime:"",
      baseCurrencyCode:"",
      targetCurrencyCode:"",
      amount:"",
      transferedAmount:"",
      commission:"",
      status:""
    };


    //autofill receiver for quick resend

    $scope.allAccounts = []; // Initialize as an empty array
    $scope.receiverSelected = false; // Variable to track if receiver is selected
 
    function constructAccountObject(data) {
      return {
        accountHolderName: data.accountHolderName,
        accountId: data.accountId,
        accountNo: data.accountNo,
        bankName: data.bankName,
        balance: data.balance
      };
    }


    function updateAccounts(response) {
 
      if (Array.isArray(response.data)) {
        // If response data is already an array, use it directly
        $scope.allAccounts = response.data.map(constructAccountObject);
      } else {
        // If response data is not an array, wrap it in an array
        $scope.allAccounts = [constructAccountObject(response.data)];
      }
 
      console.log($scope.allAccounts);
 
    }



    var accountId=accountService.getAccountID();
    var id=authService.getUserID();
    var userId=localStorageService.getUserID();
    var source=transactionService.getBaseCurrencyCode();
    var target=transactionService.getTargetCurrencyCode();
    var amt=transactionService.getAmount();

    console.log(source);
    console.log(target);
    console.log(amt);

    $scope.onClick=function(accountid){
      transactionService.setReceiverAccountID(accountid);
      console.log(accountid);
      localStorage.setItem('cachedReceiver', accountid);
      console.log("receiver click");
      // localStorage.setItem('cachedReceiver', JSON.stringify(response.data));
    };

    //go to the confirmation page
    $scope.onSubmit=function(){
      $location.path("/dashboard/confirmation");
    }
 

    var resendQueryParam = $location.search();
    var selectedTransaction = quickResendService.getSelectedTransaction();
    console.log(selectedTransaction);

    if (resendQueryParam.isResendClicked) {
 
      angular.element(document).ready(function () {
 
        if (selectedTransaction && selectedTransaction.toAccountId) {
          var accountId1 = selectedTransaction.toAccountId;
          $http
            .get("http://localhost:8082/api/account/details/" + accountId1)
            .then(function (response) {
              updateAccounts(response);
              $scope.onClick(accountId1); // Call onClick automatically
 
 
            })
            .catch(function (error) {
              console.log("Error:", error);
            });
 
        }
      });
    } else {
   
      $http
          .get("http://localhost:8082/api/account/get/"+accountId)
            .then(function(response){
              console.log(response.data);
              $scope.allAccounts=response.data;
              console.log(response.data);
            })
            .catch(function(error){
              console.log("Error:",error);
              const cachedAccounts = localStorage.getItem('cachedAccounts');
                    if (cachedAccounts) {
                        $scope.allAccounts = JSON.parse(cachedAccounts);
                    } else {
                        // Handle case when there's no cached data available
                        $scope.allAccounts = null;
                    }
            });
          }
          },


])
