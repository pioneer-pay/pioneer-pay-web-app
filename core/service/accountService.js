wuApp.service('accountService', function() {
  this.accountID = ''; // Store userID as a property of the service
this.getAccountID = function() {
      return this.accountID;  };
this.setAccountID = function(newAccountID) {
   this.accountID = newAccountID;  };
});
