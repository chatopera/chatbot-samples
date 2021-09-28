/**
 * Utilities
 */

function base64key(txt) {
    return (new Buffer(txt)).toString('base64');
}


function issueTitleKey(userId) {
    let keyprefix = base64key(userId);
    return keyprefix + ":openissue:title";
}


function issueBodyKey(userId) {
    let keyprefix = base64key(userId);
    return keyprefix + ":openissue:body";
}

/**
 * Bot Profile
 */

exports.getHelp = async function() {
    let txts = ["机器人助手有如下技能:", "  1. 自动创建 Issue - \"以上创建 Issue\", \"以上10条创建 Issue\", \"以上10条创建工单\""];

    return txts.join("\n");
}

exports.getBotName = async function() {
    return config.BOT_NAME || "机器人助手"
}


/**
 *  Github Issues
 */
const octokit = new Octokit({
    auth: config.GITHUB_ACCESS_TOKEN
});


exports.handleOpenGithubIssue = async function() {
    let entities = _.keyBy(this.intent.entities, 'name');

    let title = await this.maestro.get(issueTitleKey(this.user.id));
    let body = await this.maestro.get(issueBodyKey(this.user.id));

    debug("[handleOpenGithubIssue] title", title)
    debug("[handleOpenGithubIssue] body", body)

    if (title && body) {
        //  发送请求，创建 Issue
        // creates an installation access token as needed
        // assumes that installationId 123 belongs to @octocat, otherwise the request will fail
        await octokit.request(`POST /repos/${config.GITHUB_REPO_OWNER}/${config.GITHUB_REPO_NAME}/issues`, {
            owner: config.GITHUB_REPO_OWNER,
            repo: config.GITHUB_REPO_NAME,
            title: title.slice(0, 60),
            body: body,
            labels: [entities["issue_category"].val]
        });


        return "Done."
    } else {
        return "不存在开 Issue 的对话信息，或信息已经过期。"
    }
}

exports.initOpenGithubIssue = async function() {

    // debug("this.user hist", this.user.history.length)
    // debug("this.user hist", JSON.stringify(this.user.history[0]))
    let nubmers = await this.maestro.extractNumber(this.message.original)
    let hist_size = config["ISSUE_DEFAULT_HIST_SIZE"] || 20;
    if (nubmers.length > 0)
        hist_size = nubmers[0]


    // 获得聊天记录
    let chats = [];
    let contents = [];
    let chat_index = 0;
    for (let x of this.user.history) {
        chats.push(`${++chat_index}. ${x.input.original}`);
        contents.push(`${x.input.original}`);
        if (chat_index >= hist_size) break;
    }


    if (chats.length == 0) {
        return "机器人技能刚刚刷新，请再说一下 Issue 的内容！";
    }

    // 生成标题和内容
    let title = (await this.maestro.digest(contents.join("。"), 30)).join(" ");
    let body = ["# 描述", "", `来自 ${this.user.id} （微信群或私聊）对话记录`, ""];

    body = _.concat(body, chats);

    body.push("");
    body.push("---");
    body.push("提示：以上为未整理的聊天历史，更多介绍查看评论信息。");
    body.push("<div align=\"right\">:speech_balloon: Opened by <a href=\"https://github.com/kaiyuanshe/osschat\">OSSChat</a> automatically.</div>");

    await this.maestro.set(issueTitleKey(this.user.id), title, 3600);
    await this.maestro.set(issueBodyKey(this.user.id), body.join("\n"), 3600);

    return "^topicRedirect(\"issues\", \"cskefu_issue_template\", true)"

}
