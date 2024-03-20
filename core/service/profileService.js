wuApp.service('profileService', function() {
    var localStorageUserName = 'userName';
  
    return {
        setUserName: function(userName) {
            localStorage.setItem(localStorageUserName, userName);
        },
  
        getUserName: function() {
            return localStorage.getItem(localStorageUserName);
        },
  
        clearUserName: function() {
            localStorage.removeItem(localStorageUserName);
        }
    };
  });
  