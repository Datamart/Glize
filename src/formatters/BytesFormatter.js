
/**
 * @fileoverview Bytes format library.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Constructor of BytesFormatter.
 * @constructor
 */
formatters.BytesFormatter = function() {

  /**
   * @type {!Array.<string>}
   * @const
   */
  var FORMATS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  /**
   * Formats given <code>bytes</code> to human friendly format.
   * @param {number} bytes The bytes to be formatted.
   * @return {string} The formatted bytes as string.
   * @example
   * var formatter = new formatters.BytesFormatter();
   * formatter.formatBytes(1024); // 1.0 Kb
   */
  this.formatBytes = function(bytes) {
    /** @type {number} */ var i = 0;
    while (1023 < bytes) {
      bytes /= 1024;
      ++i;
    }
    return (i ? bytes.toFixed(2) : bytes) + ' ' + FORMATS[i];
  };

  /**
   * @deprecated Use `formatBytes` instead.
   */
  this.format = this.formatBytes;
};


/**
 * Formats given <code>bytes</code> to human friendly format.
 * @param {number} bytes The bytes to be formatted.
 * @return {string} The formatted bytes as string.
 * @static
 * @example
 * var formatter = new formatters.BytesFormatter();
 * formatter.formatBytes(1024); // 1.0 Kb
 */
formatters.BytesFormatter.formatBytes = function(bytes) {
  if (!formatters.BytesFormatter.formatter_) {
    formatters.BytesFormatter.formatter_ = new formatters.BytesFormatter;
  }
  return formatters.BytesFormatter.formatter_.formatBytes(bytes);
};


/**
 * @deprecated Use `formatters.BytesFormatter.formatBytes` instead.
 */
formatters.BytesFormatter.format = formatters.BytesFormatter.formatBytes;
