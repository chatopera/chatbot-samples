<div align=right>

[Chatopera 云服务](https://bot.chatopera.com/)　|　[入门教程](https://docs.chatopera.com/products/chatbot-platform/tutorials/index.html)　|　[文档中心](https://docs.chatopera.com/index.html)

</div>

# Chatopera 示例程序

[GitHub](https://github.com/chatopera/chatbot-samples/) | [Gitee](https://gitee.com/chatopera/chatbot-samples)

本源码库提供多个 [**示例程序**](./projects/) 项目，基于这些项目，您可以：

- 快速掌握 Chatopera 对话机器人开发，实现智能问答，智能客服等应用；
- 以对话模板为脚手架，学习最佳实践，开发多轮对话；
- 快速掌握 Chatopera 机器人的系统集成。

## 开始阅读前

* 请完成[入门教程](https://docs.chatopera.com/products/chatbot-platform/tutorials/index.html)
* 安装并配置 Nodejs 和 Git for Windows(默认带有 Git Bash 环境)
* 了解导入导出语料，[https://docs.chatopera.com/products/chatbot-platform/howto-guides/cli-export-import.html](https://docs.chatopera.com/products/chatbot-platform/howto-guides/cli-export-import.html)

## 使用 CLI 导入示例程序

### 克隆代码

```
git clone https://github.com/chatopera/chatbot-samples.git
cd chatbot-samples
pwd # 得到代码路径 ROOT_PATH
```

### 安装 CLI

然后，执行：

```
npm install -g @chatopera/sdk
```

### 导入语料

将某个示例程序，导入到一个已有的聊天机器人。假设已经在 [https://bot.chatopera.com/dashboard](https://bot.chatopera.com/dashboard) 创建了一个聊天机器人，并获得了 ClientID 和 Secret 信息。 

接着执行下面的命令：

```
cd {{ROOT_PATH}}/GitHub工单机器人
bot env # 自动生成 .env 文件，进行修改
bot dicts --action import -f bot.dicts.json
bot faq --action import -f bot.faqs.json
bot intents --action import -f bot.intents.json
bot conversation --action import -f bot.conversations.c66
```

`{{ROOT_PATH}}` 是项目 [https://github.com/chatopera/chatbot-samples](https://github.com/chatopera/chatbot-samples) 存放的路径, 比如 `/c/Users/Administrator/chatbot-samples`。


### 导出语料
将目前机器人的语料导出为本地的语料文件。

```
cd {{ROOT_PATH}}/GitHub工单机器人
bot dicts --action export -f bot.dicts.json # 假设已经创建了 .env 文件
bot faq --action export -f bot.faqs.json
bot intents --action export -f bot.intents.json
bot conversation --action export -f bot.conversations.c66
```

## 示例程序列表

查看[示例程序](./projects)。

每个**示例程序**按照如下的结构组织。

```
根目录
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


## Tips

### 设置命令快捷方式

在 shell profile 中设置如下命令, 比如 `~/.zshrc` or `~/.bashrc`。

```
export CHATBOT_SAMPLES={{ROOT_PATH}}
# export bot files into current work dir
alias botexport="$CHATBOT_SAMPLES/bin/export.sh"
# import bot files under current work dir
alias botimport="$CHATBOT_SAMPLES/bin/import.sh"
# package conversations folder as bot.conversations.c66
alias botconpac="$CHATBOT_SAMPLES/bin/conversation.package.sh"
```

现在，使用命令 `botimport` 和 `botexport` 完成导入 BOT 和导出 BOT 的操作，比如：

```
cd projects/GitHub工单机器人
botimport # 导入语料到聊天机器人
botexport # 导出聊天机器人到语料
```

# LICENSE

[Apache 2.0](./LICENSE)

[![chatoper banner][co-banner-image]][co-url]

[co-banner-image]: ./assets/8.png
[co-url]: https://www.chatopera.com
