#! /bin/bash 
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)

# functions

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return
cd $baseDir/..

## resolve BOT_DIR, assume it is the first param.
BOT_DIR=`pwd`

if [ -z "$BOT_DIR" ] || [ ! -d $BOT_DIR ] ; then
    echo "Usage $0" BOT_DIR
    echo "BOT_DIR is folder name under" `pwd` "which contains bot archives."
    echo "Folder structure example:"
    echo "          BOT_DIR
            ├── README.md
            └── botarchive
                ├── LANG.greetings.ms
                ├── LANG.promotion_1.ms
                ├── index.json
                └── plugin.js"
    echo "LANG is the primaryLanguage for this bot, set as en_US or zh_CN as they were supported currently."
    echo "Guide https://docs.chatopera.com/products/chatbot-platform/conversation.html"
    exit 1
fi

if [ ! -f .env ]; then
    echo "Can not find .env. Run cp" `pwd`/sample.env `pwd`/.env
    echo "Edit it and replace with your settings."
    exit 1
fi

source .env

set -x
scripts/bot deploy -c $BOT_CLIENT_ID \
    -s $BOT_CLIENT_SECRET \
    -p $BOT_PROVIDER \
    -b `pwd`/botarchive
