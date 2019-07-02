#!/bin/bash

readonly CWD=$(cd $(dirname $0); pwd)
readonly NPM="$(which npm)"

"${NPM}" init --force
"${NPM}" i number-utils
"${NPM}" i strings-util

rm -rf node_modules package-lock.json package.json