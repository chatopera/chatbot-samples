+ 今天 *(2-5) 天气 [怎么样]
- {keep} ^getWeatherByCity(<cap1>)


// 私聊绑定自定义提示
+ __kick_off_feishu_private
- {keep} 成功绑定飞书私聊机器人，请发送「今天xxx天气怎么样」查询天气。\n例：今天北京天气怎么样

// 群聊绑定自定义提示
+ __kick_off_feishu_group
- {keep} 成功绑定飞书群机器人，请 @Chatopera 并发送「今天xxx天气怎么样」查询天气。\n例：今天北京天气怎么样