var map;
var infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 56.663593, lng: 16.355325},
        zoom: 8
    });

};
function functionrenderEvents (event){
    infowindow = new google.maps.InfoWindow({
        content: ""
    });
    infowindow2 = new google.maps.InfoWindow({
        content: ""
    });
    var marker = new google.maps.Marker({
        position: {lat: 56.663593 , lng: 16.355325},
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

    var marker2 = new google.maps.Marker({

        position: {lat: 56.670302 , lng: 16.351656},
        map: map,
        title: "marker2"
    });
    marker2.addListener('click', function() {
        infowindow2.close();
        infowindow2 = new google.maps.InfoWindow({
            content: "hejasdf"
        });
        infowindow2.content = "";
        infowindow2.open(map, marker);
    });
}
