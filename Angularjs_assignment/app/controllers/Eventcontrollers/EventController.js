angular.module('demoapp').controller("EventController", EventController);
EventController.$inject = ["$scope", "ApiEventFactory", "UserInteractionMessagesFactory"]

function EventController($scope, api, UIMfactory){
    var controller = {};

    UIMfactory.printUserSuccessMessages();
    UIMfactory.printUserFailedMessage();

    getAllEvents();

    function getAllEvents() {
        api.getAllEvents().then(function(data){
            $scope.events = data.requested_events;
            data.requested_events.forEach(function(event){
                api.getSpecificPosition(event.position_id).then(function(position){
                    functionrenderEvents(event, position);
                });
            })
        });
    };
};