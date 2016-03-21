jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
    var markers = [
        ['Treasure Cove Divers', 40.6483968,-74.3479749],
        ['Ocean Explorers', 40.5465566,-74.3302057],
		['Lakeland Divers', 40.8141351,-74.3901476],
		['Blue Water Divers', 40.9058215,-74.0720138],
		['An Underwater Connection', 40.10773975,-74.38482419],
		['Diver’s Two', 40.1873456,-74.0239139]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Treasure Cove Divers</h3>' +
        '<p>407 South Avenue West<br>Westfield, NJ 07090<br>Phone: (908)654-8808<br>www.treasurecovedivers.com</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Ocean Explorers</h3>' +
        '<p>180 Lafayette Avenue<br>Edison, NJ 08837<br>Phone: (732)906-8400<br>www.njoceanexplorers.com></a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Lakeland Divers</h3>' +
        '<p>34 Ridgedale Avenue<br>East Hanover, NJ 07936<br>Phone: (973)887-0194<br>www.lakelanddivers.com></a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Bluewater Divers</h3>' +
        '<p>201 Route 17 South<br>Rochelle Park, NJ 07662<br>Phone: (201)843-3340<br>www.bluewaterdivers.com></a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Divers Two</h3>' +
        '<p>1 Main Street<br>Avon-by-the-Sea, NJ 07717<br>Phone: (732)776-7755<br>www.diverstwo.com></a></p>' +
        '</div>'],
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
    
}