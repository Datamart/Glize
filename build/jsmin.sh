#!/bin/bash
#
# Guide: https://google.github.io/styleguide/shell.xml
# Link: https://developers.google.com/closure/compiler/

readonly CWD=$(cd $(dirname $0); pwd)
readonly LIB="${CWD}/lib"
readonly TMP="${CWD}/tmp"

readonly JS_COMPILER_ZIP="compiler-latest.zip"
readonly JS_COMPILER_URL="http://dl.google.com/closure-compiler/${JS_COMPILER_ZIP}"
readonly JS_COMPILER_JAR="${LIB}/compiler.jar"

readonly JS_COMPILED="${CWD}/../bin/glize.js"
readonly JS_SOURCES="${CWD}/../src"

readonly WGET="`which wget`"
readonly CURL="`which curl`"
readonly JAVA="`which java`"
readonly PYTHON="`which python`"

readonly LICENSE="/* @license http://www.apache.org/licenses/LICENSE-2.0 */"

# http://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
readonly NEW_LINE=$'\n'

function main() {
  echo -n "Running closure compiler. "

  if [ ! -f "${JS_COMPILER_JAR}" ]; then
      mkdir -p "${LIB}"
      rm -rf "${TMP}" && mkdir "${TMP}" && cd "${TMP}"
      if [ -n "$WGET" ]; then
          $WGET "${JS_COMPILER_URL}" -O "${TMP}/${JS_COMPILER_ZIP}"
      else
          $CURL "${JS_COMPILER_URL}" > "${TMP}/${JS_COMPILER_ZIP}"
      fi
      unzip "${TMP}/${JS_COMPILER_ZIP}" -d "${LIB}"
      cd "${CWD}" && rm -rf "${TMP}"
  fi

  rm -rf "${JS_COMPILED}" && touch "${JS_COMPILED}" && chmod 0666 "${JS_COMPILED}"

  $PYTHON -c "import sys;sys.argv.pop(0);print(' --js ' + ' --js '.join(sorted(sys.argv, cmp=lambda x,y: cmp(x.lower(), y.lower()))))" `find "${JS_SOURCES}" -name "*.js" -print` |
      xargs $JAVA -jar "${JS_COMPILER_JAR}" \
        --compilation_level ADVANCED_OPTIMIZATIONS \
        --warning_level VERBOSE \
        --charset UTF-8 \
        --use_types_for_optimization \
        --externs "${CWD}/externs.js" \
        --js_output_file "${JS_COMPILED}"

  echo "${LICENSE}${NEW_LINE}(function(){" | cat - $JS_COMPILED > /tmp/out && mv /tmp/out $JS_COMPILED
  echo '})();' >> $JS_COMPILED

  echo "Done"
}

main "$@"