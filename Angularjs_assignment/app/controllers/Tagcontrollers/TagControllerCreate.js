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
        },function(error){
            if(error.status == 401) {
                UIMfactory.addUserFailedMessage("Something went wrong when authorizing your account, try to refresh the page");
            }else{
                UIMfactory.addUserFailedMessage("Something went wrong when creating the tag");
            }
            $location.path("/");
        });
    };
};