angular.module("demoapp").factory('ApiAuthenticateFactory', ApiAuthenticateFactory);

function ApiAuthenticateFactory($resource) {
    var event_calls = {
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
};