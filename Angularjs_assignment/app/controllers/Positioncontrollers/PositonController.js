angular.module('demoapp').controller('PositionController', PositionController);

PositionController.$inject = ["$scope", "ApiFactory"];

function PositionController($scope, api){
    var controller = {};

    getAllPositions();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };
};