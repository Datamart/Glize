/**
 * @fileoverview Number format library.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/formatters/number
 */


/**
 * Formats given number according to given options.
 * @param {number} number The number to be formatted.
 * @param {!Object<string, *>=} opt_options Formatting options.
 * @return {string} The formatted number string.
 * @method
 * @example
 * formatNumber(100);   // 100
 * formatNumber(1000);  // 1,000
 * formatNumber(1500);  // 1,500
 * formatNumber(10000); // 10,000
 * formatNumber(1e6);   // 1,000,000
 * const options = {'prefix': '$'};
 * formatNumber(100, options);   // $100
 * formatNumber(1e6, options);   // $1,000,000
 */
export const formatNumber = (number, opt_options) => {
  const options = getOptions_(opt_options);
  const result = (options['fraction'] ? 
      number.toFixed(options['fraction']) :
      '' + number).split('.');

  return options['prefix'] +
      result[0].replace(/\B(?=(\d{3})+(?!\d))/g,
      /** @type {string} */ (options['grouping'])) +
      (result[1] ? options['decimal'] + result[1] : '') +
      options['suffix'];
};

/**
 * Rounds given number.
 * @param {number} number The number to be rounded.
 * @param {!Object<string, *>=} opt_options Formatting options.
 * @return {string} The rounded number string.
 * @method
 * @example
 * roundNumber(100);   // 100
 * roundNumber(1000);  // 1k
 * roundNumber(1500);  // 1.5k
 * roundNumber(10000); // 10k
 * roundNumber(1e6);   // 10m
 * const options = {'prefix': '$'};
 * roundNumber(100, options);   // $100
 * roundNumber(1e6, options);   // $10m
 */
export const roundNumber = (number, opt_options) => {
  const options = getOptions_(opt_options);
  // parseInt(number, 10) == ~~number
  const base = (~~number + '').length - (number < 0 ? 2 : 1);
  const length = ~~(base / 3) * 3;
  let divider = 1;

  for (let i = 0; i < length; ++i) {
    divider *= 10;
  }

  const delta = number / divider;
  const a = ~~delta;
  const b = delta.toFixed(2 - base % 3);

  const result = (a == b ? a : b) + ['', 'k', 'm', 'g', 't'][~~(base / 3)];
  return options['prefix'] + result + options['suffix'];
};

/**
 * Gets the ordinal suffix for a number.
 * @param {number} number The number.
 * @return {string} Returns the ordinal suffix for a number.
 * @method
 */
export const ordinal = (number) => {
  const index = (
      number = ~~(number < 0 ? -number : number) % 100) > 10 &&
      number < 14 || (number %= 10) > 3 ? 0 : number;

  return ['th', 'st', 'nd', 'rd'][index];
};

/**
 * @param {!Object<string, *>} options Formatting options.
 * @return {!Object<string, *>} Returns formatting options.
 * @private
 */
const getOptions_ = (options = {}) => {
  for (let key in defaults_) {
    if (!(key in options)) {
      options[key] = defaults_[key];
    }
  }
  return options;
};

/**
 * Default formatting options.
 * @type {!Object<string, *>}
 * @private
 */
const defaults_ = {
  'decimal': '.',
  'grouping': ',',
  'fraction': 0,
  'prefix': '',
  'suffix': ''
};
