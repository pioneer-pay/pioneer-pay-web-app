wuApp.controller("receiverController", [
  "$scope",
  "$http",
  "$location",

  function($scope,$http,$location){
  $scope.account={
   accountHolderName:"",
      bankName:"",
      accountHolderName:"",
      accountNo:"",
      balance:"",
      ifscCode:"",
  };

   //cancel add new receiver
   $scope.cancelNewReceiver = function(){
      $location.path("/transaction");
   };

//add receiver details
   $scope.submit= function(form){
      console.log($scope.account);
      $http
           .post("http://localhost:8082/api/account/add", $scope.account)
           .then(function(response){
                console.log(response.data);
                Swal.fire("Receiver added Successfully!!");
                $location.path("/transaction");
           })
           .catch(function(error){
              console.log("Error:",error);
           })
   };
  },
]);




