angular.module('demoapp').controller('PositionControllerUpdate', PositionControllerUpdate);

PositionControllerUpdate.$inject = ["$scope", "ApiFactory","$location", "UserInteractionMessagesFactory"];

function PositionControllerUpdate($scope, api, $location, UIMfactory){
    var controller = {};

    getSpecificPosition();

    function getSpecificPosition(){
        var urlParameters = $location.search();
        api.getSpecificPosition(urlParameters.id).then(function(data){
            $scope.position.location_name = data.location_name;
            $scope.position.longitude = data.longitude;
            $scope.position.latitude= data.latitude;
            $scope.position.id = urlParameters.id;
        });
    };
    $scope.UpdatePosition = function(){
        api.updatePosition($scope.position).then(function(results){
            UIMfactory.addUserSuccessMessage("Your updated a position");
            $location.path('/')
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};