/**
 * @fileoverview Defines compressors utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/compressors
 */


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
 * @param {string=} opt_type Optional compression type.
 * @return {string} Returns compressed data.
 * @method
 * @example <caption>Usage example.</caption>
 * const result = glize.compress(
 *   'Any string of any length. Any string of any length. Any string of any length.');
 * console.log(result);
 * > Any string of aā leĈth. ĀĂĄĆĈĊČĎĂđēĕėďĚćĉċčďġgĔ.
 */
export const compress = (data, opt_type = TYPE.LZW) => {
  let result = '';

  if (TYPE.LZW === opt_type) {
    result = LZW.compress(data);
  }

  return result;
};

/**
 * Decompress data string using specified compression type.
 * @param {string} data Data to compress.
 * @param {string=} opt_type Optional compression type.
 * @return {string} Returns compressed data.
 * @method
 */
 export const decompress = (data, opt_type = TYPE.LZW) => {
  let result = '';

  if (TYPE.LZW === opt_type) {
    result = LZW.decompress(data);
  }

  return result;
}

/**
 * LZW compression utility.
 * @inner
 * @see http://en.wikipedia.org/wiki/Lempel–Ziv–Welch
 */
const LZW = {
  /**
   * Encodes string using LZW algorithm.
   * @param {string} str The input string.
   * @return {string} Returns compressed string using LZW algorithm.
   * @method
   */
  compress: (str) => {
    const dict = {};
    const data = str.split('');
    const out = [];
    let code = 256;
    let phrase = data.shift();

    while (data.length) {
      const next = data.shift();
      if (null != dict[phrase + next]) {
        phrase += next;
      } else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        dict[phrase + next] = code++;
        phrase = next;
      }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (let i = 0; i < out.length; i++) {
      out[i] = String.fromCharCode(/** @type {number} */ (out[i]));
    }

    return out.join('');
  },

  /**
   * Decodes string encoded with LZW algorithm.
   * @param {string} str The input string encoded with LZW algorithm.
   * @return {string} Returns decoded string.
   * @method
   */
  decompress: (str) => {
    const dict = {};
    const data = str.split('');
    const out = [data.shift()];
    let code = 256;
    let chr = out[0];
    let tmp = chr;

    for (let i = 0; i < data.length; i++) {
      const next = data[i].charCodeAt(0);
      const phrase = next < 256 ? 
          data[i] : 
          (dict[next] ? dict[next] : (tmp + chr));
      out.push(phrase);
      chr = phrase.charAt(0);
      dict[code++] = tmp + chr;
      tmp = phrase;
    }

    return out.join('');
  }
};
