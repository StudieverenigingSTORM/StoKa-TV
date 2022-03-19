#!/bin/bash

cd $(dirname $(realpath $0))
APP_DIR="$(pwd)"

if [ ! -f "config.js" ]; then
    echo "First create $(realpath config.js) based on $(realpath config.js.example)!"
    exit 1
fi

# Build app
docker run --rm --mount src="$APP_DIR",target="/app",type=bind vitalets/tizen-webos-sdk tizen package -t wgt -- /app
