/**
 * Plugin
 */

var WForewast = function(apiKey) {
    if (!apiKey) throw new Error('Invalid token, get it from http://www.heweather.com/my/service');
    this.key = apiKey;
}


WForewast.prototype.getWeatherByCity = function(city) {
    return new Promise((resolve, reject) => {
        if (!city)
            return reject("城市名不能为空");
        let url = config["HEWEATHER_URL"] + "/weather?city=" + encodeURIComponent(city) + "&key=" + this.key
        http
            .get(url)
            .then((res) => {
                if (res.data.HeWeather5[0] && res.data.HeWeather5[0].suggestion) {
                    resolve(res.data.HeWeather5[0].suggestion);
                } else {
                    reject("天气建议未返回约定结果！");
                }

            })
            .catch(function(err) {
                if (err) return reject(err);
            });
    })
}

const wf = new WForewast(config["HEWEATHER_KEY"]);


exports.getWeatherByCity = function(city, cb) {
    debug("getWeatherByCity: %s", city);
    if (!city)
        throw new Error("城市名不能为空");

    wf.getWeatherByCity(city)
        .then((suggestions) => {
            cb(null, {
                text: suggestions["comf"]["txt"]
            })
        }, (err) => {
            debug("getWeatherByCity error: %j", err)
            cb(null, {
                text: `很抱歉，没有获得${city}的天气信息。`
            })
        })
}



exports.getAirByCity = function(city, cb) {
    debug("getAirByCity: %s", city);
    if (!city)
        throw new Error("城市名不能为空");

    wf.getWeatherByCity(city)
        .then((suggestions) => {
            cb(null, {
                text: suggestions["air"]["txt"]
            })
        }, (err) => {
            debug("getAirByCity error: %j", err);
            cb(null, {
                text: `很抱歉，没有获得${city}的空气信息。`
            })
        })
}


exports.getSportByCity = function(city, cb) {
    debug("getSportByCity: %s", city);
    wf.getWeatherByCity(city)
        .then((suggestions) => {
            cb(null, {
                text: suggestions["sport"]["txt"]
            })
        }, (err) => {
            debug("getSportByCity error: %j", err);
            cb(null, {
                text: `很抱歉，没有获得${city}的信息。`
            })
        })
}

exports.getDresscodeByCity = function(city, cb) {
    debug("getDresscodeByCity: %s", city);
    if (!city)
        throw new Error("城市名不能为空");

    wf.getWeatherByCity(city)
        .then((suggestions) => {
            cb(null, {
                text: suggestions["drsg"]["txt"]
            })
        }, (err) => {
            debug("getDresscodeByCity error: %j", err);
            cb(null, {
                text: `很抱歉，没有获得${city}的信息。`
            })
        })
}