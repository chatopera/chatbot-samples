// 问候语中关联常见问题
// 更多消息格式，参考 https://dwz.chatopera.com/jQ0F9G
exports.getGreetings = async function() {
    let data = [{
            "post": "冰箱不制冷问题的处理方法"
        },
        {
            "post": "机器出现故障代码怎么办"
        }, {
            "post": "空调噪音大问题的处理方法"
        }, {
            "post": "冰箱噪音问题的处理方法"
        }, {
            "post": "空调不制冷问题的处理方法"
        }
    ]
    debug("getHotFAQs %j", data)

    if (data.length > 0) {
        let params = [];
        let postIndex = 0;
        for (let x of data) {
            // 跳过 FAQ 中约定的内部命令
            if (!x["post"].startsWith("__")) {
                params.push({
                    label: (++postIndex).toString() + ". " + x["post"],
                    type: "qlist",
                    text: x["post"]
                });
            }
        }

        if (params.length > 0) {
            return {
                text: "猜你想问",
                params: params
            };
        } else {
            return {
                string: ""
            };
        }
    } else {
        return {
            string: ""
        };
    }
}

exports.askMoreBingXiangBuZhiLeng = async function() {

    return {
        text: "请问您的冰箱哪个位置不制冷？",
        params: [{
            label: "冰箱冷藏不制冷",
            type: "button",
            text: "冰箱冷藏不制冷"
        }, {
            label: "冰箱冷冻/整体不制冷",
            type: "button",
            text: "冰箱整体不制冷"
        }, ]
    }
}


exports.askMoreBingXiangLengCangBuZhiLeng = async function() {
    return {
        text: "若冰箱冷藏不制冷，请问您的产品是带显示屏的还是不带显示屏的？（是否有显示温度的电子屏幕)？",
        params: [{
                label: "不带显示屏【机械式】",
                type: "button",
                text: "不带显示屏【机械式】"
            },
            {
                label: "带显示屏【电脑式】",
                type: "button",
                text: "带显示屏【电脑式】"
            }
        ]
    }
}

exports.askMoreBingXiangLengCangBuZhiLengJiXieSHi = async function() {

    return {
        text: "请您看一下显示屏上是否有假日功能（屏幕上是否有小伞图标或文字“假日”或显示“-”）？",
        params: [{
                label: "无假日功能",
                type: "button",
                text: "无假日功能"
            },
            {
                label: "有假日功能",
                type: "button",
                text: "有假日功能"
            }
        ]
    }

}

exports.askMoreBingXiangLengCangBuZhiLengDianNaoSHi = async function() {
    return {
        text: "请您看一下显示屏上是否有假日功能（屏幕上是否有小伞图标或文字“假日”或显示“-”）？",
        params: [{
                label: "无假日功能",
                type: "button",
                text: "无假日功能"
            },
            {
                label: "有假日功能",
                type: "button",
                text: "有假日功能"
            }
        ]
    }
}

// 冰箱冷藏不制冷，机械式，无假日功能
exports.askBingXiangBuZhiLengJiXieShiWujiari = async function() {
    let results = await this.maestro.searchFAQs("冰箱冷藏不制冷，机械式，无假日功能", 1);

    return {
        text: results[0]["replies"][0]["content"],
        params: [{
            label: "继续提交工单",
            type: "button",
            text: "继续提交工单"
        }]
    }
}


// 冰箱冷藏不制冷，机械式，有假日功能
exports.askBingXiangBuZhiLengJiXieShiYoujiari = async function() {
    let results = await this.maestro.searchFAQs("冰箱冷藏不制冷，机械式，无假日功能", 1);

    return {
        text: results[0]["replies"][0]["content"],
        params: [{
            label: "继续提交工单",
            type: "button",
            text: "继续提交工单"
        }]
    }
}

// 冰箱冷藏不制冷，电脑式，无假日功能
exports.askBingXiangBuZhiLengDianNaoShiWujiari = async function() {
    let results = await this.maestro.searchFAQs("冰箱冷藏不制冷，机械式，无假日功能", 1);

    return {
        text: results[0]["replies"][0]["content"],
        params: [{
            label: "继续提交工单",
            type: "button",
            text: "继续提交工单"
        }]
    }
}

// 冰箱冷藏不制冷，电脑式，有假日功能
exports.askBingXiangBuZhiLengDianNaoShiYoujiari = async function() {
    let results = await this.maestro.searchFAQs("冰箱冷藏不制冷，机械式，无假日功能", 1);

    return {
        text: results[0]["replies"][0]["content"],
        params: [{
            label: "继续提交工单",
            type: "button",
            text: "继续提交工单"
        }]
    }
}

// 冰箱整体不制冷
exports.askMoreBingXiangZhengtiBuZhiLeng = async function() {
    return {
        text: "{CLEAR} 图文消息",
        params: [{
            type: 'card',
            title: "提交工单",
            thumbnail: "https://www.chatopera.com/files/botsamples/imgs/workorder_icon.png",
            summary: "冰箱售后报修",
            hyperlink: "https://chatopera.feishu.cn/share/base/form/shrcnqGXHjqdHYBTsikYBz6XI8f"
        }]
    }

}
