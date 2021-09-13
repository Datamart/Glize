/**
 * @fileoverview String utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/utils/string
 * @suppress {misplacedTypeAnnotation}
 */

import { capitalize, hash, toCamelCase, toPascalCase } from 'string-transform';

export {
  /**
   * Transforms the first character of each word to uppercase; other
   * characters are unaffected.
   * @param {string} str The string to be transformed.
   * @return {string} Returns transformed string.
   * @see http://www.w3.org/wiki/CSS/Properties/text-transform
   * @method
   */
  capitalize
};

export {
  /**
   * Converts <code>str</code> to hashed string.
   * @param {string} str The input string.
   * @return {string} Returns hashed string.
   * @method
   */
  hash
};

export {
  /**
   * Converts the passed string into a string with the separator denoted by the 
   * next word capitalized (aka lower camel case).
   * @param {string} str The input string.
   * @return {string} A string convered into a string with the separator 
   * denoted by the next word capitalized.
   * @see https://en.wikipedia.org/wiki/Camel_case
   * @method
   */
  toCamelCase
};

export {
  /**
   * Converts the passed string into a string of capitalized words without 
   * separators (aka upper camel case).
   * @param {string} str The input string.
   * @return {string} A string convered into a string of capitalized words 
   * without separators.
   * @see https://en.wikipedia.org/wiki/PascalCase
   * @method
   */
  toPascalCase 
};

/**
 * Converts <code>obj</code> to query string.
 * @param {!Object} obj The key-value pairs object.
 * @param {string=} prefix Optional query prefix.
 * @return {string} Returns query string or empty string if no parameters
 *     given.
 * @method
 */
export const toQueryString = (obj, prefix = '?') => {
  let result = prefix;

  for (let key in obj) {
    result += encodeURIComponent(key) + '=' + 
              encodeURIComponent(obj[key]) + '&';
  }

  return result.slice(0, -1);
};

/**
 * Generates a pseudo random UUID (v4).
 * @return {string} Returns generated random UUID.
 * @link http://en.wikipedia.org/wiki/Universally_unique_identifier
 * @link http://en.wikipedia.org/wiki/Globally_unique_identifier
 * @link http://www.ietf.org/rfc/rfc4122.txt
 * @method
 */
export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return ('x' == c ? r : (r & 0x3 | 0x8)).toString(16);
  });
};
