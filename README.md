<div align=right>

[Chatopera 云服务](https://bot.chatopera.com/)　|　[入门教程](https://docs.chatopera.com/products/chatbot-platform/tutorials/index.html)　|　[文档中心](https://docs.chatopera.com/index.html)

</div>

# Chatopera 对话模板

本源码库提供多个 **对话模板** 项目，基于这些项目，您可以：

- 快速掌握 Chatopera 对话机器人开发，实现智能问答，智能客服等应用；
  以对话模板为脚手架，学习最佳实践，开发多轮对话；

- 快速掌握 Chatopera 机器人的系统集成。

## 开始阅读前，请完成

确保您已经完成新手任务！！！很简单的，40 分钟内，即可按照提示，一步步完成，以节省您的时间！少走弯路！

[新手任务：使用入门教程一步步实现智能对话机器人](https://docs.chatopera.com/products/chatbot-platform/tutorials/index.html)

## 使用 CLI 导入

安装并配置 Chatopera CLI -

[https://docs.chatopera.com/products/chatbot-platform/howto-guides/cli-export-import.html](https://docs.chatopera.com/products/chatbot-platform/howto-guides/cli-export-import.html)

### TL; DR

首先，安装 Nodejs 和 Git for Windows(默认带有 Git Bash 环境)。

然后，执行：

```
npm install -g @chatopera/sdk
```

接着, 在 shell profile 中设置如下命令, 比如 `~/.zshrc` or `~/.bashrc`。

```
export CHATBOT_SAMPLES=YOUR_CLONED_PLACE
# export bot files into current work dir
alias botexport="$CHATBOT_SAMPLES/bin/export.sh"
# import bot files under current work dir
alias botimport="$CHATBOT_SAMPLES/bin/import.sh"
# package conversations folder as bot.conversations.c66
alias botconpac="$CHATBOT_SAMPLES/bin/conversation.package.sh"
```

`CHATBOT_SAMPLES` 是项目 [https://github.com/chatopera/chatbot-samples](https://github.com/chatopera/chatbot-samples) 存放的路径, 比如 `/c/Users/Administrator/chatopera/chatbot-samples`。

现在，使用命令 `botimport` 和 `botexport` 完成导入 BOT 和导出 BOT 的操作, 比如

```
cd projects/GitHub工单机器人
botimport
```

更多关于导入和导出的介绍 -

[https://docs.chatopera.com/products/chatbot-platform/howto-guides/cli-export-import.html](https://docs.chatopera.com/products/chatbot-platform/howto-guides/cli-export-import.html)

## 模板目录

| 程序             | 语言  | 位置                                                              | 功能                                                                                                                       |
| ---------------- | ----- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| FeishuWeatherBot | zh_CN | [projects/FeishuWeatherBot](./projects/FeishuWeatherBot)          | [Chatopera 飞书应用](https://chatopera.feishu.cn/docs/doccnnLcv5AuenV1HHSvgVWbJmd)示例程序，一个能回答天气情况的飞书机器人 |
| GuessNumber      | en_US | [projects/GuessNumber](./projects/GuessNumber)                    | 小游戏， Guess the secret number in the bot's hat.                                                                         |
| 预定机票         | zh_CN | [projects/预定机票](./projects/预定机票)                          | 预约飞机票，查询天气                                                                                                                   |
| 招聘面试         | zh_CN | [projects/招聘面试](./projects/招聘面试)                          | 进行工作面试：提问技能知识、评估性格和心理素质，发送邮件报告面试过程。                                                     |
| 小笑话           | zh_CN | [projects/小笑话](./projects/小笑话)                              | 发送“笑话”，机器人返回一个笑话，逗您一乐。                                                                                 |

查看[所有模板](./projects)。

**对话模板**目录结构

```
模板根目录
├── README.md                  # 模板描述文件
├── bot.dicts.json             # 词典导入文件，包括引用词典、词汇表词典和正则表达式词典
├── bot.faqs.json              # 知识库导入文件，包括标准问、扩展问、分类等
├── bot.intents.json           # 意图识别导入文件，包含意图、说法、槽位等
├── bot.conversations.c66      # 多轮对话导入文件，包含脚本、函数等
├── conversations              # 多轮对话文件解压后的内容，.c66 文件是 zip 压缩包
├── flow.mdj                   # UML 对话流程文件，描述对话流程
└── flow.xlsx                  # Excel 话术文件，描述对话流程
```

## 工单

有关 [chatopera/chatbot-samples](https://github.com/chatopera/chatbot-samples) 的工单，提交到 -

[https://github.com/chatopera/docs/issues?q=label%3ASamples](https://github.com/chatopera/docs/issues?q=label%3ASamples)

# LICENSE

[Apache 2.0](./LICENSE)

[![chatoper banner][co-banner-image]][co-url]

[co-banner-image]: ./assets/8.png
[co-url]: https://www.chatopera.com
