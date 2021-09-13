#! /bin/bash 
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)
export PYTHONUNBUFFERED=1
export PATH=/opt/miniconda3/envs/venv-py3/bin:$PATH
APP_DIR=$baseDir/..

# functions

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return

if [ ! -f .env ]; then
    echo "Error, no .env found at" `pwd`
    echo "Get a sample in" $baseDir/../sample.env
    exit 1
fi

set -x

rm -rf bot.dicts.json bot.faqs.json bot.intents.json bot.conversations.c66

# 执行导出，以下命令并无顺序依赖关系
bot dicts -a export -f bot.dicts.json && \
bot faq -a export -f bot.faqs.json && \
bot intents -a export -f bot.intents.json && \
bot conversation -a export -f bot.conversations.c66

if [ $? -eq 0 ]; then
    mv bot.conversations.c66 $APP_DIR
    mv bot.faqs.json $APP_DIR
    mv bot.intents.json $APP_DIR
    mv bot.dicts.json $APP_DIR
    cd $APP_DIR

    rm -rf conversations && mkdir conversations
    cd conversations
    unzip ../bot.conversations.c66

    pwd; ls -al
    echo "Done."
fi
