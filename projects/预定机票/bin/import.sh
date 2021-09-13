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

if [ -f $APP_DIR/bot.dicts.json ]; then
    echo "  Import dicts ..."
    bot dicts --action import -f $APP_DIR/bot.dicts.json
fi

if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
fi

if [ -f $APP_DIR/bot.faqs.json ]; then
    echo "  Import faqs ..."
    bot faq --action import -f $APP_DIR/bot.faqs.json
fi

if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
fi

if [ -f $APP_DIR/bot.intents.json ]; then
    echo "  Import intents ..."
    bot intents --action import -f $APP_DIR/bot.intents.json
fi

if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
fi

if [ -f $APP_DIR/bot.conversations.c66 ]; then
    echo "  Import conversations ..."
    bot conversation --action import -f $APP_DIR/bot.conversations.c66
fi

if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
fi