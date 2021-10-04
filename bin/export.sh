#! /bin/bash 
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)
BOT_DIR=$PWD
BOT_DICTS_FILE=bot.dicts.json
BOT_FAQS_FILE=bot.faqs.json
BOT_INTENTS_FILE=bot.intents.json
BOT_CONV_FILE=bot.conversations.c66

# functions

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return

echo "Current workarea:" $BOT_DIR

if [ ! -f .env ]; then
    echo "Error, no .env found at" $BOT_DIR
    echo "Generate a template with command \"bot env\""
    exit 1
fi

set -x

rm -rf $BOT_DICTS_FILE $BOT_FAQS_FILE $BOT_INTENTS_FILE $BOT_CONV_FILE

# 执行导出，以下命令并无顺序依赖关系
bot dicts -a export -f $BOT_DICTS_FILE && \
bot faq -a export -f $BOT_FAQS_FILE && \
bot intents -a export -f $BOT_INTENTS_FILE && \
bot conversation -a export -f $BOT_CONV_FILE

if [ $? -eq 0 ]; then
    rm -rf conversations && mkdir conversations
    cd conversations
    unzip ../$BOT_CONV_FILE

    pwd; ls -al
    echo "Modify values for security reason in "`pwd`"/index.json if it contains confidential, should better take a look before commit to public."
    echo "Done."
fi
