let rangeMax = 100;
let rangeMin = 1;
let turnMax = 5;

const secretKey = function(uid) {
    return "guess_num:secret:" + uid;
}

const turnKey = function(uid) {
    return "guess_num:turn:" + uid;
}


function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function dropSession(maestro, uid) {
    maestro.del(secretKey(uid));
    maestro.del(turnKey(uid));
}

exports.regenSecretNumber = async function(min, max) {
    let secret = getRandomInt(max, min);
    rangeMax = max;
    rangeMin = min;
    debug("[regenSecretNumber] range [%s,%s], result %s", min, max, secret);
    this.maestro.set(secretKey(this.user.id), secret);
    this.maestro.set(turnKey(this.user.id), 0);

    return "";
}

exports.verifyInputAgainstSecret = async function(input) {
    let secret = await this.maestro.get(secretKey(this.user.id));
    let turn = await this.maestro.incrby(turnKey(this.user.id), 1);
    debug("[verifyInputAgainstSecret] Turn %s, input %s, secret %s", turn, input, secret);

    if (typeof input === "string" && input.includes("start")) {
        return "Ok, I start a new session. ^topicRedirect('guess_the_number', '__kickoff_guess_num')";
    }

    if (typeof input === "string" && input.includes("help")) {
        return "^topicRedirect('guess_the_number', 'help')";
    }

    try {
        let inputNumber = Number(input);
        if (isNaN(inputNumber) || inputNumber < rangeMin || inputNumber > rangeMax)
            return `Not a valid number, pls give me a Arabic number in range from ${rangeMax} to ${rangeMin}.`;

        if (inputNumber == secret) {
            // It took you 2 turns to guess my number, which was 10.
            dropSession(this.maestro, this.user.id);
            return `{CLEAR} Bingo! It took you ${turn} turns to guess my number, which was ${secret}.`;
        } else if (inputNumber > secret) {

            if (turn == turnMax) {
                dropSession(this.maestro, this.user.id);
                return `{CLEAR} Oops!! No turns left. My number was ${secret}. Input "start" to begin a new session.`;
            }

            return `Turn ${turn}/${turnMax}. Your guess, ${inputNumber}, is too high.`;
        } else {

            if (turn == turnMax) {
                dropSession(this.maestro, this.user.id);
                return `{CLEAR} Oops!! No turns left. My number was ${secret}. Input "start" to begin a new session.`;
            }

            return `Turn ${turn}/${turnMax}. Your guess, ${inputNumber}, is too low.`
        }

    } catch (e) {
        return `Not a valid number, pls give me a Arabic number in range from ${rangeMax} to ${rangeMin}.`;
    }

    return "";
}


exports.help = async function() {
    // message with button, https://dwz.chatopera.com/jQ0F9G
    return {
        text: "A secret number is in my hat. You guess what number it is. If your guess is too high or too low, I will give you a hint. See how many turns it takes you to win! send `start` to begin. Are you ready?",
        params: [{
            label: "Go",
            type: "button",
            text: "start"
        }]
    }
}
