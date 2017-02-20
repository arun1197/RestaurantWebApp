$('#gen-btn').on('click',function(){
	resetInfo()
	var $radius = $('#radius');
	var $key = $('#keyword');
	var $lat = $('#lat');
	var $lng = $('#lng');
	var $error = $('#msgInv1');
	var $country = $('#country');
	var $time = $('#time');
	$country.text('');
	$time.text('');
	if(checkRadius($radius.val()) && validlatLng($lat.val(),$lng.val())){
		// console.log($lng.val());
		resetMarkers();
		searchPlace($radius.val(),$key.val(),$lat.val(),$lng.val());
		var newCenter = new google.maps.LatLng(parseFloat($lat.val()),parseFloat($lng.val()));
		map.setZoom(11);
		map.setCenter(newCenter);
		gen_click = true;
		// return true;
	}else{
		$error.show().fadeOut(1500);
		return false;
	}
})

function checkRadius(str){
	var rad = parseInt(str,10);
	if (isNaN(rad)){
		console.log("$NaN");
		return false;
	}
	var reg = /^\d+$/;
	if (str.match(reg)) {
		if (rad >= 5000 && rad <= 50000){
			console.log("$pass");
			return true;
		}else{
			console.log("$fail");
			return false;
		}
	} else{
		console.log("false")
		return false;
	}
}

function validlatLng(lat,lng){
	var latReg =/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,16})?))$/;
	var lngReg = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,16})?))$/;
	if(lat.match(latReg) && lng.match(lngReg)){
		console.log("LatLng PASS");
	 	return true;
	} else {
		console.log("LatLng FAIL");
	 	return false;
	}
}

function searchPlace(radius,keyword,lat0,lng0){
	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: {lat:parseFloat(lat0),lng:parseFloat(lng0)},
		radius: parseInt(radius),
		type: ['restaurant'],
		keyword: [keyword]
	}, callback);
}

$('#reset-btn').on('click',function(){
	resetMarkers();
	initialize();
	$('#radius').val('');
	$('#keyword').val('');
	$('#lat').val('');
	$('#lng').val('');
	$('#time').text('');
	$('#country').text('');
	resetInfo();
	gen_click = false;
})

function smoothZoom (map, max, cnt) {
    if (cnt <= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt - 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}  

$('#world-btn').on('click',function(){
	var worldCenter= new google.maps.LatLng(46.316584181822186,-18.28125);
	map.panTo(worldCenter)
	smoothZoom(map,1,map.getZoom());
	
})

function getTime(lat0,lng0){
	link = "http://api.timezonedb.com/v2/get-time-zone?key=HN2BUCAQ6XMO&format=json&by=position&lat="+ lat0+ "&lng=" +lng0
	console.log(link);
	$.ajax({
		type: 'GET',
		url:link,
		success: function(data){
			console.log(data);
			var $country = $('#country');
			var $time = $('#time');
			$country.text(data.countryName);
			var t = data.formatted.split(" ")[1].substring(0,5);
			$time.text(t);
		}
	});
}

function resetInfo(){
	$('#picurl').fadeOut(200);
	$('.list-group').fadeOut(200);
	$('#Vname').text('');
    $('#addr').text('');
    $('#rate').text('');
}



















