var details = {
    init: function () {
        document.title = languaje.navbarTitle;
        $("#navbarTitle").html(languaje.navbarTitle);

        $("#nav-title").text(languaje.navbarTitle);

        $("#dialog-close").text(languaje.details.dialog.close);

        $("#tab-today").text(languaje.details.tab.today);
        $("#tab-byHour").text(languaje.details.tab.byHour);
        $("#tab-byDay").text(languaje.details.tab.byDay);

        var id = details.getUrlParameterByName("id");
        details._searchByIds([id]);
        details._searchForHoursById(id);
        details._searchForDaysById(id);
         $('.tooltipped').tooltip({delay: 50});
    },
    toast: function (msg) {
        var toast = toast(msg, 1500);
    },
    dialog: function (sender) {
        var attr = $(sender).attr("data-weather");
        var data = JSON.parse(attr);
        var html = draw.generateHTML(data, "detailsSmall");
        $("#weather-dialog-content").html(html);
        $('#modal').openModal();
        $('#modal').attr("data-weather", JSON.stringify(data));
    },
    getUrlParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    _searchByIds: function (ids) {
        var callback = function (data) {
            for (var x = 0; x < data.list.length; x++) {
                var _data = data.list[x];
                var html = draw.generateHTML(_data, "details");
                $("#weather-data").html(html);
                var orientation = ($("body").width() < $("body").height()) ? "v" : "h";
                $("#imgWeather").get(0).src = "resources/weather/" + orientation + "/" + _data.weather[0].id + ".jpg";
            }
        };

        openWeather.getCurrentWeatherByCityIds(ids, callback);
    },
    _searchForHoursById: function (idCity) {
        var callback = function (data) {
            var html = "";
            var strDayAnt = "";
            for (var x = 0; x < data.list.length; x++) {
                var _data = data.list[x];
                var date = new Date(0);
                date.setSeconds(_data.dt | 0);
                _data.name = date.format("hh:mm");
                var strDay = date.format("dd day yyyy");

                if (strDay != strDayAnt) {
                    strDayAnt = strDay;
                    html += '<li><a href="javascript: void(0);" data-ignore="true" class="collection-item active">' + strDay + '</a></li>';
                }

                html += draw.generateHTML(_data, "rowDetails");

            }

            $("#weather-hours-list").html(html);
        };

        openWeather.getPredictionWeatherByHour(idCity, callback);
    },
    _searchForDaysById: function (idCity) {
        var callback = function (data) {
            var html = "";
            var strDayAnt = "";
            for (var x = 0; x < data.list.length; x++) {
                var _data = data.list[x];
                var date = new Date(0);
                date.setSeconds(_data.dt | 0);
                _data.name = date.format("hh:mm");
                var strDay = date.format("dd day yyyy");

                if (strDay != strDayAnt) {
                    strDayAnt = strDay;
                    html += '<li><a href="javascript: void(0);" data-ignore="true" class="collection-item active">' + strDay + '</a></li>';
                }

                html += draw.generateHTML(_data, "rowDetails2");

            }

            $("#weather-days-list").html(html);
        };

        openWeather.getPredictionWeather(idCity, callback);
    }
}

$(function () {
    details.init();
});