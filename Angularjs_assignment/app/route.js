var demoapp = angular.module('demoapp', ["ngResource", "ngRoute"])
    .config(function($httpProvider, $routeProvider){
        $httpProvider.defaults.headers.common['Authorization'] = 'Token token=' + localStorage["api_key"];
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
            .when('/search_for_events',
                {
                    controller: 'EventControllerSearch',
                    templateUrl: 'app/views/search_for_events.html'
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
                templateUrl: 'app/views/show_specific_position.html'
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
            .when('/show_tag_events', {
                controller: 'TagControllerConnectedEvents',
                templateUrl: 'app/views/show_tag_events.html'
            })
            .when('/log_in', {
                controller: 'LogInController',
                templateUrl: 'app/views/log_in.html'
            })
            .when('/log_out', {
                controller: 'LogOutController',
                templateUrl: 'app/views/log_out.html'
            })
            .otherwise({ redirectTo: '/' });
    });