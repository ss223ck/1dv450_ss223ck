angular.module('demoapp').controller("EventControllerNearPosition", EventControllerNearPosition);
EventControllerNearPosition.$inject = ["$scope", "ApiEventFactory", "ApiPositionFactory", "UserInteractionMessagesFactory", "$location"]

function EventControllerNearPosition($scope, apiEvent, apiPosition, UIMfactory, $location){
    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();

    getAllPositions();

    function getAllPositions() {
        apiPosition.getAllPositions().then(function(data){
            $scope.positions = data.requested_positions;
        }).error(function(error){
            UIMfactory.addUserFailedMessage("Something went wrong, try again!");
            $location.path("/");
        });
    };

    $scope.SearchEvent = function(){
        apiEvent.showNearbyEvents($scope.position_id).then(function(nearEvents){
            $scope.events = nearEvents;
        }).error(function(error){
            UIMfactory.addUserFailedMessage("Something went wrong when fetching the events, try again!");
            $location.path("/");
        });
    };
};