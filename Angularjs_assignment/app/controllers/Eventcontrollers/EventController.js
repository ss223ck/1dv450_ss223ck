angular.module('demoapp').controller("EventController", EventController);
EventController.$inject = ["$scope", "ApiEventFactory", "ApiPositionFactory", "UserInteractionMessagesFactory"]

function EventController($scope, apiEvent, apiPosition, UIMfactory){
    var controller = {};

    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();

    getAllEvents();

    function getAllEvents() {
        apiEvent.getAllEvents().then(function(data){
            $scope.events = data.requested_events;
            data.requested_events.forEach(function(event){
                apiPosition.getSpecificPosition(event.position_id).then(function(position){
                    functionrenderEvents(event, position);
                });
            })
        });
    };
};