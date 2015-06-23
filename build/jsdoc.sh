#!/usr/bin/env bash

# https://github.com/jsdoc3/jsdoc
# https://code.google.com/p/jsdoc-toolkit/wiki/CommandlineOptions
# http://google.github.io/styleguide/shell.xml

echo -n "Running jsdoc. "
JSDOC_PATH="./lib/jsdoc-master/jsdoc"
OUTPUT_PATH="./jsdoc-master.zip"
TEMPLATE="./lib/jsdoc-master/templates/haruki"
CSS_PATH="./lib/jsdoc-master/templates/default/static/styles/jsdoc-default.css"
SRC_PATH="../src"
DOC_PATH="../docs"
CONF_PATH="../jsDocConf.json"
DOWNLOAD_URL=https://codeload.github.com/jsdoc3/jsdoc/zip/master
WGET="`which wget`"
CURL="`which curl`"
LOGO=".page-title {
        background: url(http://datamart.github.io/Glize/images/glize-logo.png)
        no-repeat left center/48px;
        padding-left: 55px;}"


if [ ! -f "${JSDOC_PATH}" ]; then
    mkdir -p lib
    rm -rf tmp && mkdir tmp && cd tmp
    if [ -n "$WGET" ]; then
        $WGET "${DOWNLOAD_URL}" -O "${OUTPUT_PATH}"
    else
        $CURL "${DOWNLOAD_URL}" > "${OUTPUT_PATH}"
    fi
    unzip "${OUTPUT_PATH}" -d ../lib
    echo ${LOGO} >> ${CSS_PATH}
    cd ../ && rm -rf tmp
fi

rm -rf ${DOC_PATH} && mkdir ${DOC_PATH}

${JSDOC_PATH} ${SRC_PATH} -r -c ${CONF_PATH} -d ${DOC_PATH}

echo "Done"
