angular.module('demoapp').controller('EventControllerCreate', EventControllerCreate);
EventControllerCreate.$inject = ["$scope", "ApiFactory", "$location", "UserInteractionMessagesFactory"];

function EventControllerCreate($scope, api, $location, UIMfactory){
    var controller = {};

    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }

    getAllPositions();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };

    $scope.CreateEvent = function(){
        api.createEvent($scope.event).then(function(results){
            UIMfactory.addUserSuccessMessage("Your created a event")
            $location.path('/');
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};
