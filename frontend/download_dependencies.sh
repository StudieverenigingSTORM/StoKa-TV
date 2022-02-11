#! /bin/sh

set -e

SCRIPT="$(realpath $0)"
SCRIPTPATH="$(dirname $SCRIPT)"
cd "$SCRIPTPATH"

mkdir -p src
cd src

# TODO replace with minified/production versions
wget -nv -O require.js https://requirejs.org/docs/release/2.3.6/minified/require.js
wget -nv -O react.js https://unpkg.com/react@17/umd/react.development.js
wget -nv -O react-dom.js https://unpkg.com/react-dom@17/umd/react-dom.development.js
