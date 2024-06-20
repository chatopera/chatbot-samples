const K_JOKES_TOLD = "jokes:told:";
const K_JOKES_EXPIRED = 3600 * 24; // 24 小时过期
// https://gitee.com/chatopera/chatbot-samples/raw/master/projects/%E5%B0%8F%E7%AC%91%E8%AF%9D/assets/jokes.json
const JOKES_DATA_URL = config["JOKES_DATA_URL"];

const fetchJokes = async function () {
  debug("fetchJokes: fetch from remote url %s ...", JOKES_DATA_URL);
  let resp = await http.get(JOKES_DATA_URL);
  // debug("fetchJokes: ", resp.data)
  return resp.data;
};

exports.nextJoke = async function () {
  let uid = this.user.id;
  let K_UID_TOLD = K_JOKES_TOLD + uid;
  let told = await this.maestro.get(K_UID_TOLD);
  if (!told) told = "";

  let jokes = await fetchJokes();

  for (let x of jokes) {
    if (told.includes(x.id)) {
      continue;
    }
    told += `, ${x.id}`;
    this.maestro.set(K_UID_TOLD, told, K_JOKES_EXPIRED);
    return {
      text: x.content,
      params: [
        {
          label: "下一个",
          type: "button",
          text: "笑话",
        },
      ],
    };
  }

  return "{@__reply_no_more_joke_now}";
};
