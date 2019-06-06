/**
 * @fileoverview Number format library.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Constructor of NumberFormatter.
 * @param {!Object.<string, *>=} opt_options Formatter options.
 * @constructor
 * @example
 * options: {
 *   'decimal': '.', 'grouping': ',', 'fraction': 0, 'prefix': '', 'suffix': ''
 * }
 */
formatters.NumberFormatter = function(opt_options) {

  /**
   * Formats given number according to given options.
   * @param {number} number The number to be formatted.
   * @return {string} The formatted number string.
   * @example
   * var formatter = new formatters.NumberFormatter();
   * formatter.formatNumber(100);   // 100
   * formatter.formatNumber(1000);  // 1,000
   * formatter.formatNumber(1500);  // 1,500
   * formatter.formatNumber(10000); // 10,000
   * formatter.formatNumber(1e6);   // 1,000,000
   * var options = {'prefix': '$'};
   * var formatter = new formatters.NumberFormatter(options);
   * formatter.formatNumber(100);   // $100
   * formatter.formatNumber(1e6);   // $1,000,000
   */
  this.formatNumber = function(number) {
    /** @type {!Object.<string, *>} */ var options = getOptions_();

    /** @type {!Array.<string>} */
    var result = (options['fraction'] ? number.toFixed(options['fraction']) :
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
   * @return {string} The rounded number string.
   * @example
   * var formatter = new formatters.NumberFormatter();
   * formatter.roundNumber(100);   // 100
   * formatter.roundNumber(1000);  // 1k
   * formatter.roundNumber(1500);  // 1.5k
   * formatter.roundNumber(10000); // 10k
   * formatter.roundNumber(1e6);   // 10m
   * var options = {'prefix': '$'};
   * var formatter = new formatters.NumberFormatter(options);
   * formatter.roundNumber(100);   // $100
   * formatter.roundNumber(1e6);   // $10m
   */
  this.roundNumber = function(number) {
    // parseInt(number, 10) == ~~number
    /** @type {!Object.<string, *>} */ var options = getOptions_();
    /** @type {number} */
    var base = (~~number + '').length - (number < 0 ? 2 : 1);
    /** @type {number} */ var divider = 1;
    /** @type {number} */ var length = ~~(base / 3) * 3;
    /** @type {number} */ var i = 0;
    for (; i < length; i++)
      divider *= 10;

    /** @type {number} */ var delta = number / divider;
    /** @type {number} */ var a = ~~delta;
    /** @type {string} */ var b = delta.toFixed(2 - base % 3);

    /** @type {string} */
    var result = (a == b ? a : b) + ['', 'k', 'm', 'g', 't'][~~(base / 3)];
    return options['prefix'] + result + options['suffix'];
  };

  /**
   * @param {number} number The number.
   * @return {string} Returns the ordinal suffix for a number.
   */
  this.ordinal = function(number) {
    var index = (
        number = ~~(number < 0 ? -number : number) % 100) > 10 &&
        number < 14 || (number %= 10) > 3 ? 0 : number;

    return ['th', 'st', 'nd', 'rd'][index];
  };

  /**
   * @return {!Object.<string, *>} Returns formatter options.
   * @private
   */
  function getOptions_() {
    opt_options = opt_options || {};
    for (/** @type {string} */ var key in defaults_) {
      if (!(key in opt_options)) {
        opt_options[key] = defaults_[key];
      }
    }
    return opt_options;
  }

  /**
   * Default formatting options.
   * @dict
   * @type {!Object.<string, *>}
   * @private
   */
  var defaults_ = {
    'decimal': '.',
    'grouping': ',',
    'fraction': 0,
    'prefix': '',
    'suffix': ''
  };
};
