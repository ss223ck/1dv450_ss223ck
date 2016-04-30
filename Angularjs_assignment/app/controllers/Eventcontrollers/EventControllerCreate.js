angular.module('demoapp').controller('EventControllerCreate', EventControllerCreate);
EventControllerCreate.$inject = ["$scope", "ApiEventFactory", "ApiPositionFactory", "$location", "UserInteractionMessagesFactory"];

function EventControllerCreate($scope, apiEvent, apiPosition, $location, UIMfactory){
    var controller = {};

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
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};
