angular.module("demoapp").factory('ApiTagFactory', ApiTagFactory);

function ApiTagFactory($resource) {
    var event_calls = {
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
        }
    }
    return event_calls;
};