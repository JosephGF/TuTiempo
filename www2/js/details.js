var details = {
	init : function() {
		document.title = languaje.navbarTitle;
		$("#navbarTitle").html(languaje.navbarTitle);
		
		var id = details.getUrlParameterByName("id");
		details._searchByIds([id]);
		details._searchForHoursById(id);
		details._searchForDaysById(id);
	},
	toast : function(msg) {
	 var toast = new fries.Toast({ content: msg, duration: 2000 });
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
		var html = draw.generateHTML(JSON.parse(attr), "detailsSmall");
		$("#weather-dialog-content").html(html);
		dialog.show();
	},
	getUrlParameterByName : function (name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	_searchByIds: function(ids) {
		var callback = function(data) {
			for (var x = 0; x < data.list.length; x++) {
				var _data = data.list[x];
				var html = draw.generateHTML(_data, "details");
				$("#weather-data").html(html);
			}
		};
		
		openWeather.getCurrentWeatherByCityIds(ids, callback);
	},
	_searchForHoursById : function(idCity) {
		var callback = function(data) {
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
					html += '<li class="list-item-single-line list-item-title"><a href="javascript: void(0);" data-ignore="true">'+strDay+'</a></li>';
				}
					
				html += draw.generateHTML(_data, "rowDetails");
				
			}
			
			$("#weather-hours-list").html(html);
		};
		
		openWeather.getPredictionWeatherByHour(idCity, callback);
	},
	_searchForDaysById: function(idCity) {
		var callback = function(data) {
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
					html += '<li class="list-item-single-line list-item-title"><a href="javascript: void(0);" data-ignore="true">'+strDay+'</a></li>';
				}
					
				html += draw.generateHTML(_data, "rowDetails2");
				
			}
			
			$("#weather-days-list").html(html);
		};
		
		openWeather.getPredictionWeather(idCity, callback);
	}
}

$(function() { details.init(); } );