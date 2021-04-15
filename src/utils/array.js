/**
 * @fileoverview Array utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/utils/array
 */


/**
 * Checks if array contains the given element.
 * @param {!Array} arr The array to test for the presence of the element.
 * @param {*} element The element to search.
 * @return {boolean} Returns <code>true</code> if element is present.
 * @method
 */
export const contains = (arr, element) => 0 <= arr.indexOf(element);

/**
 * Gets random element from array.
 * @param {!Arguments|!Array|!NodeList|string} obj The array-like object.
 * @return {*} Returns random element from array <code>obj</code>.
 * @method
 */
export const random = (obj) => {
  const list = toArray(obj);
  return list[Math.random() * list.length | 0];
};

/**
 * Converts object <code>obj</code> to <code>Array</code>.
 * @param {!Arguments|!Array|!NodeList|string} obj The array-like object.
 * @return {!Array} Returns <code>obj</code> converted to <code>Array</code>.
 * @method
 */
export const toArray = (obj) => {
  return Array.isArray(obj) ?
      /** @type {!Array} */ (obj) : Array.prototype.slice.call(obj);
};
