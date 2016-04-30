angular.module('demoapp').controller('TagControllerSpecific', TagControllerSpecific);

TagControllerSpecific.$inject = ["$scope", "ApiFactory", "$location"];

function TagControllerSpecific($scope, api, $location){
    var controller = {};

    getSpecificTags();

    function getSpecificTags(){
        var urlParameters = $location.search();
        api.getSpecificTags(urlParameters.id).then(function(data){
            $scope.name = data.name;
            $scope.id = urlParameters.id;
        });
    };
};