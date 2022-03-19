#!/bin/bash

TARGET=$1

if [ -z $TARGET ]; then
    echo "Variable TARGET must not be empty!"
    exit 1
fi

cd $(dirname $(realpath $0))
APP_DIR="$(pwd)"
APP="StoKa-TV.wgt"

if [ ! -f $APP ]; then
    echo "$APP was not found! Did you forget to build it first?"
    exit 1
fi

# Install app
docker run --rm --network host --mount src="$APP_DIR",target="/app",type=bind vitalets/tizen-webos-sdk bash -c "echo \"Connecting to $TARGET...\" && sdb connect $TARGET | grep connected && tizen install -s $TARGET:26101 --name $APP -- /app"
