angular.module('demoapp').controller('PositionControllerCreate', PositionControllerCreate);

PositionControllerCreate.$inject = ["$scope", "ApiFactory", "$location", "UserInteractionMessagesFactory"]

function PositionControllerCreate($scope, api, $location, UIMfactory){
    var controller = {};

    $scope.CreatePosition = function(){
        api.createPosition($scope.position).then(function(results){
            UIMfactory.addUserSuccessMessage("Your created a position")
            $location.path("/");
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};