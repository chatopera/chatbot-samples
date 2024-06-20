/**
 * 第三方服务类
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


/**
 * 提取时间实体 
 */
async function extractTimeEntity(maestro, entities, property) {
    debug("extractTimeEntity name %s, value %s", property, entities[property]["val"])
    let dates = await maestro.extractTime(entities[property]["val"], "YYYY年MM月DD日 HH:mm");
    return dates.length > 0 ? dates[0] : "";
}

// 问候语中关联常见问题
exports.get_greetings = async function() {
    return {
        text: "机器人可以解答或提供的服务",
        params: [{
                label: "1. 海口有几个机场",
                type: "qlist",
                text: "海口有几个机场"
            },
            {
                label: "2. 我想查询天气",
                type: "qlist",
                text: "我想查询天气"
            },
            {
                label: "3. 我想预定机票",
                type: "qlist",
                text: "我想预定机票"
            }
        ]
    };
}

/**
 * 意图相关函数
 */


exports.handleAirplaneTicketOrder = async function() {

    debug("[handleAirplaneTicketOrder] this.intent", JSON.stringify(this.intent))

    let entities = _.keyBy(this.intent.entities, 'name');
    let date = await extractTimeEntity(this.maestro, entities, "date");

    this.intent.extras = {
        date: date
    }

    return {
        text: `和您确认一下信息，出发地${entities["fromPlace"]["val"]}，目的地${entities["destPlace"]["val"]}，出发时间${this.intent.extras.date}`,
        params: [{
                label: "没错，出票吧",
                type: "button",
                text: "没错，出票吧"
            },
            {
                label: "信息有误，重新预约",
                type: "button",
                text: "我想预约机票"
            },
            {
                label: "不预约了",
                type: "button",
                text: "不预约了"
            },
        ]
    }
}


exports.placeAirplaneTicketOrder = async function() {
    this.intent.drop = true;

    let entities = _.keyBy(this.intent.entities, 'name');

    return {
        text: "{CLEAR} 已帮您购买",
        params: [{
            type: 'card',
            title: "查看详情",
            thumbnail: "https://img2.baidu.com/it/u=1105387277,858129327&fm=15&fmt=auto&gp=0.jpg",
            summary: `${this.intent.extras.date}，国泰航空 CA001，国泰机场, ${entities["fromPlace"]["val"]} - ${entities["destPlace"]["val"]} `,
            hyperlink: "https://www.chatopera.com/"
        }]
    }
}

// 不预约了
exports.cancelAirplanTicketReservation = async function() {
    // 声明丢弃当前进行的意图识别对话，默认不丢弃
    this.intent.drop = true;
    return {
        text: "{CLEAR} 好的，下次再帮您预约"
    }
}

// 重新预约机票
exports.rebookAirplaneTicket = async function() {
    debug("rebookAirplaneTicket this.intent", this.intent);
    return "^topicRedirect(\"intents\", \"book_airplane_ticket\", true)"
}

exports.handleSuccAskWeather = async function() {
    debug("handleSuccAskWeather this.intent", this.intent);
    let entities = _.keyBy(this.intent.entities, 'name');
    let loc = entities["loc"]["val"];
    try {
        let result = await wf.getWeatherByCity(loc);
        debug("LOC %s result %j", loc, result);
        return loc + "天气：" + result["comf"]["txt"] + "(数据来源：和风天气)";
    } catch (e) {
        debug(e)
        return `很抱歉，没有获得${loc}的天气信息。`
    }

}

exports.handleLoseAskWeather = async function() {
    debug("handleLoseAskWeather this.intent", this.intent);
    return "未得到您的查询信息，您可以说：我想查询北京的天气。";
}
