var languajeEN = {
    lang: "en",
    units: "imperial",
    navbarTitle: "Your Time",
    back: "back",
    clouds: "% clouds.",
    degree: "ºF",
    speed: "m/s",
    direction: ["North", "North-Northeast", "Northeast", "East-Northeast", "East", "East-Sureste", "Southeast", "South-Southeast", "South", "South-Southwest", "Southwest", "West-Southwest", "West", "West-Northweste", "Northwest", "North-Northwest"],
    weatherNoFound: "Can't get weather info",
    gpsError: "Can't get your location",
    index: {
        cityNoValid: "Can input any city",
        cityNoFound: "Not found city",
        favoritesAdded: "City added to favourites",
        favoritesRemove: "favourite removed",
        undo: "Undo",
        tab: {
            cities: "Cities",
            map: "Map"
        },
        menu: {
            refresh: "Refresh",
            config: "Config",
            exit: "Exit",
            searchText: "Search City",
        },
        dialog: {
            detail: "Detail",
            favorites: "To Favourites",
            cancel: "Cancel"
        }
    },
    details :{
        tab: {
            today: "Today",
            byHour: "By Hour",
            byDay: "By Day",
        },
        dialog: {
            close: "Close",
        }
    },
    wind:function(wind) { return wind; }
}

var languaje = languajeEN;
Date.prototype.DAYNAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
Date.prototype.MONTHNAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];