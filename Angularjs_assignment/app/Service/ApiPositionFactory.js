angular.module("demoapp").factory('ApiPositionFactory', ApiPositionFactory);

function ApiPositionFactory($resource) {
    var event_calls = {
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
        }
    }
    return event_calls;
};