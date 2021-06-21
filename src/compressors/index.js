/**
 * @fileoverview Defines compressors utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/compressors
 */

import * as lzw from 'lzw-compressor';

/**
 * Enumeration of available compression types.
 * @enum {string}
 */
export const TYPE = {
  LZW: 'lzw'
};

/**
 * Compress data string using specified compression type.
 * @param {string} data Data to compress.
 * @param {string=} [opt_type=TYPE.LZW] Optional compression type.
 * @return {string} Returns compressed data.
 * @method
 * @example
 * const result = compress(
 *   'Any string of any length. Any string of any length. Any string of any length.');
 * console.log(result);
 * //> Any string of aā leĈth. ĀĂĄĆĈĊČĎĂđēĕėďĚćĉċčďġgĔ.
 */
export const compress = (data, opt_type = TYPE.LZW) => {
  let result = '';

  if (TYPE.LZW === opt_type) {
    result = lzw.compress(data);
  }

  return result;
};

/**
 * Decompress data string using specified compression type.
 * @param {string} data Data to compress.
 * @param {string=} [opt_type=TYPE.LZW] Optional compression type.
 * @return {string} Returns compressed data.
 * @method
 * @example
 * const result = decompress('Any string of aā leĈth. ĀĂĄĆĈĊČĎĂđēĕėďĚćĉċčďġgĔ.');
 * console.log(result);
 * //> Any string of any length. Any string of any length. Any string of any length.
 */
export const decompress = (data, opt_type = TYPE.LZW) => {
  let result = '';

  if (TYPE.LZW === opt_type) {
    result = lzw.decompress(data);
  }

  return result;
};
