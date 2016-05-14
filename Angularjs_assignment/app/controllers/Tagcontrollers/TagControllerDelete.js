angular.module("demoapp").controller("TagControllerDelete", TagControllerDelete);

TagControllerDelete.$inject = ["$scope", "$location", "ApiTagFactory", "UserInteractionMessagesFactory"];

function TagControllerDelete($scope, $location, apiTag, UIMfactory){

    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }
    var urlParameters = $location.search();
    apiTag.deleteTag(urlParameters.id).then(function(response){
        UIMfactory.addUserSuccessMessage("You deleted the tag");
        $location.path("/show_tags");
    }).error(function(error){
        UIMfactory.addUserFailedMessage("You didn't delete the tag");
        $location.path("/");
    });
};