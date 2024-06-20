class WForewast {
    constructor(apiKey) {
        if (!apiKey)
            throw new Error(
                'Invalid token, get it from http://www.heweather.com/my/service'
            );
        this.apiKey = apiKey;
    }

    async getCity(cityName) {
        let res = await http.get('https://geoapi.qweather.com/v2/city/lookup', {
            params: {
                key: this.apiKey,
                location: cityName
            },
        });

        return res.data;
    }

    async getWeatherNow(locationId) {
        let res = await http.get('https://devapi.qweather.com/v7/weather/now', {
            params: {
                key: this.apiKey,
                location: locationId
            },
        });

        return res.data;
    }

    async getWeatherByCity(cityName) {
        let {
            location
        } = await this.getCity(cityName);
        let city = location && location[0];
        if (city) {
            let {
                now
            } = await this.getWeatherNow(city.id);
            return `现在${city.name}天气「${now.text} ${now.windDir}」`;
        } else {
            return '没有相关城市信息';
        }
    }
}

const wf = new WForewast(config["HEWEATHER_KEY"]);

exports.getWeatherByCity = wf.getWeatherByCity.bind(wf);