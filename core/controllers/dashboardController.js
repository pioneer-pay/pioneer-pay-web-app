wuApp.controller("dashboardController", [
  "$scope",
  "$http",
  "$uibModal",
  "$location",
  "$interval",
  "transactionService",
  "authService",
  "accountService",
  "localStorageService",
  "networkInfoService",
  function ($scope, $http,$uibModal, $location, $interval, transactionService, authService, accountService,localStorageService,networkInfoService) {
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
    $scope.cachedTransfer="";
    $scope.onClick = function () {};
    $scope.selectedCardId = null;

    $scope.setSelectedPaymentMethod = function (cardId,paymentMethod) {
    $scope.selectedCardId = $scope.selectedCardId === cardId ? null : cardId;
    console.log("Card clicked with ID:", cardId);
    $scope.selectedPaymentMethod = paymentMethod;
    console.log("Card clicked for payment option:", paymentMethod);
  };


    $scope.openReminderModal = function() {
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
  

    // $scope.clicked = false;
    // $scope.toggleClicked = function () {
    //   $scope.clicked = !$scope.clicked;
    //   console.log("clicked");
    // };

    // $scope.isIconClicked = false;
    // $scope.toggleClicked2 = function () {
    //   $scope.isIconClicked = !$scope.isIconClicked;
    //   console.log("isIconClicked");
    // };
 
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

    // $scope.cardClicked = false;
    // $scope.toggleCardClicked = function () {
    //   $scope.cardClicked = !$scope.cardClicked;
    //   console.log("Card clicked");
    // };

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
        transactionService.setTargetCurrencyCode(currencyTo);
        transactionService.getTargetCurrencyCode();
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
        transactionService.setBaseCurrencyCode(currencyFrom);
        transactionService.getBaseCurrencyCode();
      } else {
        currencyCodeDisplayFrom.textContent = "";
      }
    });

    let convertCurrency = () => {
      //Create References
      const amount = document.querySelector("#amount").value;
      transactionService.setAmount(amount);
      console.log(transactionService.getAmount());
      let amountReceive = document.querySelector("#amountReceive").value;

      if (amount.length != 0) {
        $http
          .get(
            "http://localhost:8083/api/transaction/summary/" +
              currencyFrom +
              "/" +
              currencyTo +
              "/" +
              amount
          )
          .then(function (response) {
            console.log(response.data);
            $scope.summary = response.data;
            document.getElementById("amountReceive").value =
              $scope.summary.amount * $scope.summary.rate;
            result.innerHTML = `${1} ${currencyFrom} = ${$scope.summary.rate.toFixed(
              4
            )} ${currencyTo}`;
            result2.innerHTML = `${1} ${currencyFrom} = ${$scope.summary.rate.toFixed(
              4
            )} ${currencyTo}`;
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

    document
      .querySelector("#convert-button")
      .addEventListener("click", convertCurrency);
    window.addEventListener("load", convertCurrency);
  },
]);
