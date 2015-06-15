
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
  },

  /**
   * Checks whether {@code str} starts with {@code prefix}.
   * @param {string} str The string to be checked.
   * @param {string} prefix A string to look for at the start of {@code str}.
   * @return {boolean} Returns {@code true} if string {@code str} starts with
   * the {@code prefix}.
   */
  startsWith: function(str, prefix) {
    return 0 === str.lastIndexOf(prefix, 0);
  },

  /**
   * Checks whether {@code str} ends with {@code suffix}.
   * @param {string} str The string to be checked.
   * @param {string} suffix A string to look for at the end of {@code str}.
   * @return {boolean} Returns {@code true} if string {@code str} ends with
   * the {@code suffix}.
   */
  endsWith: function(str, suffix) {
    /** @type {number} */ var index = str.lastIndexOf(suffix);
    return index >= 0 && index === str.length - suffix.length;
  }
};
