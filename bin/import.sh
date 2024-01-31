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

if [ -f $BOT_DIR/$BOT_DICTS_FILE ]; then
    echo "  Import dicts ..."
    bot dicts --action import -f $BOT_DIR/$BOT_DICTS_FILE
fi

if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
fi

if [ -f $BOT_DIR/$BOT_FAQS_FILE ]; then
    echo "  Import faqs ..."
    bot faq --action import -f $BOT_DIR/$BOT_FAQS_FILE
fi

if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
fi

if [ -f $BOT_DIR/$BOT_INTENTS_FILE ]; then
    echo "  Import intents ..."
    bot intents --action import -f $BOT_DIR/$BOT_INTENTS_FILE
fi

if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
fi

if [ -f $BOT_DIR/$BOT_CONV_FILE ]; then
    echo "  Import conversations ..."
    bot conversation --action import -f $BOT_DIR/$BOT_CONV_FILE
fi

if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
fi