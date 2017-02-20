var map;
var infowindow;
markers = []
var gen_click = false;

function initialize() {
  var mapOptions = {
    zoom: 13,
    streetViewControl: false,
    center: new google.maps.LatLng(13.756, 100.5018),
    styles: [{
      "featureType": "all",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "all",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }, {
        "saturation": "-100"
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{
        "saturation": 36
      }, {
        "color": "#ffffff"
      }, {
        "lightness": 40
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#d00a0a"
      }, {
        "lightness": 17
      }, {
        "weight": 1.2
      }]
    },{
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#4d6059"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4d6059"
      }]
    }, {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#4d6059"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "lightness": 21
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#4d6059"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4d6059"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#7f8d89"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#7f8d89"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#7f8d89"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#7f8d89"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 18
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#7f8d89"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#7f8d89"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#7f8d89"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#7f8d89"
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 19
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "color": "#2b3638"
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2b3638"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#24282b"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#24282b"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "on"
      }]
    }
  ]}
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // listen for the window resize event & trigger Google Maps to update too
    $(window).resize(function() {
      // console.log("resize");
      // (the 'map' here is the result of the created 'var map = ...' above)
      google.maps.event.trigger(map, "resize");
    });

    google.maps.event.addListener(map, "click", function(e) {
      //lat and lng is available in e object
      var latLng = e.latLng;
      if (!gen_click) {
        var $lat = $('#lat');
        var $lng = $('#lng');
        $lat.val(latLng.lat);
        $lng.val(latLng.lng);
      }
    });
  };
  initialize();

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // console.log(results);
      getTime($("#lat").val(),$('#lng').val());
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        // markers.push(results[i]);
      }
    } else {
      var $error2 = $('#msgInv2');
      $error2.show().fadeOut(5200);
      gen_click = false;
      return false;
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      name: place.name,
      position: place.geometry.location,
      place_id: place.place_id,
      rating: place.rating,
      address: place.vicinity
        // photo: place.photos
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
    marker.addListener('dblclick', function() {
      map.setZoom(17);
      map.setCenter(marker.getPosition());
    });
    marker.addListener('click', function() {
      var u;
      try{
        u = place.photos[0].getUrl({
          maxWidth: 640
        });
        document.getElementById('picurl').src = u;
      }catch(e){
        document.getElementById('picurl').src = "img/no-img.jpg";
      }
      // console.log(u);
      $('#picurl').fadeIn(200);
      $('#Vname').text("Name : " + marker.name);
      $('#addr').text("Address : " + marker.address);
      $('#rate').text("Rating : " + marker.rating);
      $('.list-group').fadeIn(200);
      console.log("place_id : " + marker.place_id);
      console.log("name : " + marker.name);
      console.log("rating : " + marker.rating);
      console.log("address : " + marker.address);

    });
    markers.push(marker);
  }

  function resetMarkers() {
    for (var i = 0; i < markers.length; i++) {
      setTimeout(markers[i].setMap(null), 1700);
    }
    markers = [];
  }