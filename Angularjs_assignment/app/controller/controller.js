var demoApp = angular.module('demoApp', ["ngResource", "ngRoute"])
    .config(function($httpProvider, $routeProvider){
        $httpProvider.defaults.headers.common['Authorization'] = 'Token token=ac5c4bd558f2bf11ee974bbd12127026'
        $routeProvider
            .when('/',
                {
                    controller: 'EventController',
                    templateUrl: 'app/views/show_events.html'
                })
            .when('/show_specific_event',
                {
                    controller: 'EventControllerSpecific',
                    templateUrl: 'app/views/show_specific_event.html'
                })
            .when('/update_event',
                {
                    controller: 'EventControllerUpdate',
                    templateUrl: 'app/views/update_event.html'
                })

            .when('/create_event',
                {
                    controller: 'EventControllerCreate',
                    templateUrl: 'app/views/create_event.html'
                })
            .when('/show_positions', {
                controller: 'PositionController',
                templateUrl: 'app/views/show_positions.html'
            })
            .when('/show_specific_position', {
                controller: 'PositionControllerSpecific',
                templateUrl: 'app/views/show_specific_positions.html'
            })
            .when('/create_position', {
                controller: 'PositionControllerCreate',
                templateUrl: 'app/views/create_position.html'
            })
            .when('/update_position', {
                controller: 'PositionControllerUpdate',
                templateUrl: 'app/views/update_position.html'
            })
            .when('/show_tags', {
                controller: 'TagController',
                templateUrl: 'app/views/show_tags.html'
            })
            .when('/show_specific_tag', {
                controller: 'TagControllerSpecific',
                templateUrl: 'app/views/show_specific_tag.html'
            })
            .when('/create_tag', {
                controller: 'TagControllerCreate',
                templateUrl: 'app/views/create_tag.html'
            })
            .when('/update_tag', {
                controller: 'TagControllerUpdate',
                templateUrl: 'app/views/update_tag.html'
            })
            .otherwise({ redirectTo: '/' });
    });

demoApp.factory('ApiFactory', ["$resource", function($resource){
    var event_calls = {
        getAllEvents: function(){
            var resource = $resource("http://localhost:3000/api/v1/events/:id", { id:"@id"});
            return resource.get().$promise;
        },
        getSpecificEvent: function(id){
            var resource = $resource("http://localhost:3000/api/v1/events/:id", { id:"@id"});
            return resource.get({id: id}).$promise;
        },
        createEvent: function(eventObject){
            var event = $resource("http://localhost:3000/api/v1/events/:id", { id:"@id"});
            return event.save({
                application_api_key: "ad0cc58e346ee42367c904f01c1f219f",
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
                event.application_api_key = "ad0cc58e346ee42367c904f01c1f219f";
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
                tag.$save();
            });
        }
    }
    return event_calls;
}]);

demoApp.controller('EventController', ["$scope", "ApiFactory", function($scope, api){
    var controller = {};

    getAllEvents();

    function getAllEvents() {
        api.getAllEvents().then(function(data){
            $scope.events = data.requested_events;
        });
    };

}]);

demoApp.controller('EventControllerCreate', ["$scope", "ApiFactory", function($scope, api){
    var controller = {};

    getAllPositions();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };

    $scope.CreateEvent = function(){
        api.createEvent($scope.event).then(function(results){
            $scope.event = results;
            var successTag = document.getElementById("success_message");
            successTag.innerHTML = "Your created a event";
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
}]);

demoApp.controller('EventControllerUpdate', ["$scope", "ApiFactory","$location" , function($scope, api, $location){
    var controller = {};

    getAllPositions();
    getSpecificEvent();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };
    function getSpecificEvent(){
        var urlParameters = $location.search();
        api.getSpecificEvent(urlParameters.id).then(function(data){
            $scope.event.description = data.description;
            $scope.event.creator_id = data.creator_id;
            $scope.event.id = urlParameters.id;
        });
    };
    $scope.UpdateEvent = function(){
        api.updateEvent($scope.event).then(function(results){
            $scope.event = results;
            var successTag = document.getElementById("success_message");
            successTag.innerHTML = "Your updated a event";
            $location.path('/')
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
}]);

demoApp.controller('EventControllerSpecific', ["$scope", "ApiFactory", "$location", function($scope, api, $location){
    var controller = {};

    getSpecificEvent();

    function getSpecificEvent(){
        var urlParameters = $location.search();
        api.getSpecificEvent(urlParameters.id).then(function(data){
            $scope.description = data.description;
            $scope.creator_id = data.creator_id;
            $scope.id = urlParameters.id;
        });
    };

}]);

demoApp.controller('PositionController', ["$scope", "ApiFactory", function($scope, api){
    var controller = {};

    getAllPositions();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };
}]);

demoApp.controller('PositionControllerSpecific', ["$scope", "ApiFactory", "$location", function($scope, api, $location){
    var controller = {};

    getSpecificPositions();

    function getSpecificPositions(){
        var urlParameters = $location.search();
        api.getSpecificPosition(urlParameters.id).then(function(data){
            $scope.location_name = data.location_name;
            $scope.longitude = data.longitude;
            $scope.latitude= data.latitude;
            $scope.id = urlParameters.id;
        });
    };

}]);

demoApp.controller('PositionControllerCreate', ["$scope", "ApiFactory", function($scope, api){
    var controller = {};


    $scope.CreatePosition = function(){
        api.createPosition($scope.position).then(function(results){
            $scope.position = results;
            var successTag = document.getElementById("success_message");
            successTag.innerHTML = "Your created a position";
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
}]);

demoApp.controller('PositionControllerUpdate', ["$scope", "ApiFactory","$location" , function($scope, api, $location){
    var controller = {};

    getSpecificPosition();

    function getSpecificPosition(){
        var urlParameters = $location.search();
        api.getSpecificLocation(urlParameters.id).then(function(data){
            $scope.location_name = data.location_name;
            $scope.longitude = data.longitude;
            $scope.latitude= data.latitude;
            $scope.id = urlParameters.id;
        });
    };
    $scope.UpdatePosition = function(){
        api.updatePosition($scope.position).then(function(results){
            $scope.position = results;
            var successTag = document.getElementById("success_message");
            successTag.innerHTML = "Your updated a position";
            $location.path('/')
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
}]);

demoApp.controller('TagController', ["$scope", "ApiFactory", function($scope, api){
    var controller = {};

    getAllTags();

    function getAllTags() {
        api.getAllTags().then(function(data){
            $scope.tags = data.requested_tags;
        });
    };
}]);

demoApp.controller('TagControllerSpecific', ["$scope", "ApiFactory", "$location", function($scope, api, $location){
    var controller = {};

    getSpecificTags();

    function getSpecificTags(){
        var urlParameters = $location.search();
        api.getSpecificTags(urlParameters.id).then(function(data){
            $scope.name = data.name;
            $scope.id = urlParameters.id;
        });
    };

}]);

demoApp.controller('TagControllerCreate', ["$scope", "ApiFactory", function($scope, api){
    var controller = {};


    $scope.CreateTag = function(){
        api.createTags($scope.tag).then(function(results){
            $scope.tag = results;
            var successTag = document.getElementById("success_message");
            successTag.innerHTML = "Your created a tag";
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
}]);

demoApp.controller('TagControllerUpdate', ["$scope", "ApiFactory","$location" , function($scope, api, $location){
    var controller = {};

    getSpecificTag();

    function getSpecificTag(){
        var urlParameters = $location.search();
        api.getSpecificTags(urlParameters.id).then(function(data){
            $scope.name = data.name;
            $scope.id = urlParameters.id;
        });
    };
    $scope.UpdateTag = function(){
        api.updateTags($scope.tag).then(function(results){
            $scope.tag = results;
            var successTag = document.getElementById("success_message");
            successTag.innerHTML = "Your updated a position";
            $location.path('/')
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
}]);