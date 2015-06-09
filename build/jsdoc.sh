#!/usr/bin/env bash

# https://jsdoc-toolkit.googlecode.com/files/jsdoc_toolkit-2.4.0.zip
# https://code.google.com/p/jsdoc-toolkit/wiki/CommandlineOptions

echo -n "Running jsdoc. "
JSDOC_PATH="./lib/jsdoc-master/jsdoc"
TEMPLATE="./lib/jsdoc-master/templates/haruki"
SRC_PATH="../src/**/*.js"
DOC_PATH="../docs"
DOWNLOAD_URL=https://codeload.github.com/jsdoc3/jsdoc/zip/master
WGET="`which wget`"
CURL="`which curl`"


if [ ! -f "${JSDOC_PATH}" ]
then
    mkdir -p lib
    rm -rf tmp && mkdir tmp && cd tmp
    if [ -n "$WGET" ]; then
        $WGET "${DOWNLOAD_URL}"
    else
        $CURL "${DOWNLOAD_URL}" > jsdoc-master.zip
    fi
    unzip jsdoc-master.zip -d ../lib
    cd ../ && rm -rf tmp
fi

rm -rf ${DOC_PATH} && mkdir ${DOC_PATH}

${JSDOC_PATH} ${SRC_PATH} -d ${DOC_PATH}

echo "Done"
