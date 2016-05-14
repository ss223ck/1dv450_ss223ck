angular.module("demoapp").controller("EventControllerDelete", EventControllerDelete);

EventControllerDelete.$inject = ["$scope", "$location", "ApiEventFactory", "UserInteractionMessagesFactory"];

function EventControllerDelete($scope, $location, apiEvent, UIMfactory){

    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }
    var urlParameters = $location.search();
    apiEvent.deleteEvent(urlParameters.id).then(function(response){
        UIMfactory.addUserSuccessMessage("You deleted the event");
        $location.path("/");
    }).error(function(error){
        UIMfactory.addUserFailedMessage("You didn't delete the event");
        $location.path("/");
    });
};