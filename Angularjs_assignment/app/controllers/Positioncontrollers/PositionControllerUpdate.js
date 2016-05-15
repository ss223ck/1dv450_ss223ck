angular.module('demoapp').controller('PositionControllerUpdate', PositionControllerUpdate);

PositionControllerUpdate.$inject = ["$scope", "ApiPositionFactory","$location", "UserInteractionMessagesFactory"];

function PositionControllerUpdate($scope, api, $location, UIMfactory){
    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }
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
        },function(error){
            if(error.status == 401) {
                UIMfactory.addUserFailedMessage("Something went wrong when authorizing your account, try to refresh the page");
            }else{
                UIMfactory.addUserFailedMessage("Something went wrong when updating the position");
            }
            $location.path("/");
        });
    };
};