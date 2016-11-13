var favorites = new function () {
    this._key = "favorites";
    this.list = [];
    this.getIdsArray = function () {
        var ids = [];
        for (var i = 0; i < this.list.length; i++) {
            ids.push(this.list[i].id);
        }

        return ids;
    };
    this.getNamesArray = function () {
        var names = [];
        for (var i = 0; i < this.list.length; i++) {
            names.push(this.list[i].name);
        }

        return names;
    };
    this.load = function () {
        var strData = localStorage.getItem(this._key);
        if (typeof (strData) !== "undefined" && strData != null) {
            this.list = JSON.parse(strData);
        }
        return this;
    };
    this.save = function () {
        var strData = JSON.stringify(this.list);
        localStorage.setItem(this._key, strData);
        return this;
    };

    this.remove = function (data) {
        if (this.validate(data)) {
            for (var i = 0; i < this.list.length; i++) {
                if (data.id == this.list[i].id) {
                    this.list.splice(i, 1);
                    return this.save();
                }
            }
        }
        return this;
    };

    this.add = function (data) {
        if (this.validate(data)) {
            var exists = false;
            for (var i = 0; i < this.list.length; i++) {
                if (data.id == this.list[i].id) {
                    exists = true;
                    continue;
                }
            }

            if (!exists)
                this.list.push(data);

            this.save();
        }
        return this;
    };

    this.validate = function (data) {
        return ((typeof (data.id) !== "undefined") && (typeof (data.name) !== "undefined"))
    };

    this.load();
}