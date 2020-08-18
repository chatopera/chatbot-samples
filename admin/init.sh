#! /bin/bash 
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)
export PYTHONUNBUFFERED=1
export PATH=/opt/miniconda3/envs/venv-py3/bin:$PATH

# functions

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return
cd $baseDir/../projects

if [[ ! -z "$1"  ]]; then

    if [ -d $1 ]; then
        echo "BOT" $1 "already exists."
        exit 1
    fi

    mkdir $1
    cd $1
    mkdir {releases,botarchive,assets}
    touch README.md
    echo "# Chatbot $1" > README.md
    cat ../../assets/tpls/README.ap >> README.md
    cp -rf ../../assets/tpls/{sample.env,scripts,botarchive,package.json,LICENSE,.gitignore,tmp} .
    cp sample.env .env
    echo `pwd` "is created."
    echo "Customize" `pwd`/.env "with your own bot."
    echo "Done."
else
    echo "Usage: $0" YOUR_BOT_NAME
    exit 1
fi

