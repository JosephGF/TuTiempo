var index = {
    init: function () {
        document.title = languaje.navbarTitle;
        $("#nav-title").text(languaje.navbarTitle);
        $("#tab-cities").text(languaje.index.tab.cities);
        $("#tab-map").text(languaje.index.tab.map);
        
        $("#menu-exit").text(languaje.index.menu.exit);
        $("#menu-config").text(languaje.index.menu.config);
        $("#menu-refresh").text(languaje.index.menu.refresh);
        $("#menu-search").attr("placeholder", languaje.index.menu.searchText);
        $("#menu-search-movil").attr("placeholder", languaje.index.menu.searchText);
        
        $("#dialog-detail").text(languaje.index.dialog.detail);
        $("#dialog-favorites").text(languaje.index.dialog.favorites);
        $("#dialog-cancel").text(languaje.index.dialog.cancel);
        
        $("#navbarTitle").html(languaje.navbarTitle);
        //index._searchByIds([2520413, 2521978]);
        index._searchByIds(favorites.getIdsArray());
        index.loadMap();
        mapa.getLocation()
    },
    loadMap: function () {
        var _lOpenStreetMap = mapa.createLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            noWrap: true,
        });

        var _lOpenCycleMap = mapa.createLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });

        var opacity = 0.5,
            attribution = 'Map data © OpenWeatherMap',
            maxZoom = 18;
        var _lPrecipitation = mapa.createLayer('http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png', {
            attribution: attribution,
            maxZoom: maxZoom,
            opacity: opacity
        });

        var _lSnow = mapa.createLayer('http://{s}.tile.openweathermap.org/map/snow/{z}/{x}/{y}.png', {
            attribution: attribution,
            maxZoom: maxZoom,
            opacity: opacity,
            legend: 'http://openweathermap.org/img/a/SN.png'
        });

        var _lClouds = mapa.createLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
            attribution: attribution,
            maxZoom: maxZoom,
            opacity: opacity,
            legend: 'http://openweathermap.org/img/a/NT.png'
        });

        var _lPressure = mapa.createLayer('http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png', {
            attribution: attribution,
            maxZoom: maxZoom,
            opacity: 0.3,
            legend: 'http://openweathermap.org/img/a/PN.png'
        });

        var _lPressureBars = mapa.createLayer('http://{s}.tile.openweathermap.org/map/pressure_cntr/{z}/{x}/{y}.png', {
            attribution: attribution,
            maxZoom: maxZoom,
            opacity: 0.3
        });

        var _lWind = mapa.createLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png', {
            attribution: attribution,
            maxZoom: maxZoom,
            opacity: 0.3,
            legend: 'http://openweathermap.org/img/a/UV.png'
        });

        var _lTemp = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png', {
            attribution: attribution,
            maxZoom: maxZoom,
            opacity: 0.3,
            legend: 'http://openweathermap.org/img/a/TT.png'
        });

        var baseLayers = {
            Mapa: _lOpenStreetMap,
            Relieve: _lOpenCycleMap
        };
        var overLayers = {
            Precipitaciones: _lPrecipitation,
            Nevadas: _lSnow,
            Nubes: _lClouds,
            Presion: _lPressure,
            Isobaras: _lPressureBars,
            Viento: _lWind,
            Temperatura: _lTemp
        };



        var map = mapa.create('map', [_lOpenStreetMap], {
            zoomControl: false
        });
        //mapa.map.on('click', function(e) { $('#pnInfo').fadeOut(); });
        mapa.map.on('moveend', index._searchByCurrentRegion);
        mapa.map.on('zoomlevelschange', index._searchByCurrentRegion);
        //mapa.map.on('layeradd', openWeather.showLegend);
        //mapa.map.on('layerremove', openWeather.showLegend);
        mapa.addLayersControl(baseLayers, overLayers);

        $(".leaflet-control-layers-toggle").addClass("btn-floating btn-large waves-effect waves-light red");
        $(".leaflet-control-layers").css({
            backgroundColor: 'transparent',
            borderRadius: '0',
            boxShadow: '0 0px 0px rgba(0,0,0,0.0)'
        });
        index._searchByCurrentRegion();
        //mapa.map = new L.Map('map');
        //mapa.map.addControl( L.control.zoom( {position: 'bottomeleft'}));
    },
    search: function (id) {
        var value = $("#" + id).val();
        if (value.length == 0) {
            alert(languaje.index.cityNoValid);
            return false;
        }

        index._searchByName(value);
    },
    _searchByCurrentRegion: function () {
        var callback = function (list) {
            var markers = [];

            for (var x = 0; x < list.list.length; x++) {
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
    _searchByIds: function (ids) {
        var callback = function (data) {
            for (var x = 0; x < data.list.length; x++) {
                var _data = data.list[x];
                var html = draw.generateHTML(_data, "card");
                $("#div-favorites").append(html);
            }
        }

        openWeather.getCurrentWeatherByCityIds(ids, callback);
    },
    _searchByName: function (name) {
        var callback = function (data) {
            if (data.cod == "404") {
                alert(languaje.index.cityNoFound + " '" + data.name + "'.");
                return false;
            }
            
            mapa.setCenter(data.coord.lat, data.coord.lon);
            mapa.setZoom(12);
            index.dialog(data);
        }

        openWeather.getCurrentWeatherByCity(name, callback);
    },
    _serachForNextHours: function (idCity) {
        var callback = function (data) {
            for (var x = 0; x < data.list.length; x++) {
                var _data = data.list[x];
            }
            alert("En construcción");
        }

        openWeather.getPredictionWeatherByHour(idCity, callback);

    },
    _searchForNextDays: function (idCity) {
        var callback = function (data) {
            for (var x = 0; x < data.list.length; x++) {
                var _data = data.list[x];
            }
            alert("En construcción");
        }

        openWeather.getPredictionWeather(idCity, callback);
    },
    _markerClick: function (e) {
        var data = this.data;
        index.dialog(data);
    },
    dialog: function (sender) {
        var data = sender;
        if (sender instanceof Element) {
            var attr = $(sender).attr("data-weather");
            var data = JSON.parse(attr);
        }
        var html = draw.generateHTML(data, "detailsSmall");
        $("#weather-dialog-content").html(html);
        $('#modal').openModal();
        $('#modal').attr("data-weather", JSON.stringify(data));
    },
    dialogCallback: function (sender, e) {
        var attr = $('#modal').attr("data-weather");
        var data = JSON.parse(attr);

        switch (e) {
        case "details":
            location.href = "details.html?id=" + data.id;
            break;
        case "favourite":
            //favorites.add(data);

            var html = draw.generateHTML(data, "card");
            $("#div-favorites").append(html);
            favorites.add(data);
            toast('<span>' + languaje.index.favoritesAdded + '</span>', 5000);
            break;
        }


        $('#modal').closeModal();
    },
    deleteFavorite: function (id) {
        $("#card-" + id).fadeOut("hide", function (e) {
            toast('<span>' + languaje.index.favoritesRemove + '</span>\
                    <a class="btn-flat yellow-text" href="#" onclick="$(\'#card-' + id + '\').fadeIn();\
                    $(\'.toast\').first().css(\'visibility\', \'hidden\');">'+ languaje.index.undo+'<a>',
                3000, '',
                function (e, i) {
                    if (!$("#card-" + id).is(":visible"))
                        $("#card-" + id).remove();
                
                    favorites.remove({id:id, name:"current"});
                });
            // Animation complete.
        });
        event.stopPropagation(); return false;
    }
}

$(function () {
    index.init();
});