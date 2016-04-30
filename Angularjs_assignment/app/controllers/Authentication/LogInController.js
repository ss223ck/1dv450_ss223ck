angular.module("demoapp").controller('LogInController', LogInController);

LogInController.$inject = ["$scope", "ApiAuthenticateFactory", "$location", "UserInteractionMessagesFactory"]

function LogInController($scope, api, $location, UIMfactory){
    var controller = {};

    $scope.LogIn = function(){
        api.authenticateCreator($scope.application_name, $scope.password).then(function(response){
            if(response.error)
            {
                var errorTag = document.getElementById("error_message");
                errorTag.innerHTML = response.error;
            }
            else
            {
                localStorage["api_key"] = response.application_api;
                UIMfactory.addUserSuccessMessage("Du är inloggad");
                $location.path("/");
            }

        }).error(function(error){

        });
    };
};
