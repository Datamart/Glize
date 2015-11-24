#!/bin/bash
#
# Guide: https://google.github.io/styleguide/shell.xml
# Link: https://code.google.com/p/js-test-driver/

readonly CWD=$(cd $(dirname $0); pwd)
readonly LIB="${CWD}/lib"

readonly WGET="`which wget`"
readonly CURL="`which curl`"
readonly UNZIP="`which unzip`"
readonly TAR="`which tar`"
readonly NOHUP="`which nohup`"
# readonly JAVA="`which java`"

readonly JSTD_VERSION="1.3.5"
readonly JSTD_KEY="JsTestDriver"
readonly JSTD_URL="http://js-test-driver.googlecode.com/files/${JSTD_KEY}-${JSTD_VERSION}.jar"
readonly JSTD_JAR="${LIB}/${JSTD_KEY}-${JSTD_VERSION}.jar"

readonly PHANTOMJS_VERSION="1.9.1"
readonly PHANTOMJS_KEY="phantomjs"
readonly PHANTOMJS_LIB="${LIB}/${PHANTOMJS_KEY}"
readonly PHANTOMJS_URL="https://phantomjs.googlecode.com/files"
readonly PHANTOMJS_MACOS_URL="${PHANTOMJS_URL}/${PHANTOMJS_KEY}-${PHANTOMJS_VERSION}-macosx.zip"
readonly PHANTOMJS_LINUX_URL="${PHANTOMJS_URL}/${PHANTOMJS_KEY}-${PHANTOMJS_VERSION}-linux-i686.tar.bz2"
readonly PHANTOMJS_LINUX64_URL="${PHANTOMJS_URL}/${PHANTOMJS_KEY}-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2"

#
# Downloads test driver.
#
function download() {
  mkdir -p "${LIB}"

  if [[ ! -f "${LIB}/${JSTD_KEY}-$JSTD_VERSION.jar" ]]; then
    echo "Downloading ${JSTD_KEY}:"
    if [[ -n "$WGET" ]]; then
      $WGET "${JSTD_URL}" -O "${JSTD_JAR}"
    else
      $CURL -L "${JSTD_URL}" > "${JSTD_JAR}"
    fi
    echo "Done"
  fi

  if [[ ! -d "${LIB}/${PHANTOMJS_KEY}" ]]; then
    mkdir -p "${PHANTOMJS_LIB}"
    echo "Downloading ${PHANTOMJS_KEY}:"
    if [[ `uname` == "Darwin" ]]; then
      if [[ -n "$WGET" ]]; then
        $WGET "${PHANTOMJS_MACOS_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip"
      else
        $CURL -L "${PHANTOMJS_MACOS_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip"
      fi
      echo "Done"
      echo -n "Extracting ${PHANTOMJS_KEY}: "
      $UNZIP -q "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.zip" -d "${PHANTOMJS_LIB}"
    else
      if [[ `uname -m` == "x86_64" ]]; then
        if [[ -n "$WGET" ]]; then
          $WGET "${PHANTOMJS_LINUX64_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        else
          $CURL -L "${PHANTOMJS_LINUX64_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        fi
      else
        if [[ -n "$WGET" ]]; then
          $WGET "${PHANTOMJS_LINUX_URL}" -O "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        else
          $CURL -L "${PHANTOMJS_LINUX_URL}" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2"
        fi
      fi
      echo "Done"
      echo -n "Extracting ${PHANTOMJS_KEY}: "
      $TAR -xjpf "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}.tar.bz2" -C "${PHANTOMJS_LIB}"
    fi
    mv ${PHANTOMJS_LIB}/phantomjs-*/* "${PHANTOMJS_LIB}"
    rm -rf ${PHANTOMJS_LIB}/phantomjs*
    echo "Done"
  fi
}

#
# Configures tests.
#
function config() {
  echo "var page = require('webpage').create();
        var url = 'http://localhost:9876/capture';
        var attempts = 0;
        var captured = false;
        var locked = false;

        var log = function(str) {
          console.log(new Date + ': ' + str);
          console.log(navigator.userAgent);
        };

        var pageLoaded = function(status) {
          log('Finished loading ' + url + ' with status: ' + status);

          var runnerFrame = page.evaluate(function() {
            return document.getElementById('runner');
          });

          if (!runnerFrame) {
            locked = false;
            setTimeout(capture, 1E3);
          } else {
            captured = true;
          }
        };

        var capture = function() {
          if (5 === attempts) {
            log('Failed to capture JSTD after ' + attempts + ' attempts.');
            phantom.exit();
          }

          if (captured || locked) { return; }

          attempts++;
          locked = true;

          log('Attempting (' + attempts + ') to load: ' + url);
          page.open(url, pageLoaded);
        };

        capture();" > "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}-${JSTD_KEY}.js"

  echo -e "server: http://localhost:9876\nload:\n  - src/*.js\ntest:\n  - tests/*.js\ntimeout: 90" > "${LIB}/${JSTD_KEY}-${JSTD_VERSION}.conf"
}

#
# Runs tests.
#
function run() {
  local JAVA="${LIB}/java"
  if [[ ! -f "${JAVA}" ]]; then
    JAVA="$(which java)"
  fi

  echo "Starting JSTD Server"
  $NOHUP $JAVA -jar "${LIB}/${JSTD_KEY}-$JSTD_VERSION.jar" \
               --port 9876 > "${CWD}/${JSTD_KEY}.out" 2> "${CWD}/${JSTD_KEY}.err" < /dev/null &
  echo $! > "${CWD}/${JSTD_KEY}.pid"

  echo "Starting PhantomJS"
  $NOHUP "${PHANTOMJS_LIB}/bin/${PHANTOMJS_KEY}" "${PHANTOMJS_LIB}/${PHANTOMJS_KEY}-${JSTD_KEY}.js" > "${CWD}/${PHANTOMJS_KEY}.out" 2> "${CWD}/${PHANTOMJS_KEY}.err" < /dev/null &
  echo $! > "${CWD}/${PHANTOMJS_KEY}.pid"

  sleep 2
  echo "Starting Tests"
  $JAVA -jar "${JSTD_JAR}" \
        --config "${LIB}/${JSTD_KEY}-$JSTD_VERSION.conf" \
        --captureConsole \
        --tests all \
        --basePath "${CWD}/../" \
        --server http://localhost:9876 $*

  sleep 2

  echo "Killing JSTD Server"
  PID=`cat ${CWD}/${JSTD_KEY}.pid`
  kill $PID
  rm -f "${CWD}/${JSTD_KEY}.out" "${CWD}/${JSTD_KEY}.err" "${CWD}/${JSTD_KEY}.pid"

  echo "Killing PhantomJS"
  PID=`cat ${CWD}/${PHANTOMJS_KEY}.pid`
  kill $PID
  rm -f "${CWD}/${PHANTOMJS_KEY}.out" "${CWD}/${PHANTOMJS_KEY}.err" "${CWD}/${PHANTOMJS_KEY}.pid"
}

#
# The main function.
#
function main() {
  download
  config
  run
}

main "$@"
