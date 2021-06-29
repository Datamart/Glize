/**
 * @fileoverview String utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/utils/string
 * @requires glize/utils/number
 */

import { uint32 } from './number.js';

/**
 * Transforms the first character of each word to uppercase; other
 * characters are unaffected..
 * @param {string} str The string to be transformed.
 * @return {string} Returns transformed string.
 * @see http://www.w3.org/wiki/CSS/Properties/text-transform
 * @method
 */
export const capitalize = (str) => {
  const words = str.split(/\s+/);
  const length = uint32(words.length);

  for (let i = 0; i < length; ++i) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
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

/**
 * Converts <code>str</code> to hashed string.
 * @param {string} str The input string.
 * @return {string} Returns hashed string.
 * @method
 */
export const hash =(str) => {
  const length = uint32(str.length);
  let result = 0;
  let j = 0;

  for (let i = 0; i < length;) {
    result ^= str.charCodeAt(i++) << j;
    j += 8;
    j %= 24;
  }

  return result.toString(36).toUpperCase();
};
