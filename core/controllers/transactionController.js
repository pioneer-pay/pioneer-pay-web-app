wuApp.controller("transactionController",[
  "$scope",
  "$http",
  "$location",
  "authService",
  "accountService",
  "transactionService",
  "localStorageService",
  function($scope,$http,$location,authService,accountService,transactionService,localStorageService){
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
    };

    //go to the confirmation page
    $scope.onSubmit=function(){
      $location.path("/dashboard/confirmation");
    }
 
    $http
          .get("http://localhost:8082/api/account/get/"+accountId)
            .then(function(response){
              console.log(response.data);
              $scope.allAccounts=response.data;
              console.log(response.data);
            })
            .catch(function(error){
              console.log("Error:",error);
            });
          },


])
