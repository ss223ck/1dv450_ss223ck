angular.module('demoapp').controller('EventControllerSpecific', EventControllerSpecific);

EventControllerSpecific.$inject = ["$scope", "ApiEventFactory", "$location", "ApiPositionFactory"];

function EventControllerSpecific($scope, api, $location, apiPosition){
    var controller = {};

    getSpecificEvent();

    function getSpecificEvent(){
        var urlParameters = $location.search();
        api.getSpecificEvent(urlParameters.id).then(function(data){
            $scope.description = data.description;
            $scope.creator_id = data.creator_id;
            $scope.id = urlParameters.id;
            apiPosition.getSpecificPosition(data.position_id).then(function(positionResponse){
                $scope.location_name = positionResponse.location_name;
                $scope.latitude = positionResponse.latitude;
                $scope.longitude = positionResponse.longitude;
            });
        });
    };
};