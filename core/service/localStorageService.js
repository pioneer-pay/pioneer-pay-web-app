wuApp.service('localStorageService', function() {
  var localStorageKey = 'userID';

  return {
      saveUserID: function(userID) {
          localStorage.setItem(localStorageKey, userID);
      },

      getUserID: function() {
          return localStorage.getItem(localStorageKey);
      },

      clearUserID: function() {
          localStorage.removeItem(localStorageKey);
      }
  };
});
