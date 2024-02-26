wuApp.service('transactionService',function(){
  this.receiverAccountID='';

  this.getReceiverAccountID=function(){
    return this.receiverAccountID;
  };

  this.setReceiverAccountID=function(newReceiverAccountID){
    this.receiverAccountID=newReceiverAccountID;
  };



  this.amount='';

  this.getAmount=function(){
    return this.amount;
  };

  this.setAmount=function(newAmount){
    this.amount=newAmount;
  };



  this.baseCurrencyCode='';

  this.getBaseCurrencyCode=function(){
    return this.baseCurrencyCode;
  };

  this.setBaseCurrencyCode=function(newBaseCurrencyCode){
    this.baseCurrencyCode=newBaseCurrencyCode;
  };



  this.targetCurrencyCode='';

  this.getTargetCurrencyCode=function(){
    return this.targetCurrencyCode;
  };

  this.setTargetCurrencyCode=function(newTargetCurrencyCode){
    this.targetCurrencyCode=newTargetCurrencyCode;
  };

})
