wuApp.service('internetConnectivityService', function() {
    this.isOnline = function() {
      return navigator.onLine;
    };
  });
  