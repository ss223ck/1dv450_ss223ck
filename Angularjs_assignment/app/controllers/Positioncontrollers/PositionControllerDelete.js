angular.module("demoapp").controller("PositionControllerDelete", PositionControllerDelete);

PositionControllerDelete.$inject = ["$scope", "$location", "ApiPositionFactory", "UserInteractionMessagesFactory"];

function PositionControllerDelete($scope, $location, apiPosition, UIMfactory){

    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }
    var urlParameters = $location.search();
    apiPosition.deletePosition(urlParameters.id).then(function(response){
        UIMfactory.addUserSuccessMessage("You deleted the position");
        $location.path("/show_positions");
    },function(error){
        if(error.status == 401) {
            UIMfactory.addUserFailedMessage("Something went wrong when authorizing your account, try to refresh the page");
        }else{
            UIMfactory.addUserFailedMessage("Something went wrong when deleting the position");
        }
        $location.path("/");
    });
};