wuApp.controller('reminderModalController', [
    '$scope',
    "$http",
    '$uibModalInstance', // Inject the $uibModalInstance service to interact with this modal instance
    'reminderDetails',
    "authService",
    function ($scope,$http,$uibModalInstance,reminderDetails,authService) {
    // Pre-fill the form
     $scope.reminderDetails = reminderDetails;
     var emailId = authService.getEmailID();
     console.log(emailId);
    

    // Date and Time picker setup

    $scope.dateOptions = {
        // Disable past dates
        minDate: new Date(),
        // Other options can go here
    };
    $scope.format = 'yyyy/MM/dd/'; // Set the format for the date
    $scope.popup = {
        opened: false
    };

    $scope.open = function() {
        $scope.popup.opened = true;
    };

    //set the format for time
    $scope.formatTime = function(date) {
        if (!date) return '';
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        // Ensuring two digits by padding with zero if necessary
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':' + minutes + ':' + seconds;
    };
    
   
    

    
    
    $scope.ok = function () {
        // Implement submission logic here, possibly using $http to send data to your backend
        var formattedTime = $scope.formatTime($scope.reminderDetails.reminderTime);
        var postData ={
            createdBy:emailId,
            modifiedBy:emailId,
            sourceCountry:$scope.reminderDetails.sourceCountry,
            destinationCountry: $scope.reminderDetails.destinationCountry,
            payIn: $scope.reminderDetails.paymentMethod,
            amount: $scope.reminderDetails.amount,
            date: $scope.reminderDetails.reminderDate,
            time : formattedTime
        };
        console.log(postData.time);
        $http.post('http://localhost:8083/api/transaction/createreminder', postData)
        .then(function(response) {
            // Success callback
            console.log('Reminder details submitted successfully:', response.data);
            $uibModalInstance.close(true); //close the modal on success
        }, function(error) {
            // Error callback
            console.error('Error submitting reminder details:', error);
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

   
}]);

