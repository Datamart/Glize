/**
 * @fileoverview Number utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/utils/number
 * @suppress {misplacedTypeAnnotation}
 */

import { uint8, uint16, uint32, MAX_UINT8, MAX_UINT16, MAX_UINT32 } from 'uint';

export {
  /**
   * Maximum value for unsigned 8-bit integer.
   * @type {number}
   */
  MAX_UINT8,
};

export {
  /**
   * Maximum value for unsigned 16-bit integer.
   * @type {number}
   */
  MAX_UINT16,
};

export {
  /**
   * Maximum value for unsigned 32-bit integer.
   * @type {number}
   */
  MAX_UINT32,
};

export {
  /**
   * Converts given <code>number</code> to unsigned int8.
   * @param {number} number The number to be converted.
   * @return {number} The unsigned (zero or positive) number.
   * @method
   * @example
   * import { uint8 } from 'uint';
   * uint8(0);    //> 0
   * uint8(1);    //> 1
   * uint8(255);  //> 255
   * uint8(-5);   //> NaN
   */
  uint8,
};

export {
  /**
   * Converts given <code>number</code> to unsigned int16.
   * @param {number} number The number to be converted.
   * @return {number} The unsigned (zero or positive) number.
   * @method
   * @example
   * import { uint16 } from 'uint';
   * uint16(0);     //> 0
   * uint16(1);     //> 1
   * uint16(65535); //> 65535
   * uint16(-5);    //> NaN
   */
  uint16,
};

export {
  /**
   * Converts given <code>number</code> to unsigned int32.
   * @param {number} number The number to be converted.
   * @return {number} The unsigned (zero or positive) number.
   * @method
   * @example
   * import { uint32 } from 'uint';
   * uint32(0);          //> 0
   * uint32(1);          //> 1
   * uint32(4294967295); //> 4294967295
   * uint32(-5);         //> NaN
   */
  uint32,
};

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
