#!/bin/sh

# clean
rm -rf build
mkdir build

cp -r src build/
cp -r statics build/
cp -r assets build/
cp manifest.json build/

(cd build && zip release.zip -r ./)

