angular.module('demoapp').controller('TagControllerCreate', TagControllerCreate);

TagControllerCreate.$inject = ["$scope", "ApiTagFactory", "$location", "UserInteractionMessagesFactory"];

function TagControllerCreate($scope, api, $location, UIMfactory){
    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();
    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }

    $scope.CreateTag = function(){
        api.createTags($scope.tag).then(function(results){
            UIMfactory.addUserSuccessMessage("You created a tag");
            $location.path("/show_tags");
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};