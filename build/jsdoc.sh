#!/usr/bin/env bash

# https://github.com/jsdoc3/jsdoc
# https://code.google.com/p/jsdoc-toolkit/wiki/CommandlineOptions
# http://google.github.io/styleguide/shell.xml

echo -n "Running jsdoc. "
JSDOC_PATH="./lib/jsdoc-master/jsdoc"
TEMPLATE="./lib/jsdoc-master/templates/haruki"
CSS_PATH="./lib/jsdoc-master/templates/default/static/styles/jsdoc-default.css"
SRC_PATH="../src/**/*.js"
DOC_PATH="../docs"
DOWNLOAD_URL=https://codeload.github.com/jsdoc3/jsdoc/zip/master
WGET="`which wget`"
CURL="`which curl`"
LOGO=".page-title {
        background: url(http://datamart.github.io/Glize/images/glize-logo.png)
        no-repeat left center/48px;
        padding-left: 55px;}"


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
    echo ${LOGO} >> ${CSS_PATH}
    cd ../ && rm -rf tmp
fi

rm -rf ${DOC_PATH} && mkdir ${DOC_PATH}

${JSDOC_PATH} ${SRC_PATH} -d ${DOC_PATH}

echo "Done"
