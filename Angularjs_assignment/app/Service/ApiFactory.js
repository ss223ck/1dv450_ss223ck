angular.module("demoapp").factory('ApiFactory', ApiFactory);

function ApiFactory($resource){
    var event_calls = {
        getAllEvents: function(){
            var resource = $resource("http://localhost:3000/api/v1/events/:id", { id:"@id"});
            return resource.get().$promise;
        },
        getSpecificEvent: function(id){
            var resource = $resource("http://localhost:3000/api/v1/events/:id", { id:"@id"});
            return resource.get({id: id}).$promise;
        },
        searchSpecificEvent: function(searchTerm){
            var resource = $resource("http://localhost:3000/api/v1/events/?search=:search", { search:"@search"});
            return resource.get({search: searchTerm}).$promise;
        },
        createEvent: function(eventObject){
            var event = $resource("http://localhost:3000/api/v1/events/:id", { id:"@id"});
            return event.save({
                application_api_key: localStorage["api_key"],
                description: eventObject.description,
                position_id: eventObject.position_id
            }).$promise;
        },
        updateEvent: function(eventObject){
            var Event = $resource("http://localhost:3000/api/v1/events/:eventId", { eventId:"@id"}, {
                get: {
                    method: "GET"
                },
                save: {
                    method: "PUT"
                }
            });
            Event.get({eventId:eventObject.id}, function(event){
                event.description = eventObject.description;
                event.position_id = eventObject.position_id;
                event.creator_id = eventObject.creator_id;
                event.application_api_key = localStorage["api_key"];
                event.$save();
            });
        },
        getAllPositions: function(){
            var resource = $resource("http://localhost:3000/api/v1/positions/:id", { id:"@id"});
            return resource.get().$promise;
        },
        getSpecificPosition: function(id){
            var resource = $resource("http://localhost:3000/api/v1/positions/:id", { id:"@id"});
            return resource.get({id: id}).$promise;
        },
        createPosition: function(position){
            var resource = $resource("http://localhost:3000/api/v1/positions/:id", { id:"@id"});

            return resource.save({
                location_name: position.location_name,
                longitude: position.longitude,
                latitude: position.latitude
            }).$promise;
        },
        updatePosition: function(positionObject){
            var Position = $resource("http://localhost:3000/api/v1/positions/:positionId", { positionId:"@id"}, {
                get: {
                    method: "GET"
                },
                save: {
                    method: "PUT"
                }
            });
            Position.get({positionId:positionObject.id}, function(position){
                position.location_name = positionObject.location_name;
                position.longitude = positionObject.longitude;
                position.latitude = positionObject.latitude;
                position.$save();
            });
        },
        getAllTags: function(){
            var resource = $resource("http://localhost:3000/api/v1/tags/:id", { id:"@id"});
            return resource.get().$promise;
        },
        getSpecificTags: function(id){
            var resource = $resource("http://localhost:3000/api/v1/tags/:id", { id:"@id"});
            return resource.get({id: id}).$promise;
        },
        createTags: function(tag){
            var resource = $resource("http://localhost:3000/api/v1/tags/:id", { id:"@id"});

            return resource.save({
                name: tag.name
            }).$promise;
        },
        updateTags: function(tagObject){
            var Tag = $resource("http://localhost:3000/api/v1/tags/:eventId", { tagId:"@id"}, {
                get: {
                    method: "GET"
                },
                save: {
                    method: "PUT"
                }
            });
            Tag.get({tagId:tagObject.id}, function(tag){
                tag.name = tagObject.name;
                tag.$save({});
            });
        },
        showTagEvents: function(tagObjectId){
            var Tag = $resource("http://localhost:3000/api/v1/tags/specific/?id=:tagId", { tagId:"@id"});

            return Tag.get({tagId:tagObjectId}).$promise;
        },
        authenticateCreator: function(applicationName, creatorPassword){
            var Creator = $resource("http://localhost:3000/api/v1/events/autenticate_creator", null, {
                post: {
                    method:"POST"
                }
            });

            return Creator.post({password: creatorPassword, applikation_name: applicationName}).$promise;
        }
    }
    return event_calls;
}