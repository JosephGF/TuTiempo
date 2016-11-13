var weatherTags =  {
	id:"{id}",
	city:"{city}",
	temperature:"{temp}",
	temperatureMax:"{temp_max}",
	temperatureMin:"{temp_min}",
	description:"{desc}",
	percentClouds:"{clouds}",
	wind:"{wind}",
	windDirection:"{wind_dir}",
	humidity:"{humidity}",
	pressure:"{press}",
	sunrise:"{sunrise}",
	sunset:"{sunrset}",
	image:"{image}",
	data:"{data}"
	//hour:"{hour}"
};

var draw = {
	simpleRow : '<li class="list-item-multi-line selectable">'
			   + '<a href="details.html?id=' + weatherTags.id + '" data-ignore="true" >'
				 + weatherTags.image // '<i class="wi wi-weather wi-day-rain icon-48" style="float:left"></i>'
				 +  '<h4>' + weatherTags.city + '</h4>'
				 +  '<p>' + weatherTags.temperature + 'º ' + weatherTags.description + ', ' + weatherTags.percentClouds + '% nubosidad</p>'
			   +  '</a>'
			  + '</li>',
	detailsRow : '<li class="list-item-multi-line selectable">'
					+ '<a href="javascript: void(0);" data-ignore="true" onclick="details.dialog(this)" data-weather=\'' + weatherTags.data + '\'>'
					+  weatherTags.image //'<i class="wi wi-weather wi-day-rain icon-48" style="float:left"></i>'
					+  '<h4>'+weatherTags.city +'<span style="float:right;">' + weatherTags.temperature + 'º</span></h4>'
					+  '<p>' + weatherTags.description + ', ' + weatherTags.percentClouds + '% nubosidad</p>'
					+'</a>'
				  + '</li>',
	detailsRow2 : '<li class="list-item-multi-line selectable">'
					+ '<a href="javascript: void(0);" data-ignore="true" onclick="details.dialog(this)" data-weather=\'' + weatherTags.data + '\'>'
					  + weatherTags.image //'<i class="wi wi-weather wi-day-rain icon-48" style="float:left"></i>'
					  + '<h4>&nbsp;<span style="float:right;">'+weatherTags.temperatureMax+'º / '+weatherTags.temperatureMin+'º</span></h4>'
					  +  '<p>' + weatherTags.description + ', ' + weatherTags.percentClouds + '% nubosidad</p>'
					+ '</a>'
					+ '<div style="clear:both"></div>'
				  + '</li>',
	rowCurrent : '<a href="details.html?id=' + weatherTags.id + '" data-ignore="true" onclick="details.dialog(this)" data-weather=\'' + weatherTags.data + '\'>'
						+ weatherTags.image
					    +  '<h4>' + weatherTags.city + '</h4>'
					 	+  '<p>' + weatherTags.temperature + 'º ' + weatherTags.description + ', ' + weatherTags.percentClouds + '% nubosidad</p>'
					   + '</a>',
	details : '<div id="weather-data" style="padding:12px;">'
			+	'  <div class="list-item-multi-line selectable">'
			+	weatherTags.image //'	  <i class="wi wi-weather wi-day-rain icon-48" style="float:left"></i>'
			+	'	  <h3 style="text-align:center;">' + weatherTags.city + '</h3>'
			+	'  </div>'
			+	'<div style="font-size:22px;text-align:right;width:100%;">' + weatherTags.description + ' (' + weatherTags.percentClouds + '%)</div>'
			+	'<br />'
			+	'<i class="wi wi-thermometer wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Temperatura\')" ></i><div class="wi-weather-text-32">' + weatherTags.temperature + 'º</div>'
			+	'<div style="clear:both;"></div>'
			+	'<i class="wi wi-wind-south-west wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Velocidad y dirección del viento\')"  ></i><div  class="wi-weather-text-32">' + weatherTags.wind + ' km/h ' + weatherTags.windDirection + '</div>'
			+	'<div style="clear:both;"></div>'
			+	'<i class="wi wi-sprinkles wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Porcentaje de humedad\')"  ></i><div  class="wi-weather-text-32">' + weatherTags.humidity + '%</div>'
			+	'<div style="clear:both;"></div>'
			+	'<i class="wi wi-cloud-down wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Presión atsmosférica\')"  ></i><div  class="wi-weather-text-32">' + weatherTags.pressure + ' hpa</div>'
			+	'<div style="clear:both;"></div>'
			+	'<i class="wi wi-sunrise wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Salida del sol\')"  ></i><div  class="wi-weather-text-32">' + weatherTags.sunrise + '</div>'
			+	'<div style="clear:both;"></div>'
			+	'<i class="wi wi-sunset wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Puesta de sol\')"  ></i><div  class="wi-weather-text-32">' + weatherTags.sunset + '</div>'
			+ '</div>',
	detailsSmall : '<div id="weather-data" style="padding:12px;">'
			+	'  <div class="list-item-multi-line selectable">'
			+	weatherTags.image //'	  <i class="wi wi-weather wi-day-rain icon-48" style="float:left"></i>'
			+	'	  <h3 style="text-align:center;">' + weatherTags.city + '</h3>'
			+	'  </div>'
			+	'<div style="font-size:22px;text-align:right;width:100%;">' + weatherTags.description + ' (' + weatherTags.percentClouds + '%)</div>'
			+	'<br />'
			+	'<i class="wi wi-thermometer wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Temperatura\')" ></i><div class="wi-weather-text-32">' + weatherTags.temperature + 'º</div>'
			+	'<div style="clear:both;"></div>'
			+	'<i class="wi wi-wind-south-west wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Velocidad y dirección del viento\')"  ></i><div  class="wi-weather-text-32">' + weatherTags.wind + ' km/h ' + weatherTags.windDirection + '</div>'
			+	'<div style="clear:both;"></div>'
			+	'<i class="wi wi-sprinkles wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Porcentaje de humedad\')"  ></i><div  class="wi-weather-text-32">' + weatherTags.humidity + '%</div>'
			+	'<div style="clear:both;"></div>'
			+	'<i class="wi wi-cloud-down wi-weather-32 icon-32" style="float:left;color: #33b5e5;" onclick="details.toast(\'Presión atsmosférica\')"  ></i><div  class="wi-weather-text-32">' + weatherTags.pressure + ' hpa</div>'
			+ '</div>',
	generateHTML : function(data, type) {
		var html = "";
	
		switch(type) {
			case "row":
				html = draw.simpleRow;
				break;
			case "rowDetails":
				html = draw.detailsRow;
				break;
			case "rowDetails2":
				html = draw.detailsRow2;
				break;
			case "details":
				html = draw.details;
				break;
			case "detailsSmall":
				html = draw.detailsSmall;
				break;
			case "rowCurrent":
				html = draw.rowCurrent;
				break;
			default:
				console.log("Type of html is not specified");
		}
		
		var description = openWeather.getDescription(data.weather[0].id);
		var dSunrise = new Date(0);
		if (typeof(data.sys) !== "undefined")
		dSunrise.setSeconds(data.sys.sunrise | 0);
		var dSunset = new Date(0);
		if (typeof(data.sys) !== "undefined")
		dSunset.setSeconds(data.sys.sunset | 0);
		
		var temp = "";
		if (typeof(data.main) !== "undefined")
			temp = data.main.temp.toFixed(2);
		else 
			temp = data.temp.day.toFixed(2);
			
		var tempMax = "";
		if (typeof(data.temp) !== "undefined")
			tempMax = data.temp.max.toFixed(2);
			
		var tempMin = "";
		if (typeof(data.temp) !== "undefined")
			tempMin = data.temp.min.toFixed(2);
			
		var windSpeed = "";
		if (typeof(data.wind) !== "undefined")
			windSpeed = data.wind.speed.toFixed(2);
		else
			windSpeed = data.speed.toFixed(2);
			
		var humidity = "";
		if (typeof(data.main) !== "undefined")
			humidity = data.main.humidity;
		else
			humidity = data.humidity;
			
		var pressure = "";
		if (typeof(data.main) !== "undefined")
			pressure = data.main.pressure.toFixed(2);
		else
			pressure = data.pressure.toFixed(2);
			
		var clouds = "";
		if (typeof(data.clouds.all) !== "undefined") {
			clouds = data.clouds.all;
		}
		else {
			clouds = data.clouds;
		}
		
		var image = draw.getWeatherTranscription(data.weather[0].id, "icon", { day: true });
		var strData = JSON.stringify(data);
		html = html.replace(weatherTags.id, data.id)
					.replace(weatherTags.image, image)
					.replace(weatherTags.city, data.name)
					.replace(weatherTags.temperature, temp)
					.replace(weatherTags.description, description)
					.replace(weatherTags.percentClouds, clouds)
					.replace(weatherTags.wind, windSpeed)
					.replace(weatherTags.windDirection, "")
					.replace(weatherTags.humidity, humidity)
					.replace(weatherTags.pressure, pressure)
					.replace(weatherTags.temperatureMax, tempMax)
					.replace(weatherTags.temperatureMin, tempMin)
					.replace(weatherTags.data, strData)
					.replace(weatherTags.sunrise, dSunrise.format("hh:mm:ss"))
					.replace(weatherTags.sunset , dSunset.format("hh:mm:ss"));
					
		return html;
	},
	getWeatherTranscription: function(code, type, options) {
		var value = "";
		
		switch(type) {
			case "icon":
					var html = '<i class="wi wi-weather {weather} icon-{size}" style="float:left"></i>';
					var _options = $.extend({size:'48'}, options);
					html = html.replace("{weather}", draw.getWeatherImage(code))
						.replace("{size}", _options.size);
						
					value = html;
				break;
			case "description":
					value = getDescription(code);
				break;
		}
		
		return value;
	}
	, getWeatherImage: function(code, day) {
		var day = "day";
		if (day == false)
			day = "night";
	
		var icons = [];
		icons[200] = "wi-{day}-storm-showers";//"Tormentas con lluvia ligera";
		icons[201] = "wi-storm-showers";//"Tormentas con lluvia";
		icons[202] = "wi-thunderstorm";//"Tormentas con lluvia fuerte";
		icons[210] = "wi-{day}-lightning"; //"Tormentas sin precipitaciones";
		icons[211] = "wi-storm-showers";//"Tormentas";
		icons[212] = "wi-thunderstorm";//"Tormentas fuertes";
		icons[221] = "wi-{day}-storm-showers";//"Tormentas dispersas";
		icons[230] = "wi-{day}-storm-showers";//"Tormentas con lloviznas ligera";
		icons[231] = "wi-storm-showers";//"Tormentas con lloviznas";
		icons[232] = "wi-thunderstorm";//"Tormentas con lloviznas fuertes";
		
		icons[300] = "wi-rain-mix"; //"Lloviznas ligeras";
		icons[301] = "wi-{day}-rain"; //"Lloviznas";
		icons[302] = "wi-rain"; //"Lloviznas fuertes";
		icons[310] = "wi-{day}-rain"; //"Lloviznas";
		icons[311] = "wi-hail"; //"Lluvias y lloviznas moderadas";
		icons[312] = "wi-{day}-rain"; //"Lloviznas";
		icons[313] = "wi-rain-mix"; //"Lloviznas ligeras";
		icons[314] = "wi-hail"; //"Lluvias y lloviznas moderadas";
		icons[321] = "wi-{day}-rain"; //"Lloviznas";

		icons[500] = "wi-rain-mix"; //"Lluvia ligera";
		icons[501] = "wi-hail"; //"Lluvia";
		icons[502] = "wi-{day}-rain-wind";//"Lluvia moderada";
		icons[503] = "wi-rain"; //"Lluvia intensa";
		icons[504] = "wi-rain"; //"Lluvia muy fuerte";
		icons[511] = "wi-{day}-rain-mix"; //"Agua nieve";
		icons[520] = "wi-rain-mix"; //"Lluvia ligera";
		icons[521] = "wi-hail"; //"Lluvia";
		icons[522] = "wi-rain"; //"Lluvia fuerte";
		icons[531] = "wi-rain-mix"; //"Lluvia dispersa";
		
		icons[600] = "wi-{day}-snow-wind";//"Nevadas ligeras";
		icons[601] = "wi-snow"; //"Nevadas";
		icons[602] = "wi-snow-wind"; //"Nevadas fuertes";
		icons[611] = "wi-{day}-rain-mix"; //"Agua nieve";
		icons[612] = "wi-{day}-rain-mix"; //"Agua nieve";
		icons[615] = "wi-{day}-rain-wind"; //"Lluvia ligera con nieve";
		icons[616] = "wi-{day}-rain-wind"; //"Lluvias y nevadas";
		icons[620] = "wi-{day}-snow-wind";// "Nevadas ligeras";
		icons[621] = "wi-snow"; //"Nevadas";
		icons[622] = "wi-snow-wind"; //"Nevadas fuertes";
		
		icons[701] = "wi-{day}-fog"; //"Bancos de Niebla";
		icons[711] = "wi-smog"; //"Humo";
		icons[721] = "wi-hot"; //"Calima";
		icons[731] = "Arena, remolinos de polvo";
		icons[741] = "wi-{day}-fog"; //"Bancos de Niebla";
		icons[751] = "wi-dust"; //"Tormentas de arena";
		icons[761] = "wi-{day}-fog"; //"Polvo en suspensión";
		icons[762] = "wi-{day}-fog"; //"Ceniza volcánica";
		icons[771] = "wi-{day}-alt-hail"; //"Chubascos";
		icons[781] = "wi-tornado"; //"Tornados";
				
		icons[800] = "wi-{day}-sunny"; //"Cielo despejado";
		icons[801] = "wi-{day}-cloudy"; //Cielos poco nubosos";
		icons[802] = "wi-{day}-cloudy";//Nubes dispersas";
		icons[803] = "wi-cloudy";//"Muy nuboso";
		icons[804] = "wi-cloudy";//"Nublado";
		
		return icons[code].replace('{day}', day);
	}
	, getDescription : function(code) {
		var descriptions = [];
		descriptions[200] = "Tormentas con lluvia ligera";
		descriptions[201] = "Tormentas con lluvia";
		descriptions[202] = "Tormentas con lluvia fuerte";
		descriptions[210] = "Tormentas sin precipitaciones";
		descriptions[211] = "Tormentas";
		descriptions[212] = "Tormentas fuertes";
		descriptions[221] = "Tormentas dispersas";
		descriptions[230] = "Tormentas con lloviznas ligera";
		descriptions[231] = "Tormentas con lloviznas";
		descriptions[232] = "Tormentas con lloviznas fuertes";
		
		descriptions[300] = "Lloviznas ligeras";
		descriptions[301] = "Lloviznas";
		descriptions[302] = "Lloviznas fuertes";
		descriptions[310] = "Lloviznas";
		descriptions[311] = "Lluvias y lloviznas moderadas";
		descriptions[312] = "Lluvia";
		descriptions[313] = "Lloviznas ligeras";
		descriptions[314] = "Lluvias y lloviznas moderadas";
		descriptions[321] = "Lloviznas";

		descriptions[500] = "Lluvia ligera";
		descriptions[501] = "Lluvia";
		descriptions[502] = "Lluvia moderada";
		descriptions[503] = "Lluvia intensa";
		descriptions[504] = "Lluvia muy fuerte";
		descriptions[511] = "Agua nieve";
		descriptions[520] = "Lluvia ligera";
		descriptions[521] = "Lluvia";
		descriptions[522] = "Lluvia fuerte";
		descriptions[531] = "Lluvia dispersa";
		
		descriptions[600] = "Nevadas ligeras";
		descriptions[601] = "Nevadas";
		descriptions[602] = "Nevadas fuertes";
		descriptions[611] = "Agua nieve";
		descriptions[612] = "Agua nieve";
		descriptions[615] = "Lluvia ligera con nieve";
		descriptions[616] = "Lluvias y nevadas";
		descriptions[620] = "Nevadas ligeras";
		descriptions[621] = "Nevadas";
		descriptions[622] = "Nevadas fuertes";
		
		descriptions[701] = "Bancos de Niebla";
		descriptions[711] = "Humo";
		descriptions[721] = "Calima";
		descriptions[731] = "Arena, remolinos de polvo";
		descriptions[741] = "Bancos de Niebla";
		descriptions[751] = "Tormentas de arena";
		descriptions[761] = "Polvo en suspensión";
		descriptions[762] = "Ceniza volcánica";
		descriptions[771] = "Chubascos";
		descriptions[781] = "Tornados";
				
		descriptions[800] = "Cielo despejado";
		descriptions[801] = "Cielos poco nubosos";
		descriptions[802] = "Nubes dispersas";
		descriptions[803] = "Muy nuboso";
		descriptions[804] = "Nublado";
		
		return descriptions[code];
	}
};