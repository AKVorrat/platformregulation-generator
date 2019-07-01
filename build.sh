#!/usr/bin/env bash

FOLDER=text

if [ ! -d "$FOLDER" ] ; then
  echo "[Preg] Clone text repository"
  git clone git@github.com:burnoutberni/platformregulation-text.git $FOLDER
else
  echo "[Preg] Pull text changes"
  cd "$FOLDER"
  git pull
  cd ..
fi

rm -rf output
mkdir output

echo "[Preg] Generate html from text"
pandoc -s text/text.md --template template.html --number-offset -1 --toc --section-divs -o output/index.html

echo "[Preg] Copy assets"
cp -r assets output

echo "[Preg] Done! Bundle available at ./output"
