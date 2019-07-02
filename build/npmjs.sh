#!/bin/bash

readonly CWD=$(cd $(dirname $0); pwd)
readonly NPM="$(which npm)"

"${NPM}" init --force

ls -la "${CWD}"

cd "${CWD}"
"${NPM}" install --save-dev number-utils
cd "${CWD}/node_modules/number-utils"
"${NPM}" test

cd "${CWD}"
"${NPM}" install --save-dev strings-util
cd "${CWD}/node_modules/strings-util"
"${NPM}" test

cd "${CWD}"
ls -la "${CWD}/node_modules/"
rm -rf node_modules package-lock.json package.json