# Achieves

## 模板目录

| 程序             | 语言  | 位置                                                              | 功能                                                                                                                       |
| ---------------- | ----- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 天气查询         | zh_CN | [projects/天气查询](./projects/天气查询)                          | 实现一个能回答天气情况的聊天机器人                                                                                         |
| 活动通知         | zh_CN | [projects/活动通知](./projects/活动通知)                          | 实现一个能通知用户展会活动的聊天机器人                                                                                     |
| 闲聊             | zh_CN | [projects/闲聊](./projects/闲聊)                                  | 闲聊，寒暄，6，000+ 条对话语料，修改 [faq.json](projects/闲聊/faq.json) 追加                                               |
| FeishuDevops     | zh_CN | [chatopera.feishu](https://github.com/chatopera/chatopera.feishu) | 飞书(Lark) Custom App, 集成 GitLab 实现 DevOps Issue 管理                                                                  |

# 建模工具

在实现聊天机器人前，尤其是多轮对话，完成一个任务，要先考虑好它的对话流程。然后再根据 [Chatopera 机器人平台](https://bot.chatopera.com) 提供的知识库、多轮对话和意图识别模块进行实现。

在对话模板中，我们提供两种类型的，完成建模任务的方案。

## Excel

查看使用 Excel 形式描述的话术建模文件，在对话模板项目中打开 `flow.xlsx`。

比如，[活动通知话术模板 Excel 文件](./projects/活动通知)。

## UML 流程图

对话模板中，有的带有[对话流程的建模项目]，即以"`.mdj`"结尾的文件，通常被命名为 `flow.mdj`，使用 StarUML 可以打开项目。

比如，一个对话流程图示例：[活动通知](./projects/活动通知)。

![](./assets/6.png)

对话流程借鉴 UML Activity Diagram 建模，[入门参考文档](https://chatopera.blog.csdn.net/article/details/108133764)，内附元素定义、StarUML 软件下载等。