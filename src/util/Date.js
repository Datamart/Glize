
/**
 * @fileoverview Date utility methods.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Date utility methods.
 * @namespace
 */
util.Date = {
  /**
   * Shortcut for <code>Date</code> constructor.
   * Used to reduce size after compilation.
   * @constructor
   */
  DateTime: Date,

  /**
   * Shortcut for <code>new Date()</code>.
   * Used to reduce size after compilation.
   * @return {!Date} Returns current <code>Date</code> object.
   */
  getDate: function() {
    return new util.Date.DateTime;
  },

  /**
   * @return {number} Returns the number of milliseconds elapsed since
   *                  1 January 1970 00:00:00 UTC.
   * @see https://es5.github.io/x15.9.html#x15.9.4.4
   */
  now: function() {
    return +util.Date.getDate();
  },

  /**
   * Converts a <code>date</code> object into a string using the ISO standard.
   * @param {!Date} date The date to format.
   * @return {string} Returns a string in simplified extended ISO format.
   * @see https://es5.github.io/x15.9.html#x15.9.5.43
   * @see https://en.wikipedia.org/wiki/ISO_8601
   */
  toISOString: function(date) {
    /** @type {Function} */ var fn = date.toISOString;

    return fn ? fn.call(date) :
        (1e3 - ~date.getUTCMonth() * 10 + date.toUTCString() + 1e3 + date / 1).
        replace(/1(..).*?(\d\d)\D+(\d+).(\S+).*(...)/, '$3-$1-$2T$4.$5Z');
  }
};
