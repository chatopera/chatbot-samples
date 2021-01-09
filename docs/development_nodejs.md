## 基于 Node.js 开发

[Node.js](https://nodejs.org/download/) 是一个 JavaScript 运行时环境，基于 Node.js 可以快速开发后端或前段应用。 Chatopera 支持使用 **多轮对话编辑器** 或 [Node.js](https://nodejs.org/download/)环境下调试多轮对话，导入对话模板作为示例项目、脚手架项目。

**多轮对话编辑器** 使用更方便，但是基于[Node.js](https://nodejs.org/download/)的开发环境，对于 Node.js 用户或软件开发者更友好。

在 Node.js 开发下，除了安装 Node.js 外，还需要

- 文本编辑器，比如 [Visual Code Studio](https://code.visualstudio.com/)，[Sublime Text](https://www.sublimetext.com/)，etc。

- Git

- 命令行控制台，Bash: Git Bash, Windows 用户; Terminal, Mac 用户；Linux Shell。

`命令行控制台`就是 Linux Shell 工具，Mac 下内置 Terminal，可以安装 [iterm2](https://www.iterm2.com/)。

### 下载代码

```
git@github.com:chatopera/chatbot-samples.git
```

### 配置

基于 Node.js 开发时，配置机器人连接信息。

```
cd projects/示例机器人项目
cp sample.env .env # 编辑 .env 文件
```

修改 `.env` 文件。

| key                | default                   | description                            |
| ------------------ | ------------------------- | -------------------------------------- |
| BOT_PROVIDER       | https://bot.chatopera.com | BOT 服务地址                           |
| BOT_CLIENT_ID      | 无默认，必填              | 从 PROVIDER 创建机器人，获得           |
| BOT_CLIENT_SECRET  | 无默认，必填              | 从 PROVIDER 创建机器人，获得           |
| BOT_USERNAME       | testuser                  | 测试对话的用户                         |
| BOT_FAQ_BEST_REPLY | 0.8                       | 知识库最佳回复阀值                     |
| BOT_FAQ_SUGG_REPLY | 0.6                       | 知识库建议回复阀值                     |
| BOT_TRACE_LEVEL    | DEBUG                     | trace 跟踪服务器端机器人，日志输出级别 |

### 部署

```
scripts/deploy.sh 文件夹名
```

将部署文件夹的内容，使用 .env 文件中的远程机器人配置信息。

### 对话

```
scripts/chat.sh 文件夹名
```

将启动聊天窗口，使用 .env 文件中的远程机器人配置信息。

### 查看日志

调试脚本/函数过程中，实时查看日志，日志信息包括：脚本部署更新情况；函数中 debug 的输出。

```
scripts/trace.sh 文件夹名
```

将启动日志窗口，使用 .env 文件中的远程机器人配置信息。

### 打包

```
scripts/archive.sh 文件夹名
```

将打包文件夹内的 `botarchive`。

打包后得到.c66 文件，在**聊天机器人多轮对话控制台**上传。

### 撰写脚本和函数

更新 `botarchive` 下的脚本和函数文件，实现对话逻辑。

教程和语法参考[文档中心：多轮对话](https://docs.chatopera.com/products/chatbot-platform/conversation/index.html)。

返回[文档根页面](../)。
