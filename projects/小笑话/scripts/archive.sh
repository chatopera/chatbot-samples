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
cd $BOT_DIR

if [ ! -d botarchive ]; then
    echo `pwd`"/botarchive Not Found"
    exit 1
fi

cd botarchive
# Version key/value should be on his own line
BOT_VERSION=$(cat index.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' | xargs)

BOT_NAME=$(cat index.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' | xargs)

BOT_LANG=$(cat index.json \
  | grep primaryLanguage \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' | xargs)

BOT_ARCHIVE_FILE=$BOT_NAME.$BOT_LANG.$BOT_VERSION.c66

cd ..
echo "Packaging conversations as" `pwd`/releases/$BOT_ARCHIVE_FILE
zip -j $BOT_ARCHIVE_FILE -r ./botarchive
mv *.c66 releases
echo "Done."

