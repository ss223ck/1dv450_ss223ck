angular.module('demoapp').controller('PositionController', PositionController);

PositionController.$inject = ["$scope", "ApiPositionFactory", "UserInteractionMessagesFactory"];

function PositionController($scope, api, UIMfactory){
    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();
    getAllPositions();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };
};