angular.module('demoapp').controller('PositionControllerCreate', PositionControllerCreate);

PositionControllerCreate.$inject = ["$scope", "ApiPositionFactory", "$location", "UserInteractionMessagesFactory"]

function PositionControllerCreate($scope, api, $location, UIMfactory){
    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();
    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }

    $scope.CreatePosition = function(){
        api.createPosition($scope.position).then(function(results){
            UIMfactory.addUserSuccessMessage("Your created a position")
            $location.path("/show_positions");
        },function(error){
            if(error.status == 401) {
                UIMfactory.addUserFailedMessage("Something went wrong when authorizing your account, try to refresh the page");
            }else{
                UIMfactory.addUserFailedMessage("Something went wrong when creating the position");
            }
            $location.path("/");
        });
    };
};