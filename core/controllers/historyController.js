wuApp.controller("historyController", [
  "$scope",
  "$http",
  "authService",
  "localStorageService",
  "accountService",
  "$location",
  "quickResendService",
  function ($scope, $http, authService, localStorageService, accountService, $location, quickResendService) {
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
      status: "",
    };

    $scope.account = {};

    //show transaction history
    var id = authService.getUserID();
    var userId = localStorageService.getUserID();
    var accountId = accountService.getAccountID();
    console.log(accountId);
    // $http
    //   .get("http://localhost:8083/api/transaction/history/" + accountId)
    //   .then(function (response) {
    //     console.log(response.data);
    //     $scope.transaction = response.data;
    //   })
    //   .catch(function (error) {
    //     console.log("Error:", error);
    //   });

    $http
      .get("http://localhost:8081/api/user/account/" + userId)
      .then(function (response) {
        $scope.account = response.data[0];
        console.log($scope.account);

        accId = $scope.account.accountId;
        console.log(accId);

        $http
          .get("http://localhost:8083/api/transaction/history/" + accId)
          .then(function (response) {
            console.log(response.data);
            $scope.transaction = response.data;
          })
          .catch(function (error) {
            console.log("Error:", error);
          });
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
    //-----------------------------------quick resend------------------------//
    $scope.quickResend = function (transactionDetail) {
      console.log(transactionDetail);
      $location.search({
        amount: transactionDetail.amount,
        senderCountry: transactionDetail.baseCurrencyCode,
        receiverCountry: transactionDetail.targetCurrencyCode,
        isResendClicked: true
      })
      transactionDetail.isResendClicked = true;
      quickResendService.setSelectedTransaction(transactionDetail);
      $location.path("/dashboard");
    }
  },
]);
