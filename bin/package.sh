#! /bin/bash 
###########################################
# conversation package
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

if [ ! -d conversations ]; then
    echo "folder conversations not found."
    exit 1
fi

if [ ! -d tmp ]; then
    mkdir tmp
fi

if [ -f $BOT_CONV_FILE  ]; then
    mv $BOT_CONV_FILE tmp/$BOT_CONV_FILE.bak
fi

cd conversations
zip -r ../$BOT_CONV_FILE .


if [ ! $? -eq 0 ]; then
    echo "Error"
    exit 1
else
    echo "Generated "$BOT_DIR"/"$BOT_CONV_FILE
    echo "Done"
fi