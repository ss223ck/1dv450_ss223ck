angular.module('demoapp').controller('TagControllerConnectedEvents', TagControllerConnectedEvents);

TagControllerConnectedEvents.$inject = ["$scope", "ApiTagFactory","$location"];

function TagControllerConnectedEvents($scope, api, $location){
    var controller = {};


    getSpecificTag();
    getSpecificTagEvents();
    function getSpecificTag(){
        var urlParameters = $location.search();
        api.getSpecificTags(urlParameters.id).then(function(data){
            $scope.name = data.name;
            $scope.id = urlParameters.id;
        });
    };
    function getSpecificTagEvents(){
        var urlParameters = $location.search();
        api.showTagEvents(urlParameters.id).then(function(data){
            $scope.events = data.requested_events;

        });
    };
};