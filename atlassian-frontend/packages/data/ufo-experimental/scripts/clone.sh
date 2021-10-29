#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SOURCE_DIR="$DIR/../src"
DEST_DIR="$DIR/../../ufo-external"

echo "Copy from $SOURCE_DIR"
echo "Copy to $DEST_DIR"

[ -d $DEST_DIR ] && echo "Directory $DEST_DIR exists."

cp -rf $SOURCE_DIR $DEST_DIR
