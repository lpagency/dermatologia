#!/bin/bash
# @Author: Ricardo Silva


DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
PROJECT="$(echo $(cut -d'/' -f1 <<< $(echo $DIRECTORY | rev) ) | rev)"
tag=QA
DO_TAG=ondev
add_hosts=
WORKING_DIR="/var/www/agency"
DEPLOY_KEY="$HOME/.ssh/deploy"
DEPLOY_USER="deploy"
SERVER_IPS=$(curl -XGET https://loadingplay.github.io/deploy/ondev.txt)

# read configurations
while [ "$1" != "" ]; do
    case $1 in
        -t | --tag )            shift
                                tag=$1
                                ;;
        -h | --add_hosts )      add_hosts=1
    esac
    shift
done

# switch to production configuration
if [[ $tag == "PROD" ]]; then
    DO_TAG=jedi
fi

SERVER_IPS=$(curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $DO_KEY" "https://api.digitalocean.com/v2/droplets?tag_name=$DO_TAG" | \
python3 -c "
import sys, json
json_data = json.load(sys.stdin)
for x in json_data['droplets']:
    for n in x['networks']['v4']:
        if n['type'] == 'public':
            print(n['ip_address'])
")


# add hosts if neccesary
if [[ $add_hosts ]]; then
    # only for travis
    for SERVER in $SERVER_IPS
    do
        ssh-keyscan -H $SERVER >> $HOME/.ssh/known_hosts
    done
fi

# =======================
# prepare code for upload
# =======================
mkdir -p build
tar \
    --exclude '.git' \
    --exclude '*.pyc' \
    --exclude 'venv' \
    --exclude 'docs' \
    --exclude 'node_modules' \
    --exclude 'build' \
    --exclude 'tests' \
    --exclude 'testsjs' \
    -czvf ./build/code.tar.gz ./


# ===================
# replicate on servers
# ===================
for SERVER in $SERVER_IPS
do
    echo "                                      "
    echo "  =================================== "
    echo "  starting deploy to: $SERVER         "
    echo "  =================================== "

    # create directory in remote
    ssh -i $DEPLOY_KEY $DEPLOY_USER@$SERVER "mkdir -p $WORKING_DIR/$PROJECT/"

    # copy code file
    scp -i $DEPLOY_KEY ./build/code.tar.gz $DEPLOY_USER@$SERVER:$WORKING_DIR/$PROJECT/code.tar.gz

    # untar file and build
    ssh -i $DEPLOY_KEY $DEPLOY_USER@$SERVER "
    pushd $WORKING_DIR/$PROJECT/
    tar -zxvf code.tar.gz
    bash install.sh
    echo \"flush_all\" | nc -q 1 localhost 8000
    "
done

exit 0
