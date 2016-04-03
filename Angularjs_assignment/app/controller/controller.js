var demoApp = angular.module('demoApp', ["ngResource", "ngRoute"])
    .config(function($httpProvider, $routeProvider){
        $httpProvider.defaults.headers.common['Authorization'] = 'Token token=ac5c4bd558f2bf11ee974bbd12127026'
        $routeProvider
            .when('/',
                {
                    controller: 'EventControllerCreate',
                    templateUrl: 'app/views/create_event.html'
                })
            //Define a route that has a route parameter in it (:customerID)
            .when('/partial2',
                {
                    controller: 'RoutingController',
                    templateUrl: ''
                })
            .otherwise({ redirectTo: '/partial1' });
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
        createEvent: function(event){
            var resource = $resource("http://localhost:3000/api/v1/events/:id", { id:"@id"});
            resource.description = event.description;
            resource.position_id = event.position_id;
            return resource.$save().$promise;
        },
        getAllPositions: function(){
            var resource = $resource("http://localhost:3000/api/v1/positions/:id", { id:"@id"});
            return resource.get().$promise;
        },
        getSpecificPosition: function(id){
            var resource = $resource("http://localhost:3000/api/v1/positions/:id", { id:"@id"});
            return resource.get({id: id}).$promise;
        },
        createPosition: function(event){
            var resource = $resource("http://localhost:3000/api/v1/positions/:id", { id:"@id"});
            resource.description = event.description;
            resource.position_id = event.position_id;
            return resource.$save().$promise;
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

    controller.CreateEvent = function(){
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

demoApp.controller('EventControllerCreate', ["$scope", "ApiFactory", function($scope, api){
    var controller = {};

    getAllPositions();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };

    controller.CreateEvent = function(){
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


demoApp.controller('PositionController', ["$scope", "ApiFactory", function($scope, api){
    var controller = {};

    getAllPositions();

    function getAllPositions() {
        api.getAllPositions().then(function(data){
            $scope.positions = data.requested_position;
        });
    };

    controller.CreatePosition = function(){
        api.createEvent($scope.position).then(function(results){
            $scope.event = results;
            var successTag = document.getElementById("success_message");
            successTag.innerHTML = "Your created a position";
        }).error(function(error){
            var errorTag = document.getElementById("error_message");
            errorTag.innerHTML = error.error;
        });
    };
}]);

