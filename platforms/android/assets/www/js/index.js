var index = {
	init : function() {
		document.title = languaje.navbarTitle;
		$("#navbarTitle").html(languaje.navbarTitle);
		//index._searchByIds([2520413, 2521978]);
		index._searchByIds(favorites.getIdsArray());
		index.loadMap();
		index._searchByLatLng();
		index.autocomplete("search");
	},
	autocomplete:function(id) {
		$("#" + id).autocomplete(
		{
			source:localidades,
			minLength:4,
			select: function(event, ui) {
				$("#" + id).val(ui.item.label);
				alert(ui.item.latitud+ ", " + ui.item.longitud)
				mapa.setCenter(ui.item.latitud, ui.item.longitud);
				mapa.setZoom(14);
				index._searchByLatLng(ui.item.latitud, ui.item.longitud);
				return false;
			}
		}).data("autocomplete")._renderItem = function(ul, item) {
				$(ul).addClass("list inset");
				return $('<li class="list-item-single-line selectable"></li>')
					.data("item.autocomplete", item)
					.append("<a><strong>" + item.label + "</strong> / " + item.provincia + "</a>")
					.appendTo(ul);
			};
	},
	loadMap:function() {
		var _lOpenStreetMap = mapa.createLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
									attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
									maxZoom: 18,
									noWrap: true,
								});
								
		var _lOpenCycleMap = mapa.createLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
									attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								});
		
		var opacity = 0.5, attribution = 'Map data © OpenWeatherMap', maxZoom = 18;
		var _lPrecipitation = mapa.createLayer('http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png', {
								attribution: attribution,
								maxZoom: maxZoom,
								opacity : opacity
							});
							
		var _lSnow = mapa.createLayer('http://{s}.tile.openweathermap.org/map/snow/{z}/{x}/{y}.png', {
								attribution: attribution,
								maxZoom: maxZoom,
								opacity : opacity,
								legend: 'http://openweathermap.org/img/a/SN.png'
							});
							
		var _lClouds = mapa.createLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
								attribution: attribution,
								maxZoom: maxZoom,
								opacity : opacity,
								legend: 'http://openweathermap.org/img/a/NT.png'
							});
							
		var _lPressure = mapa.createLayer('http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png', {
								attribution: attribution,
								maxZoom: maxZoom,
								opacity : 0.3,
								legend: 'http://openweathermap.org/img/a/PN.png'
							});
							
		var _lPressureBars = mapa.createLayer('http://{s}.tile.openweathermap.org/map/pressure_cntr/{z}/{x}/{y}.png', {
								attribution: attribution,
								maxZoom: maxZoom,
								opacity : 0.3
							});
							
		var _lWind = mapa.createLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png', {
								attribution: attribution,
								maxZoom: maxZoom,
								opacity : 0.3,
								legend: 'http://openweathermap.org/img/a/UV.png'
							});
		
		var _lTemp = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png', {
								attribution: attribution,
								maxZoom: maxZoom,
								opacity : 0.3,
								legend: 'http://openweathermap.org/img/a/TT.png'
							});
		
		var baseLayers = { Mapa: _lOpenStreetMap, Relieve: _lOpenCycleMap};
		var overLayers = {
							Precipitaciones : _lPrecipitation,
							Nevadas : _lSnow,
							Nubes : _lClouds,
							Presion : _lPressure,
							Isobaras : _lPressureBars,
							Viento : _lWind,
							Temperatura : _lTemp
						 };
		
		
		
		var map = mapa.create('map', [_lOpenStreetMap], { zoomControl: false });
		//mapa.map.on('click', function(e) { $('#pnInfo').fadeOut(); });
		mapa.map.on('moveend', index._searchByCurrentRegion);
		mapa.map.on('zoomlevelschange', index._searchByCurrentRegion);
		//mapa.map.on('layeradd', openWeather.showLegend);
		//mapa.map.on('layerremove', openWeather.showLegend);
		mapa.addLayersControl(baseLayers, overLayers);
		
		//mapa.map = new L.Map('map');
		//mapa.map.addControl( L.control.zoom( {position: 'bottomeleft'}));
	},
	_searchByCurrentRegion: function() {
		var callback = function(list) {
			var markers = [];

			for(var x = 0; x < list.list.length; x++) {
				var data = list.list[x];
				
				var mapMarker = openWeather.createWeatherMarker(data);
				mapMarker.on('click', index._markerClick);
				markers.push(mapMarker);
			}

			if (openWeather.citiesLayer != null)
				openWeather.citiesLayer.clearLayers();
			
			openWeather.citiesLayer = mapa.addMarkers(markers);
		};

		openWeather.getCurrentWeatherByRegion(callback);
	},
	_searchByIds: function(ids) {
		var callback = function(data) {
			for (var x = 0; x < data.list.length; x++) {
				var _data = data.list[x];
				var html = draw.generateHTML(_data, "row");
				$("#ul-favorites").append(html);
			}
		}
		
		openWeather.getCurrentWeatherByCityIds(ids, callback);
	},
	_searchByName: function(name) {
		var callback = function(data) {
			//alert("En construcción");
			var html = draw.generateHTML(data, "row");
			$("#ul-favorites").append(html);
		}
		
		openWeather.getCurrentWeatherByCity(name, callback);
	},
	_searchByLatLng : function(lat, lng) {
		var callback = function(data) {
		}
		
		if (isNaN(lat) ||  isNaN(lng)) {
				callback = function(data) {
				var html = draw.generateHTML(data, "rowCurrent");
				$("#currentPosition").html(html);
			}
			
			mapa.getLocation(callback);
		}
		else {
			openWeather.getCurrentWeatherByLatLng(location.coords.latitude, location.coords.longitude, callback);
		}
		
	},
	_serachForNextHours: function(idCity) {
		var callback = function(data) {
			for (var x = 0; x < data.list.length; x++) {
				var _data = data.list[x];
			}
			alert("En construcción");
		}
		
		openWeather.getPredictionWeatherByHour(idCity, callback);
		
	},
	_searchForNextDays : function (idCity) {
		var callback = function(data) {
			for (var x = 0; x < data.list.length; x++) {
				var _data = data.list[x];
			}
			alert("En construcción");
		}
		
		openWeather.getPredictionWeather(idCity, callback);
		
	},
	_markerClick : function (e) {
		var data = this.data;
		//$("#ul-favorites").html(html);
		var dialog = new fries.Dialog({
			selector: '#my-dialog',
			callbackOk: function () {
				favorites.add({id:data.id, name:data.name});
			    this.hide(); // this refers to the dialog
			}, 
			callbackCancel: function () {
			  this.hide(); // this refers to the dialog
			}
		});
		var html = draw.generateHTML(data, "detailsSmall");
		$("#weather-dialog-content").html(html);
		dialog.show();
		
	},
	dialog : function(sender) {
		var dialog = new fries.Dialog({
        selector: '#my-dialog',
        callbackOk: function () {
          this.hide(); // this refers to the dialog
        }, 
        callbackCancel: function () {
          this.hide(); // this refers to the dialog
		}
		});
		
		var attr = $(sender).attr("data-weather");
		var data = JSON.parse(attr);
		var html = draw.generateHTML(data, "detailsSmall");
		$("#weather-dialog-content").html(html);
		dialog.data = data;
		dialog.show();
	},
}

$(function() { index.init(); } );