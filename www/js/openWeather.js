var openWeather = {
	  lang : "sp"
	, units: "metric"
	//, imagesURL : "http://openweathermap.org/img/w/"
	, citiesLayer : null
	, currentCityMarker: null
	, createWeatherMarker : function(data) {
		var lat = data.coord.lat;
		var lng = data.coord.lon;
		var name = data.name;
		var iconURL = openWeather.imagesURL + data.weather[0].icon + ".png";
		var options = { title:name, alt:name };
		var callbackClick = openWeather._onMarkerWeatherClick;
		var html =draw.generateHTML(data, 'marker');
		var marker = mapa.addMarker(lat, lng, html, options);

		marker.data = data;
		return marker;
	}
	, apikey: "53a05d6c22c39cc40a16bddb78ab10a8"
	, getCurrentWeatherByCityIds : function (ids, callback) {
		var url = "http://api.openweathermap.org/data/2.5/group?id="+ids.toString()+ "&mode=json&lang=" + languaje.lang + "&units=" + languaje.units+ "&appid=" + openWeather.apikey;
		openWeather.executeAjax(url, {}, function(data) {
			if (typeof(callback) !== "undefined") {
				callback(data);
			}
		});
	}
    , getCurrentWeatherByCity : function(name, callback) {
		var formatName = name.toLowerCase().replace("ñ", "n");
		var url = "http://api.openweathermap.org/data/2.5/weather?q=" + formatName + "&mode=json&lang=" + languaje.lang + "&units=" + languaje.units+ "&appid=" + openWeather.apikey;
	    openWeather.executeAjax(url, {}, function(data) {
			if (typeof(data.name) === "undefined") {
				data.name = name;
			}
			
			if (typeof(callback) !== "undefined") {
				callback(data);
			}
		});
	}
    , getCurrentWeatherByLatLng : function(lat, lng, callback) {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&mode=json&lang=" + languaje.lang + "&units=" + languaje.units+ "&appid=" + openWeather.apikey;
        url = url.replace('{lat}', lat)
				 .replace('{lng}', lng);
	    openWeather.executeAjax(url, {}, function(item) {
			if (typeof(callback) !== "undefined") {
				callback(item);
			}
		});
     }
	, getCurrentWeatherByRegion: function(callback) {
		var bounds = mapa.getBounds();
		var zoom = mapa.getZoom();
		var url = "http://api.openweathermap.org/data/2.5/box/city?bbox={maxlon},{maxlat},{minlon},{minlat},{zoom}&cluster=yes&lang=" + languaje.lang+ "&units=" + languaje.units+ "&appid=" + openWeather.apikey;
		url = url.replace('{minlon}', bounds.getWest())
				 .replace('{minlat}', bounds.getSouth())
			 	 .replace('{maxlon}', bounds.getEast())
				 .replace('{maxlat}', bounds.getNorth())
				 .replace('{zoom}', zoom);

	    openWeather.executeAjax(url, {}, function(list) { 
			if (typeof(callback) !== "undefined") {
				callback(list);
			}
		});
	}
	, getPredictionWeatherByHour : function(id, callback) {
		var url = "http://api.openweathermap.org/data/2.5/forecast?id=" + id + "&mode=json&lang=" + languaje.lang + "&units=" + languaje.units+ "&appid=" + openWeather.apikey;
		
	    openWeather.executeAjax(url, {}, function(data) { 
			if (typeof(callback) !== "undefined") {
				callback(data);
			}
		});
	}
	, getPredictionWeather : function(id, callback) {
		var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + id + "&cnt=16" + "&mode=json&lang=" + languaje.lang + "&units=" + languaje.units+ "&appid=" + openWeather.apikey;
		
	    openWeather.executeAjax(url, {}, function(data) { 
			if (typeof(callback) !== "undefined") {
				callback(data);
			}
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
    , showDialog: function(sender) {
        if (typeof index !== "undefined") index.dialog(sender);
        else if (typeof details !== "undefined") details.dialog(sender);
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
            case 0:
                return void 0;
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
        
        return '';
	}
};

