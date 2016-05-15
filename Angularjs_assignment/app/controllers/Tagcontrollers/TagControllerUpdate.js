angular.module('demoapp').controller('TagControllerUpdate', TagControllerUpdate);

TagControllerUpdate.$inject = ["$scope", "ApiTagFactory","$location", "UserInteractionMessagesFactory"];

function TagControllerUpdate($scope, api, $location, UIMfactory){
    if(localStorage["api_key"] === "") {
        $location.path("log_in");
    }

    getSpecificTag();

    function getSpecificTag(){
        var urlParameters = $location.search();
        api.getSpecificTags(urlParameters.id).then(function(data){
            $scope.tag.name = data.name;
            $scope.tag.id = urlParameters.id;
        });
    };
    $scope.UpdateTag = function(){
        api.updateTags($scope.tag).then(function(results){
            UIMfactory.addUserSuccessMessage("You updated a tag");
            $location.path('/')
        },function(error){
            if(error.status == 401) {
                UIMfactory.addUserFailedMessage("Something went wrong when authorizing your account, try to refresh the page");
            }else{
                UIMfactory.addUserFailedMessage("Something went wrong when updating the tag");
            }
            $location.path("/");
        });
    };
};