wuApp.controller("dashboardController", [
  "$scope",
  "$http",
  "$uibModal",
  "$location",
  "$interval",
  "$timeout",
  "transactionService",
  "authService",
  "accountService",
  "localStorageService",
  "networkInfoService",
  "quickResendService",
  function ($scope, $http, $uibModal, $location, $interval, $timeout, transactionService, authService, accountService, localStorageService, networkInfoService, quickResendService) {
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
    $scope.summary = {
      amount: "",
      transferAmount: "",
      totalAmount: "",
      commission: "",
      receivedMoney: "",
      rate: "",
      baseCurrencyCode: "",
      targetCurrencyCode: "",
    };
    $scope.account = {
      accountHolderName: "",
      bankName: "",
      accountNo: "",
      balance: "",
      ifscCode: "",
    };
    $scope.showErrorMessage = false;


    $scope.onClick = function () { };
    $scope.selectedCardId = null;

    $scope.setSelectedPaymentMethod = function (cardId, paymentMethod) {
      $scope.selectedCardId = $scope.selectedCardId === cardId ? null : cardId;
      console.log("Card clicked with ID:", cardId);
      $scope.selectedPaymentMethod = paymentMethod;
      console.log("Card clicked for payment option:", paymentMethod);
    };

    var sendMoneyQuery = $location.search();

    $scope.cachedTransfer = "";

    $scope.onSubmitClick = function () {

      $location.path("/transaction");
    };
    //check internet connection
    console.log("online connection check!");
    $scope.isOnline = networkInfoService.isOnline();
    function updateOnlineStatus() {
      $scope.isOnline = networkInfoService.isOnline();
      const cachedTransfer = localStorage.getItem('cachedTransfer');
      if (cachedTransfer) {
        $scope.cachedTransfer = JSON.parse(cachedTransfer);
      } else {
        //when there's no cached data available
        $scope.cachedTransfer = null;
      }
      // console.log($scope.isOnline);
    }
    var intervalPromise = $interval(updateOnlineStatus, 3000);
    $scope.$on('$destroy', function () {
      if (angular.isDefined(intervalPromise)) {
        $interval.cancel(intervalPromise);
        intervalPromise = undefined;
      }
    });

    //pending transfer operations
    $scope.onCancelPending = function () {
      localStorage.removeItem('cachedTransfer');
      console.log("canceld pending transfer");
    };

    $scope.onContinuePending = function () {
      console.log("offline transfer is being initiated");
      $http.post("http://localhost:8083/api/transaction/initiate", $scope.cachedTransfer)
        .then(function (response) {
          $scope.responseMessage = response.data.message;
          console.log(response.data);
          localStorage.removeItem('cachedTransfer');
          $location.path("/status");
          $scope.loading = false;
        })
        .catch(function (error) {
          console.log("Error:", error);
        });
    };

    //add reminder
    $scope.openReminderModal = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/reminderModalContent.html',
        controller: 'reminderModalController',
        resolve: {
          reminderDetails: function () {
            return {
              amount: document.getElementById("amount").value,
              sourceCountry: document.getElementById("countrySelectFrom").options[document.getElementById("countrySelectFrom").selectedIndex].text,
              destinationCountry: document.getElementById("countrySelectTo").options[document.getElementById("countrySelectTo").selectedIndex].text,
              paymentMethod: $scope.selectedPaymentMethod,
              reminderDate: new Date(), // Initialize with current date
              reminderTime: new Date() // Initialize with current time

            };

          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.bankClicked = false;
    $scope.toggleBankClicked = function () {
      $scope.bankClicked = !$scope.bankClicked;
      console.log("Bank clicked");
    };

    //    $scope.cardClicked = false;
    //    $scope.toggleCardClicked = function () {
    //      $scope.cardClicked = !$scope.cardClicked;
    //      console.log("Card clicked");
    //    };

    //get sender account details to continue transaction
    let id = localStorageService.getUserID();
    $http
      .get("http://localhost:8081/api/user/account/" + id)
      .then(function (response) {
        console.log(response.data);
        $scope.account = response.data[0];
        localStorage.setItem('cachedSender', JSON.stringify(response.data[0]));
        $scope.accountId = response.data[0].accountId;
        accountService.setAccountID(response.data[0].accountId);
        console.log(accountService.getAccountID());
        console.log($scope.account);
      });

    //store receiver list
    let accountid = accountService.getAccountID();
    $http.get("http://localhost:8082/api/account/get/" + accountid)
      .then(function (response) {
        console.log(response.data);
        $scope.allAccounts = response.data;
        console.log(response.data);
        // Cache the data
        localStorage.setItem('cachedAccounts', JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log("Error:", error);
        // Attempt to retrieve data from cache
        const cachedAccounts = localStorage.getItem('cachedAccounts');
        if (cachedAccounts) {
          $scope.allAccounts = JSON.parse(cachedAccounts);
        } else {
          // Handle case when there's no cached data available
          $scope.allAccounts = null;
        }
      });


    let currencyFrom = "";
    let currencyTo = "";

    //code for select country from dropdown and show its currency
    let select = document.getElementById("countrySelectTo");
    let currencyCodeDisplayTo = document.getElementById("currencyCodeReceive");
    let selectFrom = document.getElementById("countrySelectFrom");
    let currencyCodeDisplayFrom = document.getElementById("currencyCodeSend");

    // Loop through the countries array and add options to the select element
    for (const element of countries) {
      let option = document.createElement("option");
      option.value = element.currency_code;
      option.text = element.country;
      select.appendChild(option);
    }

    for (const element of countries) {
      let option = document.createElement("option");
      option.value = element.currency_code;
      option.text = element.country;
      selectFrom.appendChild(option);
    }
    //to show selected country currency code
    select.addEventListener("change", function () {
      let selectedValue = select.value;
      let selectedCountry = countries.find(
        (country) => country.currency_code === selectedValue
      );

      if (selectedCountry) {
        currencyCodeDisplayTo.textContent = selectedCountry.currency_code;
        currencyTo = selectedCountry.currency_code;
        console.log(currencyTo);
        // transactionService.setTargetCurrencyCode(currencyTo);
        // transactionService.getTargetCurrencyCode();
      } else {
        currencyCodeDisplayTo.textContent = "";
      }
    });

    selectFrom.addEventListener("change", function () {
      let selectedValue = selectFrom.value;
      let selectedCountry = countries.find(
        (country) => country.currency_code === selectedValue
      );

      if (selectedCountry) {
        currencyCodeDisplayFrom.textContent = selectedCountry.currency_code;
        currencyFrom = selectedCountry.currency_code;
        console.log(selectedCountry.currency_code);
        // transactionService.setBaseCurrencyCode(currencyFrom);
        // transactionService.getBaseCurrencyCode();
      } else {
        currencyCodeDisplayFrom.textContent = "";
      }
    });


    angular.element(document).ready(function () {
      console.log("page loaded", $location.search());
      if ($location.search().isResendClicked) {
        $scope.bankClicked = true;
        $scope.toggleBankClicked = function () {
          $scope.bankClicked = !$scope.bankClicked;
          console.log("Bank clicked");
        };

        $scope.cardClicked = true;
        $scope.toggleCardClicked = function () {
          $scope.cardClicked = !$scope.cardClicked;
          console.log("Card clicked");
        };
        convertCurrency();
      }

    });



    //------------------------autofill data if resend clicked------------------------------//
    let selectedCountryFrom = sendMoneyQuery.senderCountry;
    let selectedCountryTo = sendMoneyQuery.receiverCountry;

    let countryFrom = countries.find(country => country.currency_code === selectedCountryFrom);
    let countryTo = countries.find(country => country.currency_code === selectedCountryTo);

    if (countryFrom && selectedCountryFrom) {
      document.getElementById("optionFrom").textContent = countryFrom.country;
      document.getElementById("currencyCodeSend").textContent = countryFrom.currency_code;
    }

    if (countryTo && selectedCountryTo) {
      document.getElementById("optionTo").textContent = countryTo.country;
      document.getElementById("currencyCodeReceive").textContent = countryTo.currency_code;
    }
    // let amountInput = document.querySelector("#amount");
    // amountInput.dispatchEvent(new Event("input"));
    let amount;
    $scope.sendAmount = $location.search().amount || "";


    let convertCurrency = () => {

      
      let selectedCountryFrom = sendMoneyQuery.senderCountry || document.getElementById("currencyCodeSend").textContent;

      let selectedCountryTo = sendMoneyQuery.receiverCountry || document.getElementById("currencyCodeReceive").textContent;

      console.log(selectedCountryFrom + " " + selectedCountryTo);

      var amount = sendMoneyQuery.amount || document.getElementById("amount").value
      console.log(document.getElementById('amount').value);
      const amountReceiveInput = document.querySelector("#amountReceive");
      transactionService.setBaseCurrencyCode(selectedCountryFrom);
      transactionService.setTargetCurrencyCode(selectedCountryTo);
      transactionService.setAmount(amount);
      console.log(transactionService.getAmount());
      if ($scope.sendAmount === undefined || $scope.sendAmount === null || isNaN($scope.sendAmount) || $scope.sendAmount <= 0) {
        // If input is invalid, show an error message and exit the function
        $scope.showErrorMessage = true;
        $scope.errorMessage = "Please enter a valid positive numerical value.";
        amountReceiveInput.value = " ";
        $scope.summary = "";
        
        return; // Exit the function
      }

      if ($scope.sendAmount !== undefined
        || $scope.sendAmount !== null
        || !isNaN($scope.sendAmount)
        || $scope.sendAmount > 0) {
        $scope.showErrorMessage = false;
        $http
          .get(
            "http://localhost:8083/api/transaction/summary/" +
            selectedCountryFrom +
            "/" +
            selectedCountryTo +
            "/" +
            amount
          )
          .then(function (response) {
            $scope.summary = response.data;
            console.log("on line 226:" + $scope.summary);
            amountReceiveInput.value = $scope.summary.amount * $scope.summary.rate;
            $scope.summary.totalAmount = $scope.summary.amount;
            $scope.summary.transferAmount = $scope.summary.amount - $scope.summary.commission;

            result.innerHTML = `${1} ${selectedCountryFrom} = ${$scope.summary.rate.toFixed(4)} ${selectedCountryTo}`;
            result2.innerHTML = `${1} ${selectedCountryFrom} = ${$scope.summary.rate.toFixed(4)} ${selectedCountryTo}`;

            console.log($scope.summary);
          })
          .catch(function (error) {
            console.log("Error:", error);
          });
      } else {
        $scope.showErrorMessage = true;
        $scope.errorMessage = "Please enter a valid positive numerical value.";
      }
    };


    let amountInput = document.getElementById("amount");
    console.log(typeof amountInput.value);
    let timeoutId;

    amountInput.addEventListener("input", function () {

      clearTimeout(timeoutId);
      if ($scope.sendAmount === undefined || $scope.sendAmount === null || isNaN($scope.sendAmount) || $scope.sendAmount <= 0) {
        $scope.showErrorMessage = true;
        $scope.errorMessage = "Please enter a valid number";
      } else {
        timeoutId = $timeout(function () {
          $scope.showErrorMessage = false;
          convertCurrency();
        }, 3000);
      }


    });


    //   document
    //     .querySelector("#convert-button")
    //     .addEventListener("click", convertCurrency);
    //   window.addEventListener("load", convertCurrency);
  },
]);
