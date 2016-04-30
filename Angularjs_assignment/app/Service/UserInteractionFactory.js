angular.module("demoapp").factory("UserInteractionMessagesFactory",function(){
    var factory = {
        printUserSuccessMessages: function(){
            var successTag = document.getElementById("success_message");
            successTag.innerHTML = localStorage["successMessage"]
            localStorage["successMessage"] = "";
        },
        printUserFailedMessage: function(){
            var successTag = document.getElementById("error_message");
            successTag.innerHTML = localStorage["errorMessage"]
            localStorage["errorMessage"] = "";
        },
        addUserSuccessMessage: function(message){
            localStorage["successMessage"] = message;
        },
        addUserFailedMessage: function(message){
            localStorage["errorMessage"] = message;
        },
    }
    return factory;
});