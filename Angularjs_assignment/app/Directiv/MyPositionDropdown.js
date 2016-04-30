angular.module('demoapp').directive("myPositionDropdown", myPositionDropdown);

function myPositionDropdown(){
    return {
        template: '<div>' +
        '<select id="position" data-ng-model="event.position_id">' +
        '<option data-ng-repeat="position in positions" value="{{position.id}}">' +
        '{{position.location_name}}' +
        '</option>'+
        '</select>' +
        '</div>'
    };
};
