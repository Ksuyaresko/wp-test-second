function myMap() {

    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(50.027572, 36.223641),
        zoom: 16,
        panControl: false,
        //streetViewControl: false,
        //mapTypeControl: false,

    }

    var map = new google.maps.Map(mapCanvas, mapOptions);
    /*var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.027572, 36.223641),
        map: map,
    });
*/




};

google.maps.event.addDomListener(window, 'load', myMap);



