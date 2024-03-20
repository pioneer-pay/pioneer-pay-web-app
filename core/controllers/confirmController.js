wuApp.controller("confirmController", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  "authService",
  "accountService",
  "transactionService",
  function ($scope, $http, $location, $rootScope, authService,accountService,transactionService) {
    $scope.senderAccount = {
      accountHolderName:"",
      accountId: "",
      bankName: "",
      accountNo: "",
      balance: "",
      ifscCode:""
    };

    $scope.recieverAccount = {
      accountHolderName:"",
      accountId: "",
      bankName: "",
      accountNo: "",
      balance: "",
      ifscCode:""
    };
    
    $scope.summary={
      amount:'',
      commission:'',
      receivedMoney:'',
      rate:'',
      baseCurrencyCode:'',
      targetCurrencyCode:''
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

    $scope.exchangeRateFinal = "";
    $scope.allAccounts= "";
    var receiverAccountId = transactionService.getReceiverAccountID();
    console.log(receiverAccountId);
    var source=transactionService.getBaseCurrencyCode();
    var target=transactionService.getTargetCurrencyCode();
    var amt=transactionService.getAmount();


    //confirm details and proceed transaction


    //sender details
    var id = authService.getUserID();
    var accid= accountService.getAccountID();
    $http
      .get("http://localhost:8082/api/account/details/"+accid)
      .then(function (response) {
        console.log(response.data);
        console.log("sender account");
        $scope.senderAccount = response.data;
        console.log($scope.senderAccount);
      })
      .catch(function (error) {
        console.log("Error:", error);
        const cachedSender = localStorage.getItem('cachedSender');
                    if (cachedSender) {
                        $scope.senderAccount = JSON.parse(cachedSender);
                    } else {
                        // Handle case when there's no cached data available
                        $scope.senderAccount = null;
                    }
      });


    //summary of transaction
    $http.get("http://localhost:8083/api/transaction/summary/"+source+"/"+target+"/"+amt)
    .then(function(response){
      console.log(response.data);
      $scope.summary=response.data;
       result.innerHTML= `${1} ${source} = ${$scope.summary.rate.toFixed(4)} ${target}`;
      result2.innerHTML= `${1} ${source} = ${$scope.summary.rate.toFixed(4)} ${target}`;
      console.log($scope.summary);
    })
    .catch(function(error){
      console.log("Error:",error);
      const cachedSummary = localStorage.getItem('cachedSummary');
                    if (cachedSummary) {
                        $scope.summary = JSON.parse(cachedSummary);
                        result.innerHTML= `${1} ${source} = ${$scope.summary.rate.toFixed(4)} ${target}`;
                        result2.innerHTML= `${1} ${source} = ${$scope.summary.rate.toFixed(4)} ${target}`;
                    } else {
                        // Handle case when there's no cached data available
                        $scope.summary = null;
                    }
    });
    

    //receiver details
    $http
      .get("http://localhost:8082/api/account/details/"+receiverAccountId)
      .then(function (response) {
        console.log("receiver account");
        $scope.recieverAccount = response.data;
        console.log($scope.recieverAccount);
      })
      .catch(function (error) {
        console.log("Error:", error);
        const cachedAccounts = localStorage.getItem('cachedAccounts');
                    if (cachedAccounts) {
                        $scope.allAccounts = JSON.parse(cachedAccounts); 
                        const desiredAccount = $scope.allAccounts.find(function(account) {
                          return account.accountId === receiverAccountId;
                      }); 
                      if (desiredAccount) {
                          // Assign the desired account to $scope.recieverAccount
                          $scope.recieverAccount = desiredAccount;
                          console.log("Receiver account from cache:", $scope.recieverAccount);
                      } else {
                          console.log("Account with accountId", receiverAccountId, "not found in cached accounts.");
                      }
                    } else {
                        // Handle case when there's no cached data available
                        $scope.allAccounts = null;
                    }
      });

    //---------------------Initiate Transaction----------------------------//
    let accountId=accountService.getAccountID();
    $scope.initiateTransaction=function(){
      $scope.transaction.fromAccountId=accountId;
      $scope.transaction.toAccountId=transactionService.getReceiverAccountID();
      $scope.transaction.amount=amt;
      $scope.transaction.baseCurrencyCode=source;
      $scope.transaction.targetCurrencyCode=target;
      console.log($scope.transaction);
      $http.post("http://localhost:8083/api/transaction/initiate",$scope.transaction)
            .then(function(response){
              $scope.responseMessage = response.data.message;
              console.log(response.data);
              $location.path("/status");
              $scope.loading = false;
            })
            .catch(function(error){
              console.log("Error:",error);
              localStorage.setItem('cachedTransfer', JSON.stringify($scope.transaction));
              $scope.loading = false;
              $location.path("/dashboard");
            });
    }



  },
]);
