
/**
 * @fileoverview String utility methods.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 */


/**
 * String utility methods.
 * @namespace
 */
util.String = {
  /**
   * Trims leading and trailing whitespace from the given string.
   * @param {string} str The string to trim.
   * @return {string} Returns the string stripped of whitespace.
   * @see {@link http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.20}
   */
  trim: function(str) {
    return str.trim ? str.trim() : util.String.trimRight(
        util.String.trimLeft(str));
  },

  /**
   * Removes whitespace from the left end of the string.
   * @param {string} str The string to trim.
   * @return {string} Returns the string stripped of whitespace from left end.
   */
  trimLeft: function(str) {
    return str.trimLeft ? str.trimLeft() : str.replace(/^[\s\xa0]+/, '');
  },

  /**
   * Removes whitespace from the right end of the string.
   * @param {string} str The string to trim.
   * @return {string} Returns the string stripped of whitespace from right end.
   */
  trimRight: function(str) {
    return str.trimRight ? str.trimRight() : str.replace(/[\s\xa0]+$/, '');
  }
};
