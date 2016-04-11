var map;
var infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 56.663593, lng: 16.355325},
        zoom: 8
    });

};
function functionrenderEvents (event, position){
    infowindow = new google.maps.InfoWindow({
        content: ""
    });
    var marker = new google.maps.Marker({
        position: {lat: position.longitude , lng: position.latitude },
        map: map,
        title: "marker"
    });
    marker.addListener('click', function() {
        infowindow.close();
        infowindow = new google.maps.InfoWindow({
            content: event.description
        });
        infowindow.content = "";
        infowindow.open(map, marker);
    });
}
