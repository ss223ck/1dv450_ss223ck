angular.module("demoapp").controller("PositionControllerDelete", PositionControllerDelete);

PositionControllerDelete.$inject = ["$scope", "$location", "ApiPositionFactory", "UserInteractionMessagesFactory"];

function PositionControllerDelete($scope, $location, apiPosition, UIMfactory){

    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }
    var urlParameters = $location.search();
    apiPosition.deletePosition(urlParameters.id).then(function(response){
        UIMfactory.successMessage("You deleted the position");
        location.path("/");
    }).error(function(error){
        UIMfactory.errorMessage("You didn't delete the position");
        location.path("/");
    });
};