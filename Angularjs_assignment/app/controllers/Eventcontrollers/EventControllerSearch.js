angular.module('demoapp').controller('EventControllerSearch', EventControllerSearch);

EventControllerSearch.$inject = ["$scope", "ApiEventFactory", "$location"];

function EventControllerSearch($scope, api, $location){
    var controller = {};

    $scope.searchSpecificEvent = function (){
        api.searchSpecificEvent($scope.searchTerm).then(function(data){
            $scope.events = data.requested_events;
        }).error(function(error){
            var i = 0;
        });
    };
};