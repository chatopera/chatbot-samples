#! /bin/bash 
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)
# functions

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return
BOTINDEX=$baseDir/../app/index.json
BOTNAME=$(cat $BOTINDEX \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' | xargs)


BOTVERSION=$(cat $BOTINDEX \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' | xargs)

echo "Chatbot name:" $BOTNAME", version:" $BOTVERSION

ZIPNAME=$BOTNAME-$BOTVERSION-conversations.zip
ZIPPATH=$baseDir/../$ZIPNAME

cd $baseDir/..
if [ -e $ZIPNAME ]; then
    echo "remove" $ZIPNAME "..."
    rm $ZIPNAME
fi
cd app
pwd


set -x
zip $ZIPPATH -r .
echo "done, package path:" $ZIPPATH
