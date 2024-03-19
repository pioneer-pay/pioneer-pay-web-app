wuApp.service('authService', function() {  
    this.userID = ''; // Store userID as a property of the service  
this.getUserID = function() {
        return this.userID;  };  
this.setUserID = function(newUserID) {   
     this.userID = newUserID;  };

     this.emailID = ''; //  
     this.getEmailID = function() {
             return this.emailID;  };  
     this.setEmailID = function(newEmailID) {   
          this.emailID = newEmailID;  };
});