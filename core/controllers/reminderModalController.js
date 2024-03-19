wuApp.controller('reminderModalController', [
    '$scope',
    "$http",
    '$uibModalInstance', // Inject the $uibModalInstance service to interact with this modal instance
    'reminderDetails',
    "authService",
    "dateTimePickerService",
    function ($scope,$http,$uibModalInstance,reminderDetails,authService,dateTimePickerService) {
    // Pre-fill the form
     $scope.reminderDetails = reminderDetails;
     var emailId = authService.getEmailID();
     console.log(emailId);
    
    
    // Use the DateTimePickerService to get date options
    $scope.dateOptions = dateTimePickerService.getDatePickerOptions();
    $scope.format = 'yyyy/MM/dd/'; // Set the format for the date
    $scope.popup = {
        opened: false
    };
    
    $scope.open = function() {
        $scope.popup.opened = true;
    };
    
    // Use the formatTime function from DateTimePickerService
    $scope.formatTime = dateTimePickerService.formatTime;
    
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

