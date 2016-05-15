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
    },function(error){
        if(error.status == 401) {
            UIMfactory.addUserFailedMessage("Something went wrong when authorizing your account, try to refresh the page");
        }else{
            UIMfactory.addUserFailedMessage("Something went wrong when deleting the tag");
        }
        $location.path("/");
    });
};