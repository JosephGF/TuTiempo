var cfg = new function () {
    var _default = {
        units: "imperial",
        degree: "ºF",
        speed: "m/s",
        theme: "2",
        icons: "resources\\Themes\\",
        direction: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
    };
    this.save = function () {
        localStorage["cfg"] = JSON.stringify(configurtation);
    };
    this.load = function () {
        return (typeof localStorage["cfg"] !== "string") ? _default : JSON.parse(localStorage["cfg"]);
    };
};

var configurtation = cfg.load();