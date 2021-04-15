/**
 * @fileoverview Number utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/utils/number
 */


/**
 * Returns a random integer greater than or equal to <code>min</code> and
 * less than or equal <code>max</code>.
 * @param {number} min The lower bound for the random integer.
 * @param {number} max The upper bound for the random integer.
 * @return {number} Returns a random integer.
 * @method
 */
export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
