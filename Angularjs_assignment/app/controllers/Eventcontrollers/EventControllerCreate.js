angular.module('demoapp').controller('EventControllerCreate', EventControllerCreate);
EventControllerCreate.$inject = ["$scope", "ApiEventFactory", "ApiPositionFactory", "ApiTagFactory", "$location", "UserInteractionMessagesFactory"];

function EventControllerCreate($scope, apiEvent, apiPosition, apiTag, $location, UIMfactory){
    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();
    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }

    getAllPositions();
    getAllTags();
    function getAllPositions() {
        apiPosition.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };

    function getAllTags() {
        apiTag.getAllTags().then(function(data){
            $scope.tags = data.requested_tags;
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
