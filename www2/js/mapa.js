var mapa = {
	map : null,
	create : function(div, iniLayers, options ) {
		var _options = { /*minZoom: 3*/ zoom: 5, layers : iniLayers, center : [40.10, -3.07]};
		_options = $.extend(_options, options);
			
		mapa.map = L.map(div, _options);
		mapa.map.setMaxBounds([[84.67351256610522, -174.0234375], [-58.995311187950925, 223.2421875]]);
		return mapa.map;
	},
	addMarker : function (lat, lng, iconURL, options, onClickEvent) {
		var marker = mapa.createMarker(lat, lng, iconURL, options, onClickEvent);
		marker.addTo(mapa.map);
		return marker;
	},
	addMarkers : function (markers) {
		var markersGroup = L.layerGroup(markers);
		mapa.addLayer(markersGroup);
		return markersGroup;
	},
	createMarker : function(lat, lng, html, options/*, onClickEvent*/) {
		/*var onMarkerClick = function(e) {
			if (typeof(onClickEvent) !== "undefined")
				onClickEvent(this, e);
		};
	
		var icon = L.icon({ 
					iconSize: [64, 64],
					//iconAnchor: [0, 0],
					popupAnchor: [0, -20],
					iconUrl : iconURL,  
				 });*/
				 
		var icon = L.divIcon({ 
			iconSize: [80, 64], 
			html: html
		});
	
		var point =  L.latLng(lat, lng);
		var _options = { icon : icon };
		_options = $.extend(_options, options);
		var marker = L.marker(point, _options);
			//.bindPopup('<iframe style="border-style:none" src="http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&mode=html&lang=sp"></iframe>')
			//.openPopup();
			
		//marker.on('click', onMarkerClick);
		return marker;
	},
	setCenter : function(lat, lng) {
		mapa.map.setView(L.latLng(lat, lng));
	},
	setZoom : function(zoom) {
		mapa.map.setZoom(zoom);
	},
	getZoom : function() {
		return mapa.map.getZoom();
	},
	createLayer : function(url, options) {
		var _options = {
						attribution: "",
						maxZoom: 15,
						opacity : 1
					   };
					   
		_options = $.extend(_options, options);
		return L.tileLayer(url, _options);
	},
	addLayersControl : function(baseLayers,overLayers) {
		var control = L.control.layers(baseLayers,overLayers, {position:'bottomright'});
		control.addTo(mapa.map);

		return control;
	}, 
	addLayer : function(layer) {
		mapa.map.addLayer(layer);
	},
	removeLayer :function(layer) {
		mapa.map.removeLayer(layer);
	},
	getBounds : function() {
		return mapa.map.getBounds();
	},
	getLocation : function() {
		var callbackLocation = function (location) {
			alert(location.coords.latitude);
			alert(location.coords.longitude);
			alert(location.coords.accuracy);
		};
		
		var callbackError = function (e) {
			alert("Se ha producido un error. "  + e.message);
		}
		
		var _options = {  frequency : 50000, maximumAge : 300000, timeout : 500000, enableHighAccuracy :true };
		
		navigator.geolocation.getCurrentPosition(callbackLocation, callbackError, _options);
	}
}