#!/bin/bash

readonly CWD=$(cd $(dirname $0); pwd)
readonly NPM="$(which npm)"

"${NPM}" init --force

cd "${CWD}"
"${NPM}" install number-utils
cd node_modules/number-utils
"${NPM}" test

cd "${CWD}"
"${NPM}" install strings-util
cd node_modules/strings-util
"${NPM}" test

cd "${CWD}"
rm -rf node_modules package-lock.json package.json