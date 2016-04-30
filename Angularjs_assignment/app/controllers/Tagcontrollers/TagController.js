angular.module('demoapp').controller('TagController', TagController);

TagController.$inject = ["$scope", "ApiTagFactory"];

function TagController($scope, api){
    var controller = {};

    getAllTags();

    function getAllTags() {
        api.getAllTags().then(function(data){
            $scope.tags = data.requested_tags;
        });
    };
};