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
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};