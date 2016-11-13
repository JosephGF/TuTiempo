var languajeES = {
    lang: "sp",
    units: "metric",
    navbarTitle: "Tu tiempo",
    back: "atr&aacute",
    clouds: "% de nubosidad.",
    degree: "º",
    speed: "km/h",
    direction: ["Norte", "Norte-Noreste", "Noreste", "Este-Noreste", "Este", "Este-Sureste", "Sureste", "Sur-Sureste", "Sur", "Sur-Suroeste", "Suroeste", "Oeste-Suroeste", "Oeste", "Oeste-Noroeste", "Noroeste", "Norte-Noroeste"],
    weatherNoFound: "No se ha podido obtener la información meteorológica",
    gpsError: "No se ha podido obtener su ubicación",
    index: {
        cityNoValid: "Debe introducir una ciudad",
        cityNoFound: "No se ha encontrado la ciudad",
        favoritesAdded: "Ciudad añadida a favoritos",
        favoritesRemove: "Ha eliminado un favorito",
        undo: "Deshacer",
        tab: {
            cities: "Ciudades",
            map: "Mapa"
        },
        menu: {
            refresh: "Actualizar",
            config: "Configuración",
            exit: "Salir",
            searchText: "Buscar Ciudad",
        },
        dialog: {
            detail: "Detalle",
            favorites: "A Favoritos",
            cancel: "Cancelar"
        }
    },
    details :{
        tab: {
            today: "Hoy",
            byHour: "Por Hora",
            byDay: "Por Día",
        },
        dialog: {
            close: "Cerrar",
        }
    },
    wind:function(wind) {
        return (wind || 0) * 3.6;
    }
}

var languaje = languajeES;
Date.prototype.DAYNAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
Date.prototype.MONTHNAMES = ["Enero", "Febrero", "Marzo", "Abríl", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];