wuApp.service('networkInfoService', function() {
    this.isOnline = function() {
      return navigator.onLine;
    };
  });
  