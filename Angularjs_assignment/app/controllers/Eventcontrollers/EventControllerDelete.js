angular.module("demoapp").controller("EventControllerDelete", EventControllerDelete);

EventControllerDelete.$inject = ["$location", "ApiEventFactory", "UserInteractionMessagesFactory"];

function EventControllerDelete($location, apiEvent, UIMfactory){

    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }
    var urlParameters = $location.search();
    apiEvent.deleteEvent(urlParameters.id).then(function(response){
        UIMfactory.addUserSuccessMessage("You deleted the event");
        $location.path("/");
    },function(error){
        if(error.status == 401) {
            UIMfactory.addUserFailedMessage("You are not the owner of the resource you tried to delete");
        }else{
            UIMfactory.addUserFailedMessage("Something went wrong when deleting the event");
        }
        $location.path("/");
    });
};