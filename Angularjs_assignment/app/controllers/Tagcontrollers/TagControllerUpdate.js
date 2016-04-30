angular.module('demoapp').controller('TagControllerUpdate', TagControllerUpdate);

TagControllerUpdate.$inject = ["$scope", "ApiFactory","$location", "UserInteractionMessagesFactory"];

function TagControllerUpdate($scope, api, $location, UIMfactory){
    var controller = {};

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
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
};