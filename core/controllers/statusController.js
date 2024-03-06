wuApp.controller("statusController", [
  "$scope",
  "$http",
  "$interval",
  "authService",
  "localStorageService",
  "accountService",
  function ($scope, $http, $interval, authService,localStorageService,accountService) {
    $scope.headLeftImage = "assets/wall-clock.png";
    $scope.headLeftText = "Your transaction is being processed...";

    $scope.statusAcc = {
      isCustomHeaderOpen: false,
      isFirstOpen: false,
      isFirstDisabled: false,
    };

    $scope.account = {
      accountId: "",
      bankName: "",
      accountNo: "",
      balance: "",
    };

    $scope.transactions = {
      transactionId: "",
      toAccountId: "",
      fromAccountId: "",
      dateTime: "",
      baseCurrencyCode: "",
      targetCurrencyCode: "",
      amount: "",
      transferedAmount: "",
      status: "",
    };

    var id = localStorageService.getUserID();
    var accId = "";
    var accountid= accountService.getAccountID();

    function fetchTransactionStatus() {
      $http
        .get("http://localhost:8083/api/transaction/history/" + accountid)
        .then(function (response) {
          $scope.transactions = response.data;
          console.log($scope.transactions[0].status);
        })
        .catch(function (error) {
          console.log("Error:", error);
        });
    }

    $http
      .get("http://localhost:8081/api/user/account/" + id)
      .then(function (response) {
        $scope.account = response.data[0];
        accId = $scope.account.accountId;
        console.log(accId);

        fetchTransactionStatus();
      })
      .catch(function (error) {
        console.log("Error:", error);
      });

    var intervalPromise = $interval(fetchTransactionStatus, 3000);

    $scope.$watch("transactions[0].status", function (newStatus) {
      if (newStatus === "SUCCESS") {
        $scope.headLeftImage = "assets/check.png";
        $scope.headLeftText = "Your transaction was successful!";

        $interval.cancel(intervalPromise);
      } else {
        $scope.headLeftImage = "assets/wall-clock.png";
        $scope.headLeftText = "Your transaction is being processed...";
      }
    });

    $scope.$on("$destroy", function () {
      $interval.cancel(intervalPromise);
    });
  },
]);
