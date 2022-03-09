#!/bin/bash

set -e

cd $(dirname $(realpath $0))

CONVERT="convert"

rm -rf media
mkdir media
cd media

generateImage() {
    convert -size 1920x1080 xc:black +repage -size 1720x880 -fill white -background None -font Helvetica -gravity center caption:"$2" +repage -gravity Center -composite -strip $1.jpg
}

echo "Generating borrel menu..."
generateImage "borrel-menu" "Borrel menu"

echo "Generating implicit arrangement example..."
ARRANGEMENT="example_implicit"
mkdir $ARRANGEMENT
cd $ARRANGEMENT
for i in $(seq 1 5); do
    generateImage "$i" "example implicit: Image $i"
done
cd ..

echo "Generating hidden arrangement example..."
ARRANGEMENT=".example_hidden"
mkdir $ARRANGEMENT
cd $ARRANGEMENT
for i in $(seq 1 5); do
    generateImage "$i" "example hidden: Image $i"
done
cd ..

echo "Generating numbered arrangement examples..."
for j in $(seq 1 5); do
    echo " - $j..."
    mkdir "${j}_example_numbered"
    cd "${j}_example_numbered"
    ARRANGEMENT="numbered #$j"
    for i in $(seq 1 5); do
        generateImage "$i" "$ARRANGEMENT: Image $i"
    done
        echo "title: \"$ARRANGEMENT\"" > arrangement.yaml
        echo "items:" >> arrangement.yaml
    for i in $(seq 5 -1 1); do
        echo "- file: $i.jpg" >> arrangement.yaml
        echo "  duration: 2" >> arrangement.yaml
    done
    cd ..
done

echo "Done!"
