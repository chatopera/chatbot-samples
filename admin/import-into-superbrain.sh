#! /bin/bash 
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)
SUPHOST=localhost
ChatbotId=gmis_department_1
# functions

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return

cd $baseDir/..

if [ ! -f localrc ]; then
    echo "错误：" $baseDir/../localrc "文件不存在！"
    exit 1
else
    . localrc
fi

$baseDir/package.sh
cd $baseDir/..
ZIPFILE=`ls *.zip`
set -x
curl -i -X POST -H "Content-Type: multipart/form-data" \
    -F "droplet=@$ZIPFILE" \
    -F "name=foo" \
    -F "password=bar" \
    http://$SUPHOST:8003/api/v1/chatbot/$ChatbotId/conversation/droplet/import
