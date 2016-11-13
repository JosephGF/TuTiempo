var mapa = {
    map: null,
    bannerMap: null,
    create: function (div, iniLayers, options) {
        var _options = { /*minZoom: 3*/
            zoom: 5,
            layers: iniLayers,
            center: [40.10, -3.07],
            attributionControl: false
        };
        _options = $.extend(_options, options);

        var divMap = document.getElementById(div);
        divMap.style.display = "block";

        mapa.map = L.map(div, _options);
        mapa.map.setMaxBounds([[84.67351256610522, -174.0234375], [-58.995311187950925, 223.2421875]]);

        //divMap.style.visibility = "visible";
        //divMap.style.display = "none";
        return mapa.map;
    },
    addMarker: function (lat, lng, iconURL, options, onClickEvent) {
        var marker = mapa.createMarker(lat, lng, iconURL, options, onClickEvent);
        marker.addTo(mapa.map);
        return marker;
    },
    addMarkers: function (markers) {
        var markersGroup = L.layerGroup(markers);
        mapa.addLayer(markersGroup);
        return markersGroup;
    },
    createMarker: function (lat, lng, html, options /*, onClickEvent*/ ) {
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

        var point = L.latLng(lat, lng);
        var _options = {
            icon: icon
        };
        _options = $.extend(_options, options);
        var marker = L.marker(point, _options);
        //.bindPopup('<iframe style="border-style:none" src="http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&mode=html&lang=sp"></iframe>')
        //.openPopup();

        //marker.on('click', onMarkerClick);
        return marker;
    },
    setCenter: function (lat, lng) {
        mapa.map.setView(L.latLng(lat, lng));
    },
    setZoom: function (zoom) {
        mapa.map.setZoom(zoom);
    },
    getZoom: function () {
        return mapa.map.getZoom();
    },
    createLayer: function (url, options) {
        var _options = {
            attribution: "",
            maxZoom: 15,
            opacity: 1
        };

        _options = $.extend(_options, options);
        return L.tileLayer(url, _options);
    },
    addLayersControl: function (baseLayers, overLayers) {
        var control = L.control.layers(baseLayers, overLayers, {
            position: 'bottomright'
        });
        control.addTo(mapa.map);

        return control;
    },
    addLayer: function (layer) {
        mapa.map.addLayer(layer);
    },
    removeLayer: function (layer) {
        mapa.map.removeLayer(layer);
    },
    getBounds: function () {
        return mapa.map.getBounds();
    },
    getLocation: function () {
        var layer = L.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            minZoom: 1,
            maxZoom: 8,
            format: 'jpg',
            time:'',
            tilematrixset: 'GoogleMapsCompatible_Level'
        });
        /*var layer = L.tileLayer('http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
            subdomains: '1234'
        });*/
        var _options = { 
            zoom: 5,
            layers: [layer],
            center: [40.10, -3.07],
            zoomControl: false,
            attributionControl: false,
        };
        mapa.bannerMap = L.map("location-map", _options);

        var callbackLocation = function (location) {
            var callbackWeatherData = function (item) {
                var html = draw.generateHTML(item, "location");
                $("#div-weathrer-location").append(html);
            }

            var icon = L.icon({
                iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE+klEQVRYR7VXbWyTVRS+59y2b9etDBAYtp0YwlCcfOgkox0aPgZhbWJEIxqjP4iJ+gODJioaNZJoRGPAxEiM/uCHCUH8oSHQVpCvZK4b4LIIYYBTGdJ9KA4otFvX9t5j7jveUfBt+xb1/Lv3Ps85zz333HPfF1gZdrG5uXrYPvwUMGgBRgskwnRFR0mDhNBFJCMjQxd21B355YpVt2AFSA0N9oFpzlcJ2QYEmFCMI0gmQLJNnmhsMzCWK+W/pICeB++b6qpy7UIO/lLO8teJqDWRHlo958DpoWK8ogLOhRZPsklqRQ715QQ3sFKI4xXZyocm79+fKMQvKiAeCuzhgKF8spCSXUqPsmQmy0alYEDAHBxZleZgkzSNcbzRJRF96wm3PVq2gHhw0RqOtp35xFQmxwZSSSYkmfrjAMzjrmQuu/2GdSnlI95IbJcZqWAG4qHAcQ441yCN5HLsfCLJiI0FJ6IhyWQMJQNCDCDAZDUPDNgd1W7mtPHxeESs0xP+4QHLAs6uWLjAqWldBkGF7L18hWWE0Kck0ZZzg91vru1laTX+2ueruM3r3sQR16uxxjm7s3qCUjNuGZGtnxE90n2zCNMMxINNL3OELQZYnXff1aQRfPuyju6nzXZzqHHODkB8Uq35JlSxyryjkFKs80bat1oS0B/yfw7AnzPAf6aG9cJTls2IeSs6T58wE7BvYd0Ch82hZ25yhZNNdVWMwyTRp95w24uWBMSDTTs5whoD3J9MsqujWX14uP2kfWOBBrORMdsSf70OdGsO5qmqzKsD2u4Jt/0jc6ZH0B/0fwnInzHYg6kUS6Qz+jCdSXpWdZ4bMMvA7vmzvW6XPa7WJjodrKbyugBJcps3HHvWUgb6goGNiPiOAb6czrA/UqmxGhDytWVHT31kJuBg491vIPL31dr0Kher1rRxmJDybV8k9p4lAb+3NK60c/teAyyJ2K+XEqr6mSQ5IkmGmo+cOZTvbN/C2cvtaNsDCE4EYDMnVTPVFwwTQi73RWMHLQnQH5/pWh8ATjUIqghVMSoTRBIk7STGdIeArJkYPM4BUI1rKl1sovP67iWJQU+4vdbscSrciIKBtzjiu/mK82+D2RGouZur/9qxve6Nxj404xQU8GNDg8tT4zwFCHfkE1VP+Gt4hI1ea0rGmmo+U1wVrMpxcxsWZ3/uHrhnaW+v3rQsHYEB6mtZ9ARy21dmRNUVM0Lq3c6BXH+QzCyXyz1W+13HN4UyVvJ7oL+lqRU4LC7koNi8IDrsC7ctLYYpLSC0uIEYHUPIK2kLaqQkSSJ7v2/v0Z/+lQBF7msJbEOOay3EHYcQiS884fbnS3FKZkA5+G35vTWaVt2DCO5SDseuqUyMXBmpq2vtulAKb0nAtSxsQI4flHKoCxDyFV80ttkK1rKAyKxZ2ry7pnVzwJnFHEsSPZ7BTD10do69XiXMsgDl5/wq/2qbjRe8UgojRe5hb7Rjd6nAxnpZAhQpHgwc4IjLzAJISd97I20rrQZXuLIFnG/2z0UHdCHi9Y8+tXMpRU5k58/Ye+zk/ypAOe9vafoMOLyQHygnaWttpG1dOcFvKQOKdGZJwxS3S+sBxIlqTCQvJdIX60r9BZmJK/sIDCfxFv9LnPOP9cKTcr03Evuk3N3fcgb0XatvhhrnCQYkbw/H5ln5Ef1PMzB2LRuDDIBqox3RW9m94vwNduXoMPbL/7cAAAAASUVORK5CYII=',
                clickable: false,
                iconSize: [32, 32],
                iconAnchor: [32, 32],

            });

            L.marker([location.coords.latitude, location.coords.longitude], {
                icon: icon
            }).addTo(mapa.bannerMap)
            mapa.bannerMap.panTo(new L.LatLng(location.coords.latitude, location.coords.longitude));

            openWeather.getCurrentWeatherByLatLng(location.coords.latitude, location.coords.longitude, callbackWeatherData);

        }
        var callbackError = function (e) {
                var html = draw.generateHTML({name:languaje.gpsError }, "location");
                $("#div-weathrer-location").append(html)
        }

        var _options = {
            frequency: 50000,
            maximumAge: 300000,
            timeout: 500000,
            enableHighAccuracy: true
        };

        navigator.geolocation.getCurrentPosition(callbackLocation, callbackError, _options);
    }
}