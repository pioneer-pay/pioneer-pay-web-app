wuApp.service('accountService', function() {
//   this.accountID = ''; // Store userID as a property of the service
// this.getAccountID = function() {
//       return this.accountID;  };
// this.setAccountID = function(newAccountID) {
//    this.accountID = newAccountID;  };
   var accountIDKey = 'accountID';

   return {
       setAccountID: function(accountID) {
           localStorage.setItem(accountIDKey, accountID);
       },
 
       getAccountID: function() {
           return localStorage.getItem(accountIDKey);
       },
 
       clearAccountID: function() {
           localStorage.removeItem(accountIDKey);
       }
   };
});
