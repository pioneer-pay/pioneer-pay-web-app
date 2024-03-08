wuApp.controller("confirmController", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  "authService",
  "accountService",
  "transactionService",
  function ($scope, $http, $location, $rootScope, authService, accountService, transactionService) {
    $scope.senderAccount = {
      accountHolderName: "",
      accountId: "",
      bankName: "",
      accountNo: "",
      balance: "",
      ifscCode: ""
    };

    $scope.recieverAccount = {
      accountHolderName: "",
      accountId: "",
      bankName: "",
      accountNo: "",
      balance: "",
      ifscCode: ""
    };

    $scope.summary = {
      amount: '',
      commission: '',
      receivedMoney: '',
      rate: '',
      baseCurrencyCode: '',
      targetCurrencyCode: ''
    };
    $scope.transaction = {
      transactionId: "",
      fromAccountId: "",
      toAccountId: "",
      dateTime: "",
      baseCurrencyCode: "",
      targetCurrencyCode: "",
      amount: "",
      transferedAmount: "",
      commission: "",
      status: ""
    };

    $scope.exchangeRateFinal = "";

    var receiverAccountId = transactionService.getReceiverAccountID();
    console.log(receiverAccountId);
    var source = transactionService.getBaseCurrencyCode();
    var target = transactionService.getTargetCurrencyCode();
    var amt = transactionService.getAmount();


    //confirm details and proceed transaction


    //sender details
    var id = authService.getUserID();
    $http
      .get("http://localhost:8081/api/user/account/" + id)
      .then(function (response) {
        console.log(response.data);
        $scope.senderAccount = response.data[0];
        console.log($scope.senderAccount);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });


    //summary of transaction
    $http.get("http://localhost:8083/api/transaction/summary/" + source + "/" + target + "/" + amt)
      .then(function (response) {
        console.log(response.data);
        $scope.summary = response.data;
        result.innerHTML = `${1} ${source} = ${$scope.summary.rate.toFixed(4)} ${target}`;
        result2.innerHTML = `${1} ${source} = ${$scope.summary.rate.toFixed(4)} ${target}`;
        console.log($scope.summary);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });


    //receiver details
    $http
      .get("http://localhost:8082/api/account/details/" + receiverAccountId)
      .then(function (response) {
        console.log("hello");
        $scope.recieverAccount = response.data;
        console.log($scope.recieverAccount);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });

    //---------------------Initiate Transaction----------------------------//
    let accountId = accountService.getAccountID();
    $scope.initiateTransaction = function () {
      $scope.transaction.fromAccountId = accountId;
      $scope.transaction.toAccountId = transactionService.getReceiverAccountID();
      $scope.transaction.amount = amt;
      $scope.transaction.baseCurrencyCode = source;
      $scope.transaction.targetCurrencyCode = target;
      console.log($scope.transaction);
      $http.post("http://localhost:8083/api/transaction/initiate", $scope.transaction)
        .then(function (response) {
          $scope.responseMessage = response.data.message;
          console.log(response.data);
          $location.path("/status");
          $scope.loading = false;
        })
        .catch(function (error) {
          console.log("Error:", error);
          $scope.loading = false;
        });
    }



  },
]);
