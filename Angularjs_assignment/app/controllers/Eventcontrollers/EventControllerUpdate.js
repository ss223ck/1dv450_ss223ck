angular.module('demoapp').controller('EventControllerUpdate', EventControllerUpdate);

EventControllerUpdate.$inject = ["$scope", "ApiFactory","$location"]

function EventControllerUpdate($scope, api, $location){
    var controller = {};


    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }

    getAllPositions();
    getSpecificEvent();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };
    function getSpecificEvent(){
        var urlParameters = $location.search();
        api.getSpecificEvent(urlParameters.id).then(function(data){
            $scope.event.description = data.description;
            $scope.event.creator_id = data.creator_id;
            $scope.event.id = urlParameters.id;
        });
    };
    $scope.UpdateEvent = function(){
        api.updateEvent($scope.event).then(function(results){
            UIMfactory.addUserSuccessMessage("Your updated a event")
            $location.path('/');
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};