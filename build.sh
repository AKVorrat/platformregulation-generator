#!/usr/bin/env bash

FOLDER=text
OUTPUT=output

if [ ! -d "$FOLDER" ] ; then
  echo "[Preg] Clone text repository"
  git clone git@github.com:akvorrat/platformregulation-text.git $FOLDER
else
  echo "[Preg] Pull text changes"
  cd "$FOLDER"
  git pull
  cd ..
fi

mkdir -p $OUTPUT

echo "[Preg] Generate html from text"
pandoc -s $FOLDER/text.md --template template.html --number-offset -1 --toc --section-divs -o $OUTPUT/index.html

echo "[Preg] Copy assets"
cp -r assets $OUTPUT

echo "[Preg] Get version number"
VERSION="$(awk -F '"' '/^version/ { print $2 }' $FOLDER/text.md)"

echo "[Preg] Generate PDF from text"
mkdir -p $OUTPUT/assets/docs
pandoc -s $FOLDER/text.md --pdf-engine weasyprint --template template.html --number-offset -1 --toc --section-divs -o $OUTPUT/assets/docs/platformregulation-v$VERSION.pdf
ln -sf platformregulation-v$VERSION.pdf $OUTPUT/assets/docs/platformregulation-latest.pdf

echo "[Preg] Success! Bundle available at ./$OUTPUT"

if [ "$1" != "" -a "$1" == "-u" ]; then
  if [ -e upload.sh ]; then
    ./upload.sh
  else
    echo "[Preg] Error: upload.sh missing"
  fi
fi
