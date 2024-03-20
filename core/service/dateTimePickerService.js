// Create a service named DateTimePickerService
wuApp.service('dateTimePickerService', function() {
    // Date picker setup
    this.getDatePickerOptions = function() {
        return {
            minDate: new Date(), // Disable past dates
            // Additional date picker options can go here
        };
    };

    // Time format function
    this.formatTime = function(date) {
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
});
