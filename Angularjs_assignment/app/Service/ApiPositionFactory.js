angular.module("demoapp").factory('ApiPositionFactory', ApiPositionFactory);

function ApiPositionFactory($resource, $location) {
    var path = "http://" + $location.host();
    var event_calls = {
        getAllPositions: function(){
            var resource = $resource(path + ":3000/api/v1/positions/:id", { id:"@id"});
            return resource.get().$promise;
        },
        getSpecificPosition: function(id){
            var resource = $resource(path + ":3000/api/v1/positions/:id", { id:"@id"});
            return resource.get({id: id}).$promise;
        },
        createPosition: function(position){
            var resource = $resource(path + ":3000/api/v1/positions/:id", { id:"@id"});

            return resource.save({
                location_name: position.location_name,
                longitude: position.longitude,
                latitude: position.latitude
            }).$promise;
        },
        updatePosition: function(positionObject){
            var Position = $resource(path + ":3000/api/v1/positions/:positionId", { positionId:"@id"}, {
                get: {
                    method: "GET"
                },
                save: {
                    method: "PUT"
                }
            });
            return Position.save({positionId: positionObject.id}, {
                location_name: positionObject.location_name,
                longitude: positionObject.longitude,
                latitude: positionObject.latitude
            }).$promise;
        },
        deletePosition: function (id) {
            var Position = $resource(path + ":3000/api/v1/positions/:positionId", {positionId: "@id"});
            return Position.delete({positionId: id}).$promise;
        }
    };
    return event_calls;
};