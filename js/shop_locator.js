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
		['Divers Two', 40.1873456,-74.0239139],
		['Dive Seekers', 40.4793843,-74.655694],
		['Aqua Tech Scuba Center', 39.9424407,-74.9928718],
		['Atlantic Divers', 39.3993872,-74.5534876],
		['Atlantic Spear and Scuba', 40.1012683,-74.04447198],
		['Cedar Grove Divers Supply', 40.8501254,-74.23002318],
		['Dark Water Divers', 40.9065299,-74.26044345],
		['Dosil’s Scuba Center', 40.43562368,-74.11744952],
		['East Coast Diving Center', 40.3705452,-74.2773079],
		['Elite Divers', 40.8723792,-74.52904053],
		['Kunuku Dive and Travel', 40.668548,-75.158569]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Treasure Cove Divers</h3>' +
        '<p>407 South Avenue West<br>Westfield, NJ 07090<br>Phone: (908)654-8808<br>www.treasurecovedivers.com</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Ocean Explorers</h3>' +
        '<p>180 Lafayette Avenue<br>Edison, NJ 08837<br>Phone: (732)906-8400<br>www.njoceanexplorers.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Lakeland Divers</h3>' +
        '<p>34 Ridgedale Avenue<br>East Hanover, NJ 07936<br>Phone: (973)887-0194<br>www.lakelanddivers.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Bluewater Divers</h3>' +
        '<p>201 Route 17 South<br>Rochelle Park, NJ 07662<br>Phone: (201)843-3340<br>www.bluewaterdivers.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>An Underwater Connection</h3>' +
        '<p>15 Riccis Drive<br>Jackson, NJ 08527<br>Phone: (732)534-0633<br>www.uwcnj.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Divers Two</h3>' +
        '<p>1 Main Street<br>Avon-by-the-Sea, NJ 07717<br>Phone: (732)776-7755<br>www.diverstwo.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Dive Seekers</h3>' +
        '<p>856 Rt 206<br>Hillsborough, NJ 08844<br>Phone: (908)359-1250<br>www.diveseekers.com</a></p>' +
        '</div>'],	
		['<div class="info_content">' +
        '<h3>Aqua Tech Scuba Center</h3>' +
        '<p>479 Route 38 West<br>Maple Shade, NJ 08052<br>Phone: (609)535-1445<br>www.aquatechscuba.com</a></p>' +
        '</div>'],	
		['<div class="info_content">' +
        '<h3>Atlantic Divers</h3>' +
        '<p>2905 Fire Road<br>Egg Harbor Township, NJ 08234<br>Phone: (609)641-7722<br>www.njwreckdivers.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Atlantic Spear & Scuba</h3>' +
        '<p>212 Channel Drive<br>Point Pleasant Beach, NJ, 08742<br>Phone: (732)892-5971<br>www.atlanticspearandscuba.com</a></p>' +
        '</div>'],	
		['<div class="info_content">' +
        '<h3>Cedar Grove Divers Supply</h3>' +
        '<p>492 Pompton Ave (Route 23 South)<br>Cedar Grove, NJ 07009<br>Phone: (973)857-1748<br>www.cedargrovedivers.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Dark Water Divers Supply</h3>' +
        '<p>24 Burgess Place<br>Wayne, NJ 07470<br>Phone: (973)339-7771<br>www.darkwaterdivers.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Dosils Scuba Center</h3>' +
        '<p>261 Route 36 East<br>Middletown, NJ 07748<br>Phone: (732)787-0508<br>www.dosils.com</a></p>' +
        '</div>'],	
		['<div class="info_content">' +
        '<h3>East Coast Diving Center</h3>' +
        '<p>275 Spring Valley Road<br>Morganville, NJ 07751<br>Phone: (732)591-9374<br>www.eastcoastdivingcenter.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Elite Divers</h3>' +
        '<p>81 Rt.10 East<br>Randolph, N.J. 07869<br>Phone: (973)586-2214<br>www.elitedivers.com</a></p>' +
        '</div>'],
		['<div class="info_content">' +
        '<h3>Kunuku Dive and Travel</h3>' +
        '<p>327 Third Ave<br>Alpha, NJ 08865<br>www.kunuku.com</a></p>' +
        '</div>']				
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