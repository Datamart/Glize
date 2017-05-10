/**
 * @fileoverview Number utility methods.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Number utility methods.
 * @namespace
 */
util.Number = {
  /**
   * The constant represents the minimum safe integer in JavaScript:
   * <code>-(Math.pow(2, 53) - 1)</code>.
   * @const {number}
   * @see http://www.ecma-international.org/ecma-262/6.0/#sec-number-objects
   */
  MIN_SAFE_INTEGER: Number['MIN_SAFE_INTEGER'] || -9007199254740991,

  /**
   * The constant represents the maximum safe integer in JavaScript:
   * <code>Math.pow(2, 53) - 1</code>.
   * @const {number}
   * @see http://www.ecma-international.org/ecma-262/6.0/#sec-number-objects
   */
  MAX_SAFE_INTEGER: Number['MAX_SAFE_INTEGER'] || 9007199254740991,

  /**
   * Determines whether the passed value is an integer.
   * @param {*} value The value to be tested for being an integer.
   * @return {boolean} Return <code>true</code> if value is an integer.
   * @see http://www.ecma-international.org/ecma-262/6.0/#sec-number.isinteger
   */
  isInteger: function(value) {
    /** @type {function(*):boolean} */ var fn = Number['isInteger'];

    return fn ? fn(value) : ('number' === typeof value &&
                             isFinite(value) &&
                             Math.floor(value) === value);
  },

  /**
   * Determines whether the provided value is a number that is a safe integer.
   * @param {*} value The value to be tested for being a safe integer.
   * @return {boolean} Return true if value is a number that is a safe integer.
   * @see http://www.ecma-international.org/ecma-262/6.0/#sec-number-objects
   */
  isSafeInteger: function(value) {
    /** @type {function(*):boolean} */ var fn = Number['isSafeInteger'];

    return fn ? fn(value) : (util.Number.isInteger(value) &&
        util.Number.MIN_SAFE_INTEGER <= /** @type {number} */ (value) &&
        util.Number.MAX_SAFE_INTEGER >= /** @type {number} */ (value));
  },

  /**
   * Returns a random integer greater than or equal to {@code min} and
   * less than or equal {@code max}.
   * @param {number} min The lower bound for the random integer.
   * @param {number} max The upper bound for the random integer.
   * @return {number} Returns a random integer.
   */
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};
