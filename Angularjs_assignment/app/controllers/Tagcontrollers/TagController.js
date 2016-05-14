angular.module('demoapp').controller('TagController', TagController);

TagController.$inject = ["$scope", "ApiTagFactory", "UserInteractionMessagesFactory"];

function TagController($scope, api, UIMfactory){
    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();

    getAllTags();

    function getAllTags() {
        api.getAllTags().then(function(data){
            $scope.tags = data.requested_tags;
        });
    };
};