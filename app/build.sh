#!/bin/bash

cd $(dirname $(realpath $0))
APP_DIR="$(pwd)"

if [ ! -f "config.js" ]; then
    echo "First create $(realpath config.js) based on $(realpath config.js.example)!"
    exit 1
fi

# Delete any previous build
echo "$APP_DIR/$(ls "$APP_DIR/" | grep ".wgt$")" | xargs rm 2>/dev/null
# Build app
sudo docker run --rm --mount src="$APP_DIR",target="/app",type=bind vitalets/tizen-webos-sdk tizen package -t wgt -- /app
