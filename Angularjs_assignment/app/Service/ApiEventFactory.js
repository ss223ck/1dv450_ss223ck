angular.module("demoapp").factory('ApiEventFactory', ApiEventFactory);

function ApiEventFactory($resource) {
    var event_calls = {
        getAllEvents: function () {
            var resource = $resource("http://localhost:3000/api/v1/events/:id", {id: "@id"});
            return resource.get().$promise;
        },
        getSpecificEvent: function (id) {
            var resource = $resource("http://localhost:3000/api/v1/events/:id", {id: "@id"});
            return resource.get({id: id}).$promise;
        },
        searchSpecificEvent: function (searchTerm) {
            var resource = $resource("http://localhost:3000/api/v1/events/?search=:search", {search: "@search"});
            return resource.get({search: searchTerm}).$promise;
        },
        createEvent: function (eventObject) {
            var event = $resource("http://localhost:3000/api/v1/events/:id", {id: "@id"});
            return event.save({
                application_api_key: localStorage["api_key"],
                description: eventObject.description,
                position_id: eventObject.position_id
            }).$promise;
        },
        updateEvent: function (eventObject) {
            var positionObject = JSON.parse(eventObject.position);
            var Event = $resource("http://localhost:3000/api/v1/events/:eventId", {eventId: "@id"}, {
                get: {
                    method: "GET"
                },
                save: {
                    method: "PUT"
                }
            });
            return Event.save({eventId: eventObject.id}, {
                description: eventObject.description,
                position: {
                    location_name: positionObject.position_name,
                    longitude: positionObject.longitude,
                    latitude: positionObject.latitude
                },
                creator_id: eventObject.creator_id,
                application_api_key: localStorage["api_key"]
            }).$promise;
        }
    }
    return event_calls;
};