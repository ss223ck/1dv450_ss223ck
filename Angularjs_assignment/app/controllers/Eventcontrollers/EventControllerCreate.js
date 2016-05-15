angular.module('demoapp').controller('EventControllerCreate', EventControllerCreate);
EventControllerCreate.$inject = ["$scope", "ApiEventFactory", "ApiPositionFactory", "ApiTagFactory", "$location", "UserInteractionMessagesFactory"];

function EventControllerCreate($scope, apiEvent, apiPosition, apiTag, $location, UIMfactory){
    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();
    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }

    getAllPositions();
    function getAllPositions() {
        apiPosition.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };

    $scope.CreateEvent = function(){
        apiEvent.createEvent($scope.event).then(function(results){
            UIMfactory.addUserSuccessMessage("Your created a event")
            $location.path('/');
        },function(error){
            if(error.status == 401) {
                UIMfactory.addUserFailedMessage("Something went wrong when authorizing your account, try to refresh the page");
            }else{
                UIMfactory.addUserFailedMessage("Something went wrong when creating the event");
            }
            $location.path("/");
        });
    };
};
