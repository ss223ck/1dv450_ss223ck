angular.module("demoapp").controller('LogOutController', LogOutController);

LogOutController.$inject = ["$scope", "ApiFactory","$location", "UserInteractionMessagesFactory"];

function LogOutController($scope, api, $location, UIMfactory){
    localStorage["api_key"] = "";
    UIMfactory.successMessage = "Du loggade ut";
    $location.path("/");
};