var openWeather = {
	  lang : "sp"
	, units: "metric"
	//, imagesURL : "http://openweathermap.org/img/w/"
	, imagesURL : "resources/color/"
	, htmlMarker : '<div class="weatherMarker"><div style="font-size:15px;">{name}</div><img src="{icon}" style="position:relative;margin-top:-10px;width:64px" /><div style="font-size:14px;margin-top:-10px;">{temp}º</div></div>'
	, citiesLayer : null
	, currentCityMarker: null
	, createWeatherMarker : function(data) {
		var lat = data.coord.lat;
		var lng = data.coord.lon;
		var name = data.name;
		var iconURL = openWeather.imagesURL + data.weather[0].icon + ".png";
		var options = { title:name, alt:name };
		var callbackClick = openWeather._onMarkerWeatherClick;
		var html = openWeather.htmlMarker.replace('{name}', name)
										 .replace('{icon}', iconURL)
										 .replace('{temp}', data.main.temp + '');

		//var marker = mapa.addMarker(lat, lng, html, options, callbackClick);
		var marker = mapa.addMarker(lat, lng, html, options);

		marker.data = data;
		return marker;
	}
	, getCurrentWeatherByCityIds : function (ids, callback) {
		var url = "http://api.openweathermap.org/data/2.5/group?id="+ids.toString()+ "&mode=json&lang=" + openWeather.lang + "&units=" + openWeather.units;
		openWeather.executeAjax(url, {}, function(data) {
			if (typeof(callback) !== "undefined") {
				callback(data);
			}
		});
	}
    , getCurrentWeatherByCity : function(name, callback) {
		var formatName = name.toLowerCase().replace("ñ", "n");
		var url = "http://api.openweathermap.org/data/2.5/weather?q=" + formatName + "&mode=json&lang=" + openWeather.lang + "&units=" + openWeather.units; 
	    openWeather.executeAjax(url, {}, function(data) {
			if (typeof(data.name) === "undefined") {
				data.name = name;
			}
			
			if (typeof(callback) !== "undefined") {
				callback(data);
			}
		
			/*var lat = data.coord.lat;
			var lng = data.coord.lon;
			var iconURL = openWeather.imagesURL + data.weather[0].icon + ".png";
			var options = { title:name, alt:name };
			var callbackClick = openWeather._onMarkerWeatherClick;
			var html = openWeather.htmlMarker.replace('{name}', name)
											 .replace('{icon}', iconURL)
											 .replace('{temp}', data.main.temp + '');

			var marker = mapa.addMarker(lat, lng, html, options, callbackClick);

			marker.data = data;
			//marker.bindPopup(name).openPopup();
			mapa.setCenter(data.coord.lat, data.coord.lon);
			mapa.setZoom(11);

			if (openWeather.currentCityMarker != null)
				mapa.removeLayer(openWeather.currentCityMarker);

			openWeather.currentCityMarker = marker;*/
		});
	}
	, getCurrentWeatherByRegion: function(callback) {
		var bounds = mapa.getBounds();
		var zoom = mapa.getZoom();
		var url = "http://api.openweathermap.org/data/2.5/box/city?bbox={maxlon},{maxlat},{minlon},{minlat},{zoom}&cluster=yes&lang=" + openWeather.lang;
		url = url.replace('{minlon}', bounds.getWest())
				 .replace('{minlat}', bounds.getSouth())
			 	 .replace('{maxlon}', bounds.getEast())
				 .replace('{maxlat}', bounds.getNorth())
				 .replace('{zoom}', zoom);

	    openWeather.executeAjax(url, {}, function(list) { 
			if (typeof(callback) !== "undefined") {
				callback(list);
			}
		
			/*var markers = [];
			for(var x = 0; x < list.list.length; x++) {
				var data = list.list[x];
			
				var lat = data.coord.lat;
				var lng = data.coord.lon;
				var iconURL = openWeather.imagesURL + data.weather[0].icon + ".png";
				
				var options = { title:data.name, alt:data.name };
				var callbackClick = openWeather._onMarkerWeatherClick;
				var html = openWeather.htmlMarker.replace('{name}', data.name)
												 .replace('{icon}', iconURL)
												 .replace('{temp}', data.main.temp + '');

				var marker = mapa.createMarker(lat, lng, html, options, callbackClick)
				marker.data = data;
				markers.push(marker);
			}

			if (openWeather.citiesLayer != null)
				openWeather.citiesLayer.clearLayers();
			
			openWeather.citiesLayer = mapa.addMarkers(markers);*/
		});
	}
	, getPredictionWeatherByHour : function(id, callback) {
		var url = "http://api.openweathermap.org/data/2.5/forecast?id=" + id + "&mode=json&lang=" + openWeather.lang + "&units=" + openWeather.units; 
		
	    openWeather.executeAjax(url, {}, function(data) { 
			if (typeof(callback) !== "undefined") {
				callback(data);
			}
			/*var html="<table style='width:100%'>";
			var _html = "";
			for (var x = 0; x < data.list.length; x++) {
				var _data = data.list[x];
		
				var date = new Date(0);
				date.setSeconds(_data.dt | 0);
				var imgUrl = openWeather.imagesURL + _data.weather[0].icon + ".png";
				_html += "<tr>"
						+ "<td colspan='2'>"
						  + "<span style='font-size:16px;margin-left:18px;color:#050505;'>"+ date.format("dd/MM/yyyy hh:mm") + "</span>"
						+ "</td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td style='width:125px'>"
					  	+ "<img src='" + imgUrl + "' align='left'>"
					    + "</td>"
						+ "<td>"
						+ "<div style='font-size:28px;margin-left:10px;position:relative;width: 100%;text-align: center;'>" + _data.main.temp + "º</div>" 
						+ "<div style='text-align:center'>" 
						+ openWeather.getDescription(_data.weather[0].id) + " " + _data.clouds.all + "% " + "<br>" 
						+ "Presión: " + _data.main.pressure + "hpa"
						+ "</div>"
						+ "</td>"
						+ "</tr>"
						//+ "		<tr>"
						//+ "			<th>Nubes</th>"
						//+ "			<td>" + openWeather.getDescription(_data.weather[0].id) + "<br>" + _data.clouds.all + "%</td>"
						//+ "		</tr>"
						+ "		<tr>"
						+ "			<td><b>Humedad:</b> " + _data.main.humidity + "%</td>"
						+ "			<td><b>Viento:</b> " + _data.wind.speed + " km/h</td>"
						+ "		</tr>"
						+ "</tr>"
						+ "<td colspan='2'>"
						+ "<hr>"
						+ "</td>"
						+ "<tr>";
			}
			html+= _html;
			html+="</table>";
			$("#divMoreInfoHour").html(html);*/
		});
	}
	, getPredictionWeather : function(id, callback) {
		var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + id + "&cnt=16" + "&mode=json&lang=" + openWeather.lang + "&units=" + openWeather.units; 
		
	    openWeather.executeAjax(url, {}, function(data) { 
			if (typeof(callback) !== "undefined") {
				callback(data);
			}
			/*var html = "<table>"
					 + "<tr>";
					 
			var date = new Date();
			
			for (var x = 0; x < data.list.length; x++) {
				var dateAux = new Date();
				dateAux.setDate(new Date().getDate() +(x+1));

				var _data = data.list[x];
				var imgUrl = openWeather.imagesURL + _data.weather[0].icon + ".png";
				var _html = "<td><table>"
						  + "<tr>"
							+ "<td>"
								+ "<img src='" + imgUrl + "' align='left'>"
								+ dateAux.format("dd/MM/yyyy")
							+ "</td>"
						  + "</tr>"
						  + "<tr>"
							+ "<th>Temp.</th>"
						  + "</tr>"
						  + "<tr>"
							+ "<td width='200px'>" + _data.temp.min + "/" + _data.temp.max + "º</td>"
						  + "</tr>"
						  + "<tr>"
							+ "<th>Humedad</th>"
						  + "</tr>"
						  + "<tr>"
							+ "<td width='200px'>" + _data.humidity + "%</td>"
						  + "</tr>"
						  + "<tr>"
							+ "<th>Presion</th>"
						  + "</tr>"
						  + "<tr>"
							+ "<td width='200px'>" + _data.pressure + "hpa</td>"
						  + "</tr>"
						  + "</table></td>";
						  
				html+=_html;
			}
			
			html+= "</tr>"
				 + "<table>";
				 
			$("#divMoreInfo16").html(html);*/
		});
	}
    , executeAjax : function(url, options, onSuccess, onError) {
	  var _options = {
		   type: "GET",  
		   dataType: "json",
		   //data: ,
		   async:true,
		   url: url, 
		   timeout: 120000,
		   cache: false,
		   success: function(data) {
			   if (typeof(onSuccess) !== "undefined") {
				   onSuccess(data);
			   }
			},
			error: function(e) {
			   if (typeof(onError) !== "undefined") {
				   onError(e);
			   }
			}
		};

		_options = $.extend(_options, options);
		$.ajax(_options);
	}
	, showLegend : function(e) {
		if (typeof(e.layer.options) === "undefined" || typeof(e.layer.options.legend) === "undefined")
			return;
			
		if (e.type == "layeradd") {
			var html = "<img id='imgLegend"+e.layer._leaflet_id+"' src='"+e.layer.options.legend+"'>";
			$("#divLegend").append(html);
		}
		else {
			$("#imgLegend"+e.layer._leaflet_id+"").remove();
		}
	}
	, _onMarkerWeatherClick: function(sender, e) {
		var data = sender.data;
		var imgUrl = openWeather.imagesURL + data.weather[0].icon + ".png";

		if (typeof(data.sys) === "undefined")
			data.sys = {};
		
		var dSunrise = new Date(0);
		dSunrise.setSeconds(data.sys.sunrise | 0);

		var dSunset  = new Date(0);
		dSunset.setSeconds(data.sys.sunset | 0);

		var htmlInfo = ""
		+ "	<H1>" + data.name + "</H1>"
		+ "	<table style='text-align:center;'>"
		+ "		<tr>"
		+ "			<td >"
		+ "				<img src='" + imgUrl + "' align='left'>"
		+ "			</td>"
		+ "			<td>"
		+ "				<div style='font-size:35px'>" + data.name + "</div>"
		+ "				<div style='font-size:35px'>" + data.main.temp + "º</div>"
		+ " 		</td>"
		+ "		</tr>"
		+ "		<tr>"
		+ "			<th>Nubes</th>"
		+ "			<td>" + openWeather.getDescription(data.weather[0].id) + "<br>" + data.clouds.all + "%</td>"
		+ "		</tr>"
		+ "		<tr>"
		+ "			<th>Humedad</th>"
		+ "			<td>" + data.main.humidity + "%</td>"
		+ "		</tr>"
		+ "		<tr>"
		+ "			<th>Viento</th>"
		+ "			<td>" + data.wind.speed + " km/h</td>"
		+ "		</tr>"
		+ "		<tr>"
		+ "			<th>Presión</th>"
		+ "			<td>" + data.main.pressure + "hpa</td>"
		+ "		</tr>"
		+ "		<tr>"
		+ "			<th>Salida del sol</th>"
		+ "			<td>" + dSunrise.format("hh:mm:ss") + "</td>"
		+ "		</tr>"
		+ "		<tr>"
		+ "			<th>Puesta de sol</th>"
		+ "			<td>" + dSunset.format("hh:mm:ss") + "</td>"
		+ "		</tr>"
		+ "	</table>";
		$("#divInfoWeather").html(htmlInfo);
		openWeather.getPredictionWeatherByHour(data.id);
		openWeather.getPredictionWeather(data.id);
		$("#pnInfo").fadeIn();
		//alert(sender.data);
	}
	, getDescription : function(id) {
		switch(id) {
			case 200:
				return "Tormentas con lluvia ligera";
			case 201:
				return "Tormentas con lluvia";
			case 202:
				return "Tormentas con lluvia fuerte";
			case 210:
				return "Tormentas sin precipitaciones";
			case 211:
				return "Tormentas";
			case 212:
				return "Tormentas fuertes";
			case 221:
				return "Tormentas dispersas";
			case 230:
				return "Tormentas con lloviznas ligeras";
			case 231:
				return "Tormentas con lloviznas";
			case 231:
				return "Tormentas con lloviznas fuertes";
				
			case 300:
				return "Lloviznas ligeras";
			case 301:
				return "Lloviznas";
			case 302:
				return "Lloviznas fuertes";
			case 310:
				return "Lloviznas";
			case 311:
				return "Lluvia ligera";
			case 312:
				return "Lluvia";
			case 313:
				return "Lluvias y lloviznas";
			case 314:
				return "Lluvias y lloviznas moderadas";
			case 321:
				return "Lloviznas";
		
			case 500:
				return "Lluvia ligera";
			case 501:
				return "Lluvia";
			case 502:
				return "Lluvia moderada";
			case 503:
				return "Lluvia intensa";
			case 504:
				return "Lluvia muy fuerte";
			case 511:
				return "Agua nieve";
			case 520:
				return "Lluvia ligera";
			case 521:
				return "Lluvia";
			case 522:
				return "Lluvia fuerte";
			case 531:
				return "Lluvia dispersa";
				
			case 600:
				return "Nevadas ligera";
			case 601:
				return "Nevadas";
			case 602:
				return "Nevadas fuertes";
			case 611:
				return "Agua nieve";
			case 612:
				return "Agua nieve";
			case 615:
				return "Lluvia ligera con nieve";
			case 616:
				return "Lluvias y nevadas";
			case 620:
				return "Nevadas ligeras";
			case 621:
				return "Nevadas";
			case 622:
				return "Nevadas fuertes";
				
			case 701:
				return "Bancos de Niebla";
			case 711:
				return "Humo";
			case 721:
				return "Calima";
			case 731:
				return "Arena, remolinos de polvo";
			case 741:
				return "Bancos de niebla";
			case 751:
				return "Tormentas de arena";
			case 761:
				return "Polvo en suspensión";
			case 762:
				return "Ceniza volcánica";
			case 771:
				return "Chubascos";
			case 781:
				return "Tornados";
				
			case 800:
				return "Cielo despejado";
			case 801:
				return "Cielos poco nubosos";
			case 802:
				return "Nubes dispersas";
			case 803:
				return "Muy nuboso";
			case 804:
				return "Nublado";
				
		}
	}
};

