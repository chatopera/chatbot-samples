#! /bin/bash 
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)
cwdDir=$PWD
export PYTHONNOUSERSITE=1
export PYTHONUNBUFFERED=1
#export PATH=/opt/miniconda3/envs/venv-py3/bin:$PATH
export TS=$(date +%Y%m%d%H%M%S)
export DATE=`date "+%Y%m%d"`
export DATE_WITH_TIME=`date "+%Y%m%d-%H%M%S"` #add %3N as we want millisecond too

# functions

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return

cd $baseDir/..
if [ -d dist ]; then
    rm -rf dist
fi
mkdir dist
OUTPUT_DIR=dist
OUTPUT_FILENAME=chatopera-bot-samples.docx
INPUT_FILENAME=DIST.md

if [ -f $INPUT_FILENAME ]; then
    rm $INPUT_FILENAME
fi

markup markup.md -o $INPUT_FILENAME

set -x
export LANG=C.UTF-8
$baseDir/autocorrect.sh "$INPUT_FILENAME"
pandoc --from markdown+footnotes --wrap=none \
	--reference-doc=$baseDir/../templates/styles/style.docx \
	-i "$INPUT_FILENAME" \
	-o "$OUTPUT_DIR/$OUTPUT_FILENAME"