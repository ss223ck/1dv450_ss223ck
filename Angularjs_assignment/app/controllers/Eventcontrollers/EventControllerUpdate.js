angular.module('demoapp').controller('EventControllerUpdate', EventControllerUpdate);

EventControllerUpdate.$inject = ["$scope", "ApiEventFactory", "ApiPositionFactory", "$location", "UserInteractionMessagesFactory"]

function EventControllerUpdate($scope, apiEvent, apiPosition, $location, UIMfactory){

    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }

    getAllPositions();
    getSpecificEvent();

    function getAllPositions() {
        apiPosition.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };
    function getSpecificEvent(){
        var urlParameters = $location.search();
        apiEvent.getSpecificEvent(urlParameters.id).then(function(data){
            $scope.event.description = data.description;
            $scope.event.creator_id = data.creator_id;
            $scope.event.id = urlParameters.id;
        });
    };
    $scope.UpdateEvent = function(){
        apiEvent.updateEvent($scope.event).then(function(results){
            UIMfactory.addUserSuccessMessage("Your updated a event")
            $location.path('/');
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};