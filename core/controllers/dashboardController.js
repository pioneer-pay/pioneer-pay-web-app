wuApp.controller("dashboardController", [
  "$scope",
  "$http",
  "$location",
  "$interval",
  "transactionService",
  "authService",
  "accountService",

  "quickResendService",
  "$location",
  "$timeout",
  "localStorageService",
  "networkInfoService",
  function ($scope, $http, $location, $interval, transactionService, authService, accountService,localStorageService,networkInfoService, quickResendService, $timeout) {
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

    $scope.amountValue = "";
    var sendMoneyQuery = $location.search();
    $scope.onClick = function () {
    $location.path('/transaction');
    $scope.cachedTransfer="";
//     $scope.onClick = function () {};
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
    $scope.$on('$destroy', function() {
      if (angular.isDefined(intervalPromise)) {
          $interval.cancel(intervalPromise);
          intervalPromise = undefined;
      }});
    
    //pending transfer operations
    $scope.onCancelPending = function(){
      localStorage.removeItem('cachedTransfer');
      console.log("canceld pending transfer");
    };
    
    $scope.onContinuePending = function(){
    console.log("offline transfer is being initiated");
    $http.post("http://localhost:8083/api/transaction/initiate",$scope.cachedTransfer)
            .then(function(response){
              $scope.responseMessage = response.data.message;
              console.log(response.data);
              localStorage.removeItem('cachedTransfer');
              $location.path("/status");
              $scope.loading = false;
            })
            .catch(function(error){
              console.log("Error:",error);
            });
    };
    
    $scope.bankClicked = false;
    $scope.toggleBankClicked = function () {
      $scope.bankClicked = !$scope.bankClicked;
      console.log("Bank clicked");

    };




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
    let accountid= accountService.getAccountID();
    $http.get("http://localhost:8082/api/account/get/" + accountid)
    .then(function(response) {
        console.log(response.data);
        $scope.allAccounts = response.data;
        console.log(response.data);
        // Cache the data
        localStorage.setItem('cachedAccounts', JSON.stringify(response.data));
    })
    .catch(function(error) {
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
    let selectTo = document.getElementById("countrySelectTo");
    let currencyCodeDisplayTo = document.getElementById("currencyCodeReceive");
    let selectFrom = document.getElementById("countrySelectFrom");
    let currencyCodeDisplayFrom = document.getElementById("currencyCodeSend");

    $scope.bankClicked = false;
    $scope.toggleBankClicked = function () {
      $scope.bankClicked = !$scope.bankClicked;
      console.log("Bank clicked");
    };

    $scope.cardClicked = false;
    $scope.toggleCardClicked = function () {
      $scope.cardClicked = !$scope.cardClicked;
      console.log("Card clicked");
    };


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


      // 
      //init();
    });
    // console.log("sender country code:"+typeof sendMoneyQuery.senderCountry)




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
    if (sendMoneyQuery.amount) {
      document.getElementById("amount").value = sendMoneyQuery.amount;
    }




    // Loop through the countries array and add options to the select element

    for (const element of countries) {
      let option = document.createElement("option");
      option.value = element.currency_code;
      option.text = element.country;
      selectTo.appendChild(option);
    }

    for (const element of countries) {
      let option = document.createElement("option");
      option.value = element.currency_code;
      option.text = element.country;
      selectFrom.appendChild(option);
    }
    //to show selected country currency code
    selectTo.addEventListener("change", function () {
      let selectedValue = selectTo.value;
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


    console.log(document.getElementById("amount").value);


    let convertCurrency = () => {

      console.log('convertCurrency() called');
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

      if (amount.length !== 0) {
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
            amountReceiveInput.value =
              $scope.summary.amount * $scope.summary.rate;

            result.innerHTML = `${1} ${selectedCountryFrom} = ${$scope.summary.rate.toFixed(4)} ${selectedCountryTo}`;
            result2.innerHTML = `${1} ${selectedCountryFrom} = ${$scope.summary.rate.toFixed(4)} ${selectedCountryTo}`;

            console.log($scope.summary);
            localStorage.setItem('cachedSummary', JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log("Error:", error);
          });
      } else {
        alert("Please fill in the amount");
      }
    };


    let amountInput = document.getElementById("amount");
    console.log(typeof amountInput.value);
    let timeoutId;

    amountInput.addEventListener("input", function () {

      clearTimeout(timeoutId);
      var amount = sendMoneyQuery.amount || (amountInput.value.trim() !== "" ? amountInput.value : undefined);
      if (amount !== undefined) {
        timeoutId = $timeout(function () {
          convertCurrency();
        }, 3000);
      }

    });









  },
]);
