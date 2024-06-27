/**
 * 面试机器人
 */
const interviewDuration = 1800; // 30mins

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(target) {
    for (var i = target.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = target[i];
        target[i] = target[j];
        target[j] = temp;
    }
}

/**
 * 业务相关的函数
 */
// get_greetings
exports.get_greetings = async function() {
    return {
        text: "请问有什么可以帮到您？",
        params: [{
            label: "1. Chatopera的工作机会",
            type: "qlist",
            text: "Chatopera的工作机会"
        }, {
            label: "2. Chatopera的公司文化",
            type: "qlist",
            text: "Chatopera的公司文化"
        }, {
            label: "3. Chatopera的福利待遇",
            type: "qlist",
            text: " Chatopera的福利待遇"
        }]
    };
}

/**
 * 工作岗位列表
 * @return {[type]} [description]
 */
exports.get_job_opennings = async function() {
    // 清除临时信息
    await this.maestro.del(`${this.user.id}:interview:job:openning`);
    await this.maestro.del(`${this.user.id}:interview:job:topic`);

    return {
        text: "Chatopera现在开放如下岗位，亟需有识之士加入",
        params: [{
            label: "1. 自然语言处理工程师",
            type: "button",
            text: "【工作岗位】介绍自然语言处理工程师"
        }, {
            label: "2. Node.js工程师",
            type: "button",
            text: "【工作岗位】介绍Node.js工程师"
        }]
    }
}

/**
 * 自然语言处理描述
 * @return {[type]} [description]
 */
exports.describe_nlp_job = async function() {
    return {
        text: "这个岗位是优化Chatopera的聊天机器人产品，让机器人服务更加智能。使用深度学习，迁移学习等算法提升不同自然语言处理任务的准确度。",
        params: [{
            label: "我要面试",
            type: "button",
            text: "【工作岗位】面试自然语言处理工程师"
        }]
    }
}

/**
 * nodejs
 */
exports.describe_nodejs_job = async function() {
    return {
        text: "这个岗位是优化Chatopera的聊天机器人产品，让机器人服务更加智能。包括多轮对话设计器、智能问答引擎和开发者平台等产品的开发和维护。",
        params: [{
            label: "我要面试",
            type: "button",
            text: "【工作岗位】面试Node.js工程师"
        }]
    }
}


/**
 * 面试开始前
 * @param  {[type]} openning [description]
 * @return {[type]}          [description]
 */
exports.prepare_interview = async function(openning) {
    // 临时存储
    await this.maestro.set(`${this.user.id}:interview:job:openning`, openning);
    return {
        text: '好的，请保持放松，我们面试即将开始，本次面试包含四个环节：【1】基本信息；【2】技能检验；【3】工作偏好；【4】心理测试。整个面试需要在30分钟内完成，请认真的回答每一个问题，面试结果是我们考察候选人的主要依据。',
        params: [{
            text: "【工作岗位】开始面试",
            label: "开始",
            type: "button"
        }]
    }
}

/**
 * 第一个话题：基本信息
 * @return {[type]} [description]
 */
exports.startBasicSection = async function() {
    let openning = await this.maestro.get(`${this.user.id}:interview:job:openning`);
    await this.maestro.set(`${this.user.id}:interview:job:openning`, openning, interviewDuration); // 30 mins
    await this.maestro.set(`${this.user.id}:interview:job:topic`, 'basic', interviewDuration);
}

/**
 * 在不同主题之间跳转
 * @return {[type]}      [description]
 */
exports.parseNextSection = async function() {
    const currTopic = await this.maestro.get(`${this.user.id}:interview:job:topic`);
    debug("parseNextSection currTopic: %s", currTopic);
    let nextTopic = null;
    let nextGambit = null;

    if (currTopic) {
        switch (currTopic) {
            case "basic":
                let openning = await this.maestro.get(`${this.user.id}:interview:job:openning`);
                if (openning == '自然语言处理') {
                    nextTopic = 'nlp';
                    nextGambit = '__kickoff_nlp_main_1';
                    break;
                } else if (openning == 'NodeJS') {
                    nextTopic = 'nodejs';
                    nextGambit = '__kickoff_nodejs_main_1';
                    break;
                } else {
                    // 没有openning, 直接过度到 background
                    nextTopic = 'background';
                    nextGambit = '__kickoff_bg_hobbies';
                }

                case "nlp":
                    nextTopic = 'background';
                    nextGambit = '__kickoff_bg_hobbies';
                    break;

                case "nodejs":
                    nextTopic = 'background';
                    nextGambit = '__kickoff_bg_hobbies';
                    break;

                case "background":
                    nextTopic = 'mental';
                    nextGambit = '__kickoff_mental';
                    break;

                case "mental":
                    nextTopic = 'close';
                    nextGambit = '__kickoff_close_interview';
                    break;
        }
        // 存储上下文
        debug("parseNextSection next topic: %s", nextTopic);
        await this.maestro.set(`${this.user.id}:interview:job:topic`, nextTopic, interviewDuration);
        return `routeDirectReply#["${nextTopic}","${nextGambit}"]`;
    } else {
        debug("parseNextSection: can not find current Topic.");
        return '';
    }
}

exports.saveResumeInformation = async function(id) {
    debug("saveResumeInformation: %s", this.message.original)
    await this.maestro.set(`${this.user.id}:interview:job:${id}`, this.message.original, interviewDuration);
    return '';
}



/**
 * 分析性格
 * @param  {[type]} score [description]
 * @return {[type]}       [description]
 */
function getCharacterAnalysis(score) {

    if (score >= 180)
        return "意志力强，头脑冷静，有较强的领导欲，事业心强，不达目的不罢休。外表 和善，内心自傲，对有利于自己的人际关系比较看重，有时显得性格急噪，咄咄逼人，得理不饶人，不利于自己时顽强争，不轻易认输。思维理性，对爱情和婚姻的 看法很现实，对金钱的欲望一般。";

    if (score >= 140)
        return "聪明，性格活泼，人缘好，善于交朋友，心机较深。事业心强，渴望成功。思维较理性，崇尚爱情，但当爱情与婚姻发生冲突时会选择有利于自己的婚姻。金钱欲望强烈。";

    if (score >= 100)
        return "爱幻想，思维较感性， 以是否与自己投缘为标准来选择朋友。性格显得较孤傲，有时较急噪，有时优柔寡断。事业心较强，喜欢有创造性的工作，不喜欢按常规办事。性格倔强，言语犀 利，不善于妥协。崇尚浪漫的爱情，但想法往往不切合实际。金钱欲望一般。";

    if (score >= 70)
        return "好奇心强，喜欢冒险，人缘较好。事业心一般，对待工作，随遇而安，善于妥协。善于发现有趣的事情，但耐心较差，敢于冒险，但有时较胆小。渴望浪漫的爱情，但对婚姻的要求比较现实。不善理财。";

    if (score >= 40)
        return "性情温良，重友谊，性格塌实稳重，但有时也比较狡黠。事业心一般，对本职工作能认真对待，但对自己专业以外事物没有太大兴趣，喜欢有规律的工 作和生活，不喜欢冒险，家庭观念强，比较善于理财。";

    return "散漫，爱玩，富于幻想。聪明机灵，待人热情，爱交朋友，但对朋友没有严格的选择标准。事业心较差，更善于享受生活，意志力和耐心都较差，我行我素。有较好的异性缘，但对爱情不够坚持认真，容易妥协。没有财产观念。";
}

exports.getMentalAnswerOptions = async function(questionNum) {

    // 按照顺序问，遇到第一个问题做清0
    if (questionNum == 1) {
        await this.maestro.set(`${this.user.id}:interview:mental`, 0, 1800);
    }

    // copy an array
    let opt = JSON.parse(JSON.stringify(MENTAL_ANSWERS[questionNum]));
    if (opt && opt.length > 0) {
        for (let x of opt) {
            delete x['score']
        }
    }

    // 随机重排
    shuffleArray(opt);

    return {
        text: '',
        params: opt
    }
}

exports.calculateMentalScore = async function(questionNum) {
    debug("this message: %j", this.message)
    debug("questionNum: %s, %j", questionNum, MENTAL_ANSWERS[questionNum])

    let options = MENTAL_ANSWERS[questionNum];
    for (let x of options) {
        if (this.message.original.includes(x['text'])) {
            // add scores
            await this.maestro.incrby(`${this.user.id}:interview:mental`, x['score']);
            break;
        }
    }

    debug("calculateMentalScore current score: %s", await this.maestro.get(`${this.user.id}:interview:mental`))

    return '';
}


// 获得NLP问题的答案列表
exports.getNlpAnswerOptions = async function(questionNum) {
    // 按照顺序问，遇到第一个问题做清0
    if (questionNum == 1) {
        await this.maestro.set(`${this.user.id}:interview:nlp:score`, 0, 1800);
    }

    // copy an array
    let opt = JSON.parse(JSON.stringify(NLP_ANSWER_OPTIONS[questionNum]));
    if (opt && opt.length > 0) {
        for (let x of opt) {
            delete x['score']
            delete x['question']
        }
    }

    // 随机重排
    shuffleArray(opt);

    return {
        text: '',
        params: opt
    }
}

exports.calculateNlpScore = async function(questionNum) {
    let options = NLP_ANSWER_OPTIONS[questionNum];
    let nlpKey = `${this.user.id}:interview:nlp:score`;
    for (let x of options) {
        if (this.message.original.includes(x['text'])) {
            await this.maestro.incrby(nlpKey, x['score']);
            break;
        }
    }

    debug("calculateNlpScore current score: %s", await this.maestro.get(nlpKey))
    return '';
}

// 获得NLP问题的答案列表
exports.getNodejsAnswerOptions = async function(questionNum) {
    // 按照顺序问，遇到第一个问题做清0
    if (questionNum == 1) {
        await this.maestro.set(`${this.user.id}:interview:nodejs:score`, 0, 1800);
    }

    // copy an array
    let opt = JSON.parse(JSON.stringify(NODEJS_ANSWER_OPTIONS[questionNum]));
    if (opt && opt.length > 0) {
        for (let x of opt) {
            delete x['score']
            delete x['question']
        }
    }

    // 随机重排
    shuffleArray(opt);

    return {
        text: '',
        params: opt
    }
}

exports.calculateNodejsScore = async function(questionNum) {
    let options = NODEJS_ANSWER_OPTIONS[questionNum];
    let key = `${this.user.id}:interview:nodejs:score`;
    for (let x of options) {
        if (this.message.original.includes(x['text'])) {
            await this.maestro.incrby(key, x['score']);
            break;
        }
    }

    debug("calculateNodejsScore current score: %s", await this.maestro.get(key))
    return '';
}

/**
 * 总结面试结果
 * @param  {[type]} email [description]
 * @return {[type]}       [description]
 */
exports.sendInterviewReport = async function(email) {
    // send mail
    const ttl = await this.maestro.ttl(`${this.user.id}:interview:job:openning`);
    const openning = await this.maestro.get(`${this.user.id}:interview:job:openning`)
    let totalDuration = "";
    if (ttl > 0) {
        totalDuration = `用时${Math.round((interviewDuration - ttl)/60)}分钟，在规定的时间内完成。<br>`;
    } else {
        totalDuration = "用时超时，未能在规定时间内完成面试。<br>";
    }

    let mental_score = await this.maestro.get(`${this.user.id}:interview:mental`);
    let mailSettings = {
        service: config['MAIL_SERVICE'],
        auth: {
            user: config['MAIL_ACCOUNT'],
            pass: config['MAIL_PASSWORD']
        }
    };

    debug("mail settings: %j", mailSettings)
    let transporter = this.maestro.nodemailer.createTransport(mailSettings);
    let content = `小主，<br> 这是面试报告，此次面试` + totalDuration;
    // 基本信息
    content += `<h2>基本信息</h2>`
    content += `姓名：`;
    content += await this.maestro.get(`${this.user.id}:interview:job:__basic_main_1`)
    content += `<br>手机号码：${this.message.original}`
    content += `<br>籍贯：`;
    content += await this.maestro.get(`${this.user.id}:interview:job:__basic_main_2`)
    content += `<br>工作年限：`;
    content += await this.maestro.get(`${this.user.id}:interview:job:__basic_main_3`)
    content += `<br>学历：`;
    content += await this.maestro.get(`${this.user.id}:interview:job:__basic_main_4`)
    content += `<br>学校：`;
    content += await this.maestro.get(`${this.user.id}:interview:job:__basic_main_5`)
    content += `<br>专业：`;
    content += await this.maestro.get(`${this.user.id}:interview:job:__basic_main_6`)

    // 技能检验
    content += '<h2>技能检验</h2>';
    switch (openning) {
        case "自然语言处理":
            let nlpStore = await this.maestro.get(`${this.user.id}:interview:nlp:score`);
            content += `总题目：${Object.keys(NLP_ANSWER_OPTIONS).length}，回答正确数：${nlpStore}。`
            break;
        case "NodeJS":
            let score = await this.maestro.get(`${this.user.id}:interview:nodejs:score`);
            content += `总题目：${Object.keys(NODEJS_ANSWER_OPTIONS).length}，回答正确数：${score}。`
            break;
        default:
            content += `错误：未知的职位【${openning}】`;
    }

    // 心理测试
    content += `<h2>心理测试</h2>心理评测分数：${mental_score} <br>`;
    content += `性格分析： ${getCharacterAnalysis(mental_score)}`;

    // 工作偏好
    content += "<h2>工作偏好</h2>1. 你有什么业余爱好？<br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_1`)
    content += "<br>2. 谈谈你的优缺点 <br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_2`)
    content += "<br>3. 介绍你一次最失败的一次经历 <br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_3`)
    content += "<br>4. 为什么应聘我们公司？<br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_4`)
    content += "<br>5. 这份工作你有想过会面对哪些困难吗？<br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_5`)
    content += "<br>6. 如果你发现上司做错了，你将怎么办？<br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_6`)
    content += "<br>7. 公司为什么要聘用你？<br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_7`)
    content += "<br>8. 你希望什么样的上司？<br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_8`)
    content += "<br>9. 上一家公司的离职原因？<br>"
    content += await this.maestro.get(`${this.user.id}:interview:job:__bg_main_9`)

    content += `<br>--<br>`;
    content += `Chatopera是一家专注于企业聊天机器人的人工智能公司。<br>`;
    content += `为企业提供完整的智能客服、智能问答、客服小助手和开发者平台等产品和服务。<br>`
    content += "<i>小H，HR机器人，招聘助手</i>"

    // setup e-mail data with unicode symbols
    let mailOptions = {
        from: `HR<${config['MAIL_ACCOUNT']}>`, // sender address
        to: config['MAIL_RECEP'], // list of receivers
        subject: `【应聘】小主，新增候选人了，岗位${openning}`, // Subject line
        text: '', // plaintext body
        html: content, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            debug(error);
        }
    });

    return '';
}

const NLP_ANSWER_OPTIONS = {
    1: [{
            "text": "接收者",
            "label": "接收者模式",
            "score": 1,
            "type": "button"
        }, {
            "text": "享元",
            "label": "享元模式",
            "score": 0,
            "type": "button"
        },
        {
            "text": "桥接",
            "label": "桥接模式",
            "score": 0,
            "type": "button"
        },
        {
            "text": "解释器",
            "label": "解释器模式",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    2: [{
            "text": "O(logN)",
            "label": "O(logN)",
            "score": 1,
            "type": "button"
        }, {
            "text": "O(N)",
            "label": "O(N)",
            "score": 0,
            "type": "button"
        },
        {
            "text": "O(1)",
            "label": "O(1)",
            "score": 0,
            "type": "button"
        },
        {
            "text": "O(NlogN)",
            "label": "O(NlogN)",
            "score": 0,
            "type": "button"
        }
    ],
    3: [{
            "text": "包括",
            "label": "包括",
            "score": 1,
            "type": "button"
        }, {
            "text": "不包括",
            "label": "不包括",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    4: [{
            "text": "生成问题",
            "label": "生成问题",
            "score": 1,
            "type": "button"
        }, {
            "text": "评估问题",
            "label": "评估问题",
            "score": 0,
            "type": "button"
        },
        {
            "text": "预测问题",
            "label": "预测问题",
            "score": 0,
            "type": "button"
        },
        {
            "text": "学习问题",
            "label": "学习问题",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    5: [{
            "text": "标点符号",
            "label": "标点符号",
            "score": 1,
            "type": "button"
        }, {
            "text": "代词",
            "label": "代词",
            "score": 0,
            "type": "button"
        },
        {
            "text": "数词",
            "label": "数词",
            "score": 0,
            "type": "button"
        },
        {
            "text": "助词",
            "label": "助词",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    6: [{
            "text": "Friso",
            "label": "Friso",
            "score": 1,
            "type": "button"
        }, {
            "text": "Jieba",
            "label": "Jieba",
            "score": 0,
            "type": "button"
        },
        {
            "text": "HanLP",
            "label": "HanLP",
            "score": 0,
            "type": "button"
        },
        {
            "text": "Anjs",
            "label": "Anjs",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    7: [{
            "text": "MITIE",
            "label": "MITIE",
            "score": 1,
            "type": "button"
        }, {
            "text": "word2vec",
            "label": "Word2vec",
            "score": 0,
            "type": "button"
        },
        {
            "text": "fasttext",
            "label": "Fasttext",
            "score": 0,
            "type": "button"
        },
        {
            "text": "Glove",
            "label": "Glove",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    8: [{
            "text": "ARPA",
            "label": "ARPA",
            "score": 1,
            "type": "button"
        }, {
            "text": "LMF",
            "label": "LMF",
            "score": 0,
            "type": "button"
        },
        {
            "text": "APL",
            "label": "APL",
            "score": 0,
            "type": "button"
        },
        {
            "text": "LOA",
            "label": "LOA",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ]
};

const NODEJS_ANSWER_OPTIONS = {
    1: [{
            "text": "接收者",
            "label": "接收者模式",
            "score": 1,
            "type": "button"
        }, {
            "text": "享元",
            "label": "享元模式",
            "score": 0,
            "type": "button"
        },
        {
            "text": "桥接",
            "label": "桥接模式",
            "score": 0,
            "type": "button"
        },
        {
            "text": "解释器",
            "label": "解释器模式",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    2: [{
            "text": "O(logN)",
            "label": "O(logN)",
            "score": 1,
            "type": "button"
        }, {
            "text": "O(N)",
            "label": "O(N)",
            "score": 0,
            "type": "button"
        },
        {
            "text": "O(1)",
            "label": "O(1)",
            "score": 0,
            "type": "button"
        },
        {
            "text": "O(NlogN)",
            "label": "O(NlogN)",
            "score": 0,
            "type": "button"
        }
    ],
    3: [{
            "text": "false",
            "label": "false",
            "score": 1,
            "type": "button"
        }, {
            "text": "true",
            "label": "true",
            "score": 0,
            "type": "button"
        },
        {
            "text": "undefined",
            "label": "undefined",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    4: [{
            "text": '["1", "2", "3"]',
            "label": '["1", "2", "3"]',
            "score": 0,
            "type": "button"
        }, {
            "text": "其它",
            "label": "其它",
            "score": 1,
            "type": "button"
        },
        {
            "text": "[1, 2, 3]",
            "label": "1, 2, 3]",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    5: [{
            "text": '["object", false]',
            "label": '["object", false]',
            "score": 1,
            "type": "button"
        }, {
            "text": "[null, false]",
            "label": "[null, false]",
            "score": 0,
            "type": "button"
        },
        {
            "text": '["object", true]',
            "label": '["object", true]',
            "score": 0,
            "type": "button"
        },
        {
            "text": '不知道',
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    6: [{
            "text": "异常",
            "label": "异常",
            "score": 0,
            "type": "button"
        },
        {
            "text": "3.0",
            "label": "3.0",
            "score": 0,
            "type": "button"
        },
        {
            "text": "3",
            "label": "3",
            "score": 1,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
    7: [{
            "text": "Webcat",
            "label": "Webcat",
            "score": 1,
            "type": "button"
        }, {
            "text": "Express",
            "label": "Express",
            "score": 0,
            "type": "button"
        },
        {
            "text": "Koa",
            "label": "Koa",
            "score": 0,
            "type": "button"
        },
        {
            "text": "Egg",
            "label": "Egg",
            "score": 0,
            "type": "button"
        }
    ],
    8: [{
            "text": "Ryan Dahl",
            "label": "Ryan Dahl",
            "score": 1,
            "type": "button"
        }, {
            "text": "TJ Holowaychuk",
            "label": "TJ Holowaychuk",
            "score": 0,
            "type": "button"
        },
        {
            "text": "Brendan Eich",
            "label": "Brendan Eich",
            "score": 0,
            "type": "button"
        },
        {
            "text": "不知道",
            "label": "我不知道",
            "score": 0,
            "type": "button"
        }
    ],
};


/**
 * 心理问题的答案
 */
const MENTAL_ANSWERS = {
    1: [{
        "text": "草莓",
        "label": "草莓",
        "score": 2,
        "type": "button"
    }, {
        "text": "苹果",
        "label": "苹果",
        "score": 3,
        "type": "button"
    }, {
        "text": "西瓜",
        "label": "西瓜",
        "score": 5,
        "type": "button"
    }, {
        "text": "菠萝",
        "label": "菠萝",
        "score": 10,
        "type": "button"
    }, {
        "text": "橘子",
        "label": "橘子",
        "score": 15,
        "type": "button"
    }],
    2: [{
        "text": "郊外",
        "label": "郊外",
        "score": 2,
        "type": "button"
    }, {
        "text": "电影院",
        "label": "电影院",
        "score": 3,
        "type": "button"
    }, {
        "text": "公园",
        "label": "公园",
        "score": 5,
        "type": "button"
    }, {
        "text": "商场",
        "label": "商场",
        "score": 10,
        "type": "button"
    }, {
        "text": "酒吧",
        "label": "酒吧",
        "score": 15,
        "type": "button"
    }, {
        "text": "练歌房",
        "label": "练歌房",
        "score": 20,
        "type": "button"
    }],
    3: [{
        "text": "有才华的人",
        "label": "有才华的人",
        "score": 2,
        "type": "button"
    }, {
        "text": "依赖你的人",
        "label": "依赖你的人",
        "score": 3,
        "type": "button"
    }, {
        "text": "优雅的人",
        "label": "优雅的人",
        "score": 5,
        "type": "button"
    }, {
        "text": "善良的人",
        "label": "善良的人",
        "score": 10,
        "type": "button"
    }, {
        "text": "性情豪放的人",
        "label": "性情豪放的人",
        "score": 15,
        "type": "button"
    }],
    4: [{
        "text": "猫",
        "label": "猫",
        "score": 2,
        "type": "button"
    }, {
        "text": "马",
        "label": "马",
        "score": 3,
        "type": "button"
    }, {
        "text": "大象",
        "label": "大象",
        "score": 5,
        "type": "button"
    }, {
        "text": "猴子",
        "label": "猴子",
        "score": 10,
        "type": "button"
    }, {
        "text": "狗",
        "label": "狗",
        "score": 15,
        "type": "button"
    }, {
        "text": "狮子",
        "label": "狮子",
        "score": 20,
        "type": "button"
    }],
    5: [{
        "text": "游泳",
        "label": "游泳",
        "score": 5,
        "type": "button"
    }, {
        "text": "喝冷饮",
        "label": "喝冷饮",
        "score": 10,
        "type": "button"
    }, {
        "text": "开空调",
        "label": "开空调",
        "score": 15,
        "type": "button"
    }],
    6: [{
        "text": "蛇",
        "label": "蛇",
        "score": 2,
        "type": "button"
    }, {
        "text": "猪",
        "label": "猪",
        "score": 5,
        "type": "button"
    }, {
        "text": "老鼠",
        "label": "老鼠",
        "score": 10,
        "type": "button"
    }, {
        "text": "苍蝇",
        "label": "苍蝇",
        "score": 15,
        "type": "button"
    }],
    7: [{
        "text": "悬疑推理类",
        "label": "悬疑推理类",
        "score": 2,
        "type": "button"
    }, {
        "text": "童话神话类",
        "label": "童话神话类",
        "score": 3,
        "type": "button"
    }, {
        "text": "自然科学类",
        "label": "自然科学类",
        "score": 5,
        "type": "button"
    }, {
        "text": "伦理道德类",
        "label": "伦理道德类",
        "score": 10,
        "type": "button"
    }, {
        "text": "战争枪战类",
        "label": "战争枪战类",
        "score": 15,
        "type": "button"
    }],
    8: [{
        "text": "打火机",
        "label": "打火机",
        "score": 2,
        "type": "button"
    }, {
        "text": "口红",
        "label": "口红",
        "score": 2,
        "type": "button"
    }, {
        "text": "记事本",
        "label": "记事本",
        "score": 3,
        "type": "button"
    }, {
        "text": "纸巾",
        "label": "纸巾",
        "score": 5,
        "type": "button"
    }, {
        "text": "手机",
        "label": "手机",
        "score": 10,
        "type": "button"
    }],
    9: [{
        "text": "火车",
        "label": "火车",
        "score": 2,
        "type": "button"
    }, {
        "text": "自行车",
        "label": "自行车",
        "score": 3,
        "type": "button"
    }, {
        "text": "汽车",
        "label": "汽车",
        "score": 5,
        "type": "button"
    }, {
        "text": "飞机",
        "label": "飞机",
        "score": 10,
        "type": "button"
    }, {
        "text": "步行",
        "label": "步行",
        "score": 15,
        "type": "button"
    }],
    10: [{
        "text": "紫",
        "label": "紫",
        "score": 2,
        "type": "button"
    }, {
        "text": "黑",
        "label": "黑",
        "score": 3,
        "type": "button"
    }, {
        "text": "蓝",
        "label": "蓝",
        "score": 5,
        "type": "button"
    }, {
        "text": "白",
        "label": "白",
        "score": 8,
        "type": "button"
    }, {
        "text": "黄",
        "label": "黄",
        "score": 12,
        "type": "button"
    }, {
        "text": "红",
        "label": "红",
        "score": 15,
        "type": "button"
    }],
    11: [{
        "text": "瑜珈",
        "label": "瑜珈",
        "score": 2,
        "type": "button"
    }, {
        "text": "自行车",
        "label": "自行车",
        "score": 3,
        "type": "button"
    }, {
        "text": "乒乓球",
        "label": "乒乓球",
        "score": 5,
        "type": "button"
    }, {
        "text": "拳击",
        "label": "拳击",
        "score": 8,
        "type": "button"
    }, {
        "text": "足球",
        "label": "足球",
        "score": 10,
        "type": "button"
    }, {
        "text": "蹦极",
        "label": "蹦极",
        "score": 15,
        "type": "button"
    }],
    12: [{
        "text": "湖边",
        "label": "湖边",
        "score": 2,
        "type": "button"
    }, {
        "text": "草原",
        "label": "草原",
        "score": 3,
        "type": "button"
    }, {
        "text": "海边",
        "label": "海边",
        "score": 5,
        "type": "button"
    }, {
        "text": "森林",
        "label": "森林",
        "score": 10,
        "type": "button"
    }, {
        "text": "城中区",
        "label": "城中区",
        "score": 15,
        "type": "button"
    }],
    13: [{
        "text": "雪",
        "label": "雪",
        "score": 2,
        "type": "button"
    }, {
        "text": "风",
        "label": "风",
        "score": 3,
        "type": "button"
    }, {
        "text": "雨",
        "label": "雨",
        "score": 5,
        "type": "button"
    }, {
        "text": "雾",
        "label": "雾",
        "score": 10,
        "type": "button"
    }, {
        "text": "雷电",
        "label": "雷电",
        "score": 15,
        "type": "button"
    }],
    14: [{
        "text": "七层",
        "label": "七层",
        "score": 2,
        "type": "button"
    }, {
        "text": "一层",
        "label": "一层",
        "score": 3,
        "type": "button"
    }, {
        "text": "二十三层",
        "label": "二十三层",
        "score": 5,
        "type": "button"
    }, {
        "text": "十八层",
        "label": "十八层",
        "score": 10,
        "type": "button"
    }, {
        "text": "三十层",
        "label": "三十层",
        "score": 15,
        "type": "button"
    }],
    15: [{
        "text": "丽江 ",
        "label": "丽江 ",
        "score": 1,
        "type": "button"
    }, {
        "text": "拉萨",
        "label": "拉萨",
        "score": 3,
        "type": "button"
    }, {
        "text": "昆明",
        "label": "昆明",
        "score": 5,
        "type": "button"
    }, {
        "text": "西安",
        "label": "西安",
        "score": 8,
        "type": "button"
    }, {
        "text": "杭州",
        "label": "杭州",
        "score": 10,
        "type": "button"
    }, {
        "text": "北京",
        "label": "北京",
        "score": 15,
        "type": "button"
    }]
}