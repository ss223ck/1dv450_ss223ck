angular.module("demoapp").factory('ApiEventFactory', ApiEventFactory);

function ApiEventFactory($resource, $location) {
    var path = "http://" + $location.host();
    var event_calls = {
        getAllEvents: function () {
            var resource = $resource(path + ":3000/api/v1/events/:id", {id: "@id"});
            return resource.get().$promise;
        },
        getSpecificEvent: function (id) {
            var resource = $resource(path + ":3000/api/v1/events/:id", {id: "@id"});
            return resource.get({id: id}).$promise;
        },
        searchSpecificEvent: function (searchTerm) {
            var resource = $resource(path + ":3000/api/v1/events/?search=:search", {search: "@search"});
            return resource.get({search: searchTerm}).$promise;
        },
        showNearbyEvents: function(locationName){
            var resource = $resource(path + ":3000/api/v1/events/nearby/?location_name=:location", {location: "@location"});
            return resource.get({location: locationName}).$promise;
        },
        createEvent: function (eventObject) {
            var event = $resource(path + ":3000/api/v1/events/:id", {id: "@id"});
            return event.save({
                application_api_key: localStorage["api_key"],
                description: eventObject.description,
                position_id: eventObject.position_id,
                tags:[
                    {
                        name:eventObject.tag_name
                    }
                ]
            }).$promise;
        },
        updateEvent: function (eventObject) {
            var positionObject = JSON.parse(eventObject.position);
            var Event = $resource(path + ":3000/api/v1/events/:eventId", {eventId: "@id"}, {
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
                application_api_key: localStorage["api_key"],
                tags:[
                    {
                        name:eventObject.tag_name
                    }
                ]
            }).$promise;
        },
        deleteEvent: function (id) {
            var Event = $resource(path + ":3000/api/v1/events/:eventId", {eventId: "@id"});
            return Event.delete({eventId: id,
                application_api_key: localStorage["api_key"]
            }).$promise;
        }
    };
    return event_calls;
};