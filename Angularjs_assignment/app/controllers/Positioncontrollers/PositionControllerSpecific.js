angular.module('demoapp').controller('PositionControllerSpecific', PositionControllerSpecific);

PositionControllerSpecific.$inject = ["$scope", "ApiPositionFactory", "$location"];

function PositionControllerSpecific($scope, api, $location){
    var controller = {};

    getSpecificPositions();

    function getSpecificPositions(){
        var urlParameters = $location.search();
        api.getSpecificPosition(urlParameters.id).then(function(data){
            $scope.location_name = data.location_name;
            $scope.longitude = data.longitude;
            $scope.latitude= data.latitude;
            $scope.id = urlParameters.id;
        });
    };
};
