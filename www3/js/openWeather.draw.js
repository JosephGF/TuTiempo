var weatherTags = {
    id: "{id}",
    city: "{city}",
    temperature: "{temp}",
    temperatureMax: "{temp_max}",
    temperatureMin: "{temp_min}",
    description: "{desc}",
    percentClouds: "{clouds}",
    wind: "{wind}",
    windDirection: "{wind_dir}",
    humidity: "{humidity}",
    pressure: "{press}",
    sunrise: "{sunrise}",
    sunset: "{sunrset}",
    image: "{image}",
    icon: "{icon}",
    data: "{data}",
    code: "{code}",
    orientation: "h",
        //hour:"{hour}"
};

var draw = {
    simpleRow: '<li class="list-item-multi-line selectable">' + '<a href="details.html?id=' + weatherTags.id + '" data-ignore="true" >' + weatherTags.image // '<i class="wi wi-weather wi-day-rain icon-48" style="float:left"></i>'
        + '<h4>' + weatherTags.city + '</h4>' + '<p>' + weatherTags.temperature + ' ' + weatherTags.description + ' ' + weatherTags.percentClouds + '</p>' + '</a>' + '</li>',

    detailsRow: '<li class="collection-item avatar" onclick="openWeather.showDialog(this)" data-weather=\'' + weatherTags.data + '\'> \
                    <img src="' + configurtation.icons + configurtation.theme + '\\' + weatherTags.icon + '.png" alt="' + weatherTags.description + '" class="circle" style="height:70px; margin-right:10px;padding: 5px; background: rgb(203, 227, 232); float:left;"> \
                    <span style="font-size:20px;font-weight:bold;">' + weatherTags.city + '</span> \
                    <p> \
                        <span style="float:right;font-weight:bold;">' + weatherTags.temperature + '</span> \
                        <span>' + weatherTags.description + ' ' + weatherTags.percentClouds + '</span>\
                    </p> \
                </li>',
    /*detailsRow : '<li class="list-item-multi-line selectable">'
					+ '<a href="javascript: void(0);" data-ignore="true" onclick="details.dialog(this)" data-weather=\'' + weatherTags.data + '\'>'
					+  weatherTags.image //'<i class="wi wi-weather wi-day-rain icon-48" style="float:left"></i>'
					+  '<h4>'+weatherTags.city +'<span style="float:right;">' + weatherTags.temperature + 'º</span></h4>'
					+  '<p>' + weatherTags.description + ', ' + weatherTags.percentClouds + '% nubosidad</p>'
					+'</a>'
				  + '</li>',*/
    /*detailsRow2 : '<li class="list-item-multi-line selectable">'
					+ '<a href="javascript: void(0);" data-ignore="true" onclick="details.dialog(this)" data-weather=\'' + weatherTags.data + '\'>'
					  + weatherTags.image //'<i class="wi wi-weather wi-day-rain icon-48" style="float:left"></i>'
					  + '<h4>&nbsp;<span style="float:right;">'+weatherTags.temperatureMax+'º / '+weatherTags.temperatureMin+'º</span></h4>'
					  +  '<p>' + weatherTags.description + ', ' + weatherTags.percentClouds + '% nubosidad</p>'
					+ '</a>'
					+ '<div style="clear:both"></div>'
				  + '</li>',*/
    detailsRow2: '<li class="collection-item avatar" onclick="openWeather.showDialog(this)" data-weather=\'' + weatherTags.data + '\'> \
                    <img src="' + configurtation.icons + configurtation.theme + '\\' + weatherTags.icon + '.png" alt="' + weatherTags.description + '" class="circle" style="z-index:99;height:70px; margin-right:10px;padding: 5px; background: rgb(203, 227, 232); float:left;"> \
                    <span style="font-size:20px;font-weight:bold;">' + weatherTags.city + '</span> \
                    <p> \
                        <span style="float:right;font-weight:bold;">' + weatherTags.temperatureMax + ' / ' + weatherTags.temperatureMin + '</span> \
                        <span>' + weatherTags.description + ' ' + weatherTags.percentClouds + '</span>\
                    </p> \
                </li>',
    details: '<div id="weather-data" style="padding:12px;"> \
				 <div class="list-item-multi-line selectable"> \
				 <img src="' + configurtation.icons + configurtation.theme + '\\' + weatherTags.icon + '.png" alt="' + weatherTags.description + '" align="left">\
				 <h3 class="white-text"  style="text-align:center;">' + weatherTags.city + '</h3> \
				 </div> \
				 <div class="white-text" style="font-size:22px;text-align:right;width:100%;">' + weatherTags.description + ' ' + weatherTags.percentClouds + '</div> \
                 <br clear="all" /> \
				 <br /> \
			     <i class="wi wi-thermometer wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="toast(\'Temperatura\', 1500)" ></i> \
                 <div class="wi-weather-text-32 white-text">' + weatherTags.temperature + '</div> \
			     <div style="clear:both;"></div> \
			     <i class="wi wi-wind-south-west wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="toast(\'Velocidad y dirección del viento\', 1500)"  ></i> \
                 <div  class="wi-weather-text-32 white-text">' + weatherTags.wind + ' ' + weatherTags.windDirection + '</div> \
			     <div style="clear:both;"></div> \
			     <i class="wi wi-sprinkles wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="toast(\'Porcentaje de humedad\', 1500)"  ></i>\
                 <div  class="wi-weather-text-32 white-text">' + weatherTags.humidity + '%</div> \
			     <div style="clear:both;"></div> \
			     <i class="wi wi-cloud-down wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="toast(\'Presión atsmosférica\', 1500)"  ></i> \
                 <div  class="wi-weather-text-32 white-text">' + weatherTags.pressure + ' hpa</div> \
			     <div style="clear:both;"></div> \
			     <i class="wi wi-sunrise wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="toast(\'Salida del sol\', 1500)"  ></i> \
                 <div  class="wi-weather-text-32 white-text">' + weatherTags.sunrise + '</div> \
			     <div style="clear:both;"></div> \
			     <i class="wi wi-sunset wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="toast(\'Puesta de sol\', 1500)"  ></i> \
                 <div  class="wi-weather-text-32 white-text">' + weatherTags.sunset + '</div> \
			     </div>',
    detailsSmall: '<div id="weather-data" style="padding:12px;">' 
    + ' <img src="' + configurtation.icons + configurtation.theme + '\\' + weatherTags.icon + '.png" alt="' + weatherTags.description + '" align="left">'
        + '	  <h3 style="text-align:center;">' + weatherTags.city + '</h3>' 
    + '  </div>' + '<div style="font-size:22px;text-align:center;">' + weatherTags.description + ' ' + weatherTags.percentClouds + '</div>' 
    + '<br clear="all" />' 
    + '<i class="wi wi-thermometer wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="details.toast(\'Temperatura\')" ></i>'
    + '<div class="wi-weather-text-32">' + weatherTags.temperature + '</div>'
    + '<div style="clear:both;"></div>'
    + '<i class="wi wi-wind-south-west wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="details.toast(\'Velocidad y dirección del viento\')"  ></i>'
    + '<div  class="wi-weather-text-32">' + weatherTags.wind + ' ' + weatherTags.windDirection + '</div>' 
    + '<div style="clear:both;"></div>' 
    + '<i class="wi wi-sprinkles wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="details.toast(\'Porcentaje de humedad\')"  ></i>'
    + '<div  class="wi-weather-text-32">' + weatherTags.humidity + '%</div>'
    + '<div style="clear:both;"></div>'
    + '<i class="wi wi-cloud-down wi-weather-32 icon-32" style="float:left;color: #26a69a;" onclick="details.toast(\'Presión atsmosférica\')"  ></i>'
    + '<div  class="wi-weather-text-32">' + weatherTags.pressure + ' hpa</div>'
    + '</div>',
    /*card: '<div id="card-'+ weatherTags.id + '" class="col s12 m6 l4" data-weather="' + weatherTags.data + '"> \
                <div class="card"> \
                    <i class="mdi-navigation-close" style="position:absolute;top:5px;right:10px;font-size:30px;color:#B5B5B5;cursor:pointer;z-index:10" onclick="index.deleteFavorite(\''+ weatherTags.id + '\')"></i> \
                    <div class="card-image"> \
                        <img onload="fadeInImage(this);" src="resources/weather/'+ weatherTags.orientation + '/' + weatherTags.code + '.jpg" onerror="this.src=\'resources/weather/000.jpg\'"> \
                        <span class="card-title">' + weatherTags.city + '</span> \
                    </div> \
                    <div class="card-content"> \
                        <p>' + weatherTags.temperature + 'º ' + weatherTags.description + ', ' + weatherTags.percentClouds + '% de nubosidad.</p> \
                    </div> \
                    <div class="card-action"> \
                        <a href="details.html?id='+ weatherTags.id+'">Ver Detalle</a> \
                    </div> \
                </div> \
            </div>',*/
    card: '<div id="card-' + weatherTags.id + '" class="col s12 m6 l4" data-weather=\'' + weatherTags.data + '\' onclick="location.href=\'details.html?id=' + weatherTags.id + ';\'"> \
                <div class="card"> \
                    <i class="mdi-navigation-close" style="position:absolute;top:5px;right:10px;font-size:30px;color:#B5B5B5;cursor:pointer;z-index:10" onclick="index.deleteFavorite(\'' + weatherTags.id + '\')"></i> \
                    <div class="card-image"> \
                        <img onload="fadeInImage(this);" src="resources/weather/' + weatherTags.orientation + '/' + weatherTags.code + '.jpg" onerror="this.src=\'resources/weather/000.jpg\'" class="" style="opacity: 1; -webkit-filter: grayscale(0.01) brightness(100%);" alt="' + weatherTags.description + '"> \
                        <span class="card-title">' + weatherTags.city + '</span> \
                        <img style="position:absolute;top:55px;width:64px;left:10px;" src="' + configurtation.icons + configurtation.theme + '\\' + weatherTags.icon + '.png" alt="' + weatherTags.description + '" >\
                        <span class="card-degree">' + weatherTags.temperature + '</span> \
                        <span class="card-content"> \
                           ' + weatherTags.description + ' ' + weatherTags.percentClouds + ' \
                        </span> \
                    </div> \
                </div> \
            </div>',
    location: '<div style="position:absolute;top:0;left:0;width:100%;bottom:0;right:0;height:100%;pointer-events: visible;" onclick="location.href=\'details.html?id=' + weatherTags.id + '\'"> \
                    <h4 class="white-text" style="position:absolute;top:-15px;left:5px;pointer-events: visible;">' + weatherTags.city + '</h4>\
                    <img src="' + configurtation.icons + configurtation.theme + '\\' + weatherTags.icon + '.png" alt="' + weatherTags.description + '" style="position:absolute;top:35px;left:5px;">\
                    <h2 class="white-text" style="position:absolute;top:-25px;right:5px;">' + weatherTags.temperature + '<h2>\
                    <h4 class="white-text" style="position:absolute;top:30px;right:5px;">' + weatherTags.wind + ' ' + weatherTags.windDirection + '</h4>\
                    <h2 class="white-text" style="position:absolute;bottom:6px;left:10%;">' + new Date().format('hh:mm') + '</h2>\
                    <span class="white-text" style="position:absolute;bottom:0;left:5px;">' + weatherTags.description + ' ' + weatherTags.percentClouds + ' </span>\
               <\div>',
    marker: '<div class="weatherMarker">\
                <div style="font-size:15px;">' + weatherTags.city + '</div>\
                <img src="' + configurtation.icons + configurtation.theme + '\\' + weatherTags.icon + '.png" style="position:relative;margin-top:-10px;width:64px" />\
                <div style="font-size:14px;margin-top:-10px;">' + weatherTags.temperature + '</div>\
            </div>',
    generateHTML: function (data, type) {
        //weatherTags.orientation = ($("body").width() < $("body").height()) ? "v" : "h";
        var html = "";

        switch (type) {
        case "card":
            html = draw.card;
            break;
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
        case "location":
            html = draw.location;
            break;
        case "marker":
            html = draw.marker;
            break;
        default:
            console.log("Type of html is not specified");
            break;
        }

        var dataWeather = void 0;
        if (typeof data.weather !== "undefined")
            dataWeather = data.weather[0];

        var description = "";
        if (typeof dataWeather !== "undefined")
          // description = openWeather.getDescription(dataWeather.id);
             description = dataWeather.description.capitalize();

        var dSunrise = new Date(0);
        if (typeof (data.sys) !== "undefined")
            dSunrise.setSeconds(data.sys.sunrise || 0);

        var dSunset = new Date(0);
        if (typeof (data.sys) !== "undefined")
            dSunset.setSeconds(data.sys.sunset || 0);

        var temp = NaN;
        if (typeof (data.main) !== "undefined")
            temp = Math.round(data.main.temp * 2) / 2;
            //temp = data.main.temp.toFixed(2);
        else if (typeof (data.temp) !== "undefined")
            temp = Math.round(data.temp.day * 2) / 2
            //temp = data.temp.day.toFixed(2);

        var tempMax = NaN;
        if (typeof (data.temp) !== "undefined")
            tempMax = Math.round(data.temp.max * 2) / 2;
            //tempMax = data.temp.max.toFixed(2);

        var tempMin = NaN;
        if (typeof (data.temp) !== "undefined")
            tempMin = Math.round(data.temp.min * 2) / 2;
            //tempMin = data.temp.min.toFixed(2);

        var windSpeed = NaN;
        if (typeof (data.wind) !== "undefined")
            windSpeed = Math.round(data.wind.speed * 2) / 2;
            //windSpeed = data.wind.speed.toFixed(2);
        else if (typeof (data.speed) !== "undefined")
            windSpeed = Math.round(data.speed * 2) / 2;
            //windSpeed = data.speed.toFixed(2);

        var windirection = NaN;
        if (typeof (data.wind) !== "undefined") {
            var degree = data.wind.deg;
            var val = Math.round((degree - 11.25) / 22.5);
            windirection = languaje.direction[Math.abs(val)];
        }

        var humidity = "";
        if (typeof (data.main) !== "undefined")
            humidity = data.main.humidity;
        else if (typeof (data.humidity) !== "undefined")
            humidity = data.humidity;

        var pressure = "";
        if (typeof (data.main) !== "undefined")
            pressure = data.main.pressure.toFixed(2);
        else if (typeof (data.pressure) !== "undefined")
            pressure = data.pressure.toFixed(2);

        var clouds = NaN;
        if (typeof (data.clouds) !== "undefined" && typeof (data.clouds.all) !== "undefined")
            clouds = data.clouds.all;
        else if (typeof (data.clouds) !== "undefined")
            clouds = data.clouds;

        var image = 0;
        if (typeof data.weather !== "undefined")
            var image = draw.getWeatherTranscription(dataWeather.id, "icon", {
                day: true
            });
        var strData = JSON.stringify(data);
        html = html.replaceAll(weatherTags.id, data.id)
            .replaceAll(weatherTags.image, image)
            .replaceAll(weatherTags.city, data.name)
            .replaceAll(weatherTags.description, (description !== "") ? description : languaje.weatherNoFound)
            .replaceAll(weatherTags.percentClouds, (isNaN(clouds) == false) ?clouds + " " + languaje.clouds : "")
            .replaceAll(weatherTags.wind, (isNaN(windSpeed) == false) ? languaje.wind(windSpeed) + " " + languaje.speed : "")
            .replaceAll(weatherTags.windDirection, (isNaN(windSpeed.lenght) == false) ? windirection + "º": "")
            .replaceAll(weatherTags.humidity, humidity)
            .replaceAll(weatherTags.pressure, pressure)
            .replaceAll(weatherTags.temperature, (isNaN(temp) == false) ? temp + languaje.degree: "")
            .replaceAll(weatherTags.temperatureMax, (isNaN(tempMax) == false) ? tempMax + languaje.degree : "")
            .replaceAll(weatherTags.temperatureMin, (isNaN(tempMin) == false) ? tempMin + languaje.degree : "")
            .replaceAll(weatherTags.data, strData)
            .replaceAll(weatherTags.sunrise, dSunrise.format("hh:mm:ss"))
            .replaceAll(weatherTags.sunset, dSunset.format("hh:mm:ss"))
            .replaceAll(weatherTags.icon, dataWeather.icon || '')
            .replaceAll(weatherTags.code, dataWeather.id);

        return html;
    },
    getWeatherTranscription: function (code, type, options) {
        var value = "";

        switch (type) {
        case "icon":
            var html = '<i class="wi wi-weather {weather} icon-{size}" style="float:left"></i>';
            var _options = $.extend({
                size: '48'
            }, options);
            html = html.replace("{weather}", draw.getWeatherImage(code))
                .replace("{size}", _options.size);

            value = html;
            break;
        case "description":
            value = getDescription(code);
            break;
        }

        return value;
    },
    getWeatherImage: function (code, day) {
        var day = "day";
        if (day == false)
            day = "night";

        var icons = [];
        icons[200] = "wi-{day}-storm-showers"; //"Tormentas con lluvia ligera";
        icons[201] = "wi-storm-showers"; //"Tormentas con lluvia";
        icons[202] = "wi-thunderstorm"; //"Tormentas con lluvia fuerte";
        icons[210] = "wi-{day}-lightning"; //"Tormentas sin precipitaciones";
        icons[211] = "wi-storm-showers"; //"Tormentas";
        icons[212] = "wi-thunderstorm"; //"Tormentas fuertes";
        icons[221] = "wi-{day}-storm-showers"; //"Tormentas dispersas";
        icons[230] = "wi-{day}-storm-showers"; //"Tormentas con lloviznas ligera";
        icons[231] = "wi-storm-showers"; //"Tormentas con lloviznas";
        icons[232] = "wi-thunderstorm"; //"Tormentas con lloviznas fuertes";

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
        icons[502] = "wi-{day}-rain-wind"; //"Lluvia moderada";
        icons[503] = "wi-rain"; //"Lluvia intensa";
        icons[504] = "wi-rain"; //"Lluvia muy fuerte";
        icons[511] = "wi-{day}-rain-mix"; //"Agua nieve";
        icons[520] = "wi-rain-mix"; //"Lluvia ligera";
        icons[521] = "wi-hail"; //"Lluvia";
        icons[522] = "wi-rain"; //"Lluvia fuerte";
        icons[531] = "wi-rain-mix"; //"Lluvia dispersa";

        icons[600] = "wi-{day}-snow-wind"; //"Nevadas ligeras";
        icons[601] = "wi-snow"; //"Nevadas";
        icons[602] = "wi-snow-wind"; //"Nevadas fuertes";
        icons[611] = "wi-{day}-rain-mix"; //"Agua nieve";
        icons[612] = "wi-{day}-rain-mix"; //"Agua nieve";
        icons[615] = "wi-{day}-rain-wind"; //"Lluvia ligera con nieve";
        icons[616] = "wi-{day}-rain-wind"; //"Lluvias y nevadas";
        icons[620] = "wi-{day}-snow-wind"; // "Nevadas ligeras";
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
        icons[802] = "wi-{day}-cloudy"; //Nubes dispersas";
        icons[803] = "wi-cloudy"; //"Muy nuboso";
        icons[804] = "wi-cloudy"; //"Nublado";

        if (typeof icons[code] !== "undefined")
            return icons[code].replace('{day}', day);
        
        return void 0;
    },
    getDescription: function (code) {
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