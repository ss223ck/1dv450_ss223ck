angular.module('demoapp').controller('EventControllerSpecific', EventControllerSpecific);

EventControllerSpecific.$inject = ["$scope", "ApiEventFactory", "$location"];

function EventControllerSpecific($scope, api, $location){
    var controller = {};

    getSpecificEvent();

    function getSpecificEvent(){
        var urlParameters = $location.search();
        api.getSpecificEvent(urlParameters.id).then(function(data){
            $scope.description = data.description;
            $scope.creator_id = data.creator_id;
            $scope.id = urlParameters.id;
        });
    };
};