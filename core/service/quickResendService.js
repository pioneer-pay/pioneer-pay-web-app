wuApp.service('quickResendService', function(){
    var selectedTransaction = null;

    this.setSelectedTransaction = function(transaction) {
        selectedTransaction = transaction;
    };

    this.getSelectedTransaction = function() {
        return selectedTransaction;
    };
})