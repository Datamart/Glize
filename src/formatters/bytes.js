/**
 * @fileoverview Bytes format library.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/formatters/bytes
 */


/**
 * @type {!Array<string>}
 * @inner
 */
const FORMATS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
/**
 * Formats given <code>bytes</code> to human friendly format.
 * @param {number} bytes The bytes to be formatted.
 * @return {string} The formatted bytes as string.
 * @method
 * @example
 * glize.formatters.bytes.formatBytes(1024);
 * //> 1.0 Kb
 */
export const formatBytes = (bytes) => {
  let i = 0;

  while (1023 < bytes) {
    bytes /= 1024;
    ++i;
  }

  return (i ? bytes.toFixed(2) : bytes) + ' ' + FORMATS[i];
};
  
  