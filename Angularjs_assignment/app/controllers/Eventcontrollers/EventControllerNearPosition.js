angular.module('demoapp').controller("EventControllerNearPosition", EventControllerNearPosition);
EventControllerNearPosition.$inject = ["$scope", "ApiEventFactory", "ApiPositionFactory", "UserInteractionMessagesFactory", "$location"]

function EventControllerNearPosition($scope, apiEvent, apiPosition, UIMfactory, $location){
    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();


    getAllPositions();
    function getAllPositions() {
        apiPosition.getAllPositions().then(function(response){
            //change in below line
            $scope.positions = response.requested_position;
        }, function(error){
            UIMfactory.addUserFailedMessage("Something went wrong, try again!");
            $location.path("/");
        });
    };

    $scope.SearchEvent = function(){
        apiEvent.showNearbyEvents($scope.location_name).then(function(response){
            $scope.events = response.requested_events[0];
        }, function(error){
            UIMfactory.addUserFailedMessage("Something went wrong, try again!");
            $location.path("/");
        });
    };
};