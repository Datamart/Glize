/**
 * @fileoverview Formatters-related utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://github.com/Datamart/bytes-formatter
 * @module glize/formatters
 */

import { formatBytes } from 'bytes-formatter';
import { formatDate, parseDate } from './date.js';
import { formatNumber, roundNumber, ordinal } from './number.js';

export {
  /**
   * Formats given <code>bytes</code> to human friendly format.
   * @param {number} bytes The bytes to be formatted.
   * @return {string} The formatted bytes as string.
   * @see https://github.com/Datamart/bytes-formatter
   * @method
   * @example
   * formatBytes(1024); // 1.0 Kb
   */
  formatBytes,
  formatDate, parseDate,
  formatNumber, roundNumber, ordinal
};
