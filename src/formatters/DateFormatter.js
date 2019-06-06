/**
 * @fileoverview Date format library.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Constructor of DateFormatter.
 * @requires locale.Calendar
 * @constructor
 */
formatters.DateFormatter = function() {

  /**
   * @type {!Object.<string, function(!Date): number>}
   */
  var NUMBER_FORMAT = {
    /**
     * @param {!Date} date The date to be formatted.
     * @return {number} Returns formatted date as number.
     */
    'YYYYMMdd': function(date) {
      return 1e4 * date.getFullYear() +
             1e2 * (date.getMonth() + 1) + date.getDate();
    },
    /**
     * @param {!Date} date The date to be formatted.
     * @return {number} Returns formatted date as number.
     */
    'YYYYMMddhhmm': function(date) {
      return 1e4 * NUMBER_FORMAT['YYYYMMdd'](date) +
             1e2 * date.getHours() + date.getMinutes();
    },
    /**
     * @param {!Date} date The date to be formatted.
     * @return {number} Returns formatted date as number.
     */
    'YYYYMMddhhmmss': function(date) {
      return 1e2 * NUMBER_FORMAT['YYYYMMddhhmm'](date) + date.getSeconds();
    }
  };

  /**
   * Formats given <code>date</code> according to given <code>format</code>.
   * @param {!Date} date The date to be formatted.
   * @param {string} format The date format.
   * @return {string} Returns formatted date as string.
   * @example
   * var formatter = new formatters.DateFormatter();
   * formatter.formatDate(new Date(), 'YYYY-MM-dd');
   * formatter.formatDate(new Date(), 'YYYY-MM-dd hh:mm');
   * formatter.formatDate(new Date(), 'dd MMM, YYYY');
   */
  this.formatDate = function(date, format) {
    /** @type {function(!Date): number} */ var fn = NUMBER_FORMAT[format];
    /** @type {number} */ var i = 0;
    /** @type {?Array.<string, number>} */ var tokens;
    /** @type {number} */ var length;
    /** @type {string} */ var month;

    if (fn) {
      format = '' + fn(date);
    } else {
      month = calendar_.getMonthName(date);
      tokens = [
        'YYYY', date.getFullYear(),
        'YY', (date.getFullYear() + '').substr(2),
        'MMMM', month,
        'MMM', month.substr(0, 3),
        'MM', ('0' + (date.getMonth() + 1)).slice(-2),
        'dd', ('0' + date.getDate()).slice(-2),
        'd', date.getDate(),
        'hh', ('0' + date.getHours()).slice(-2),
        'mm', ('0' + date.getMinutes()).slice(-2),
        'ss', ('0' + date.getSeconds()).slice(-2)
      ];
      length = tokens.length;
      for (; i < length;) {
        format = format.replace(tokens[i++], tokens[i++]);
      }
    }

    return format;
  };

  /**
   * Parses given date <code>str</code>  according to given <code>format</code>.
   * @param {string} str The date string to be parsed.
   * @param {string} format The date format.
   * @return {?Date} The parsed date.
   * @example
   * var formatter = new formatters.DateFormatter();
   * formatter.parseDate('2013-01-31', 'YYYY-MM-dd');
   * formatter.parseDate('2013-01-31 20:30', 'YYYY-MM-dd hh:mm');
   * formatter.parseDate('03 Jan, 2013', 'dd MMM, YYYY');
   */
  this.parseDate = function(str, format) {
    /** @type {!RegExp} */ var re = /[\/\s,\.\:\-]/;
    /** @type {!Array.<string>} */ var dateParts = str.split(re);
    /** @type {!Array.<string>} */ var formatParts = format.split(re);
    /** @type {!Object.<string, string>} */ var map = {};
    /** @type {number} */ var i;
    /** @type {string} */ var key;
    /** @type {number} */ var year;
    /** @type {number} */ var month;

    for (i = 0; i < Math.min(dateParts.length, formatParts.length); i++) {
      key = formatParts[i];
      if (key) map[key] = dateParts[i];
    }

    year = +(map['YYYY'] || '20' + map['YY']);
    month = +(map['MM'] || 0) - 1;
    if (map['MMMM'] || map['MMM']) {
      month = calendar_.getMonthByName(map['MMMM'] || map['MMM']);
    }

    return month >= 0 && +map['dd'] < 32 ?
        new util.Date.DateTime(
        year, month, +map['dd'], +map['hh'] || 0,
        +map['mm'] || 0, +map['ss'] || 0) : dom.NULL;
  };

  /**
   * @type {!locale.Calendar}
   * @private
   */
  var calendar_ = new locale.Calendar;
};


/**
 * Formats given <code>date</code> according to given <code>format</code>.
 * @param {!Date} date The Date to be formatted.
 * @param {string} format The date format.
 * @return {string} The formatted date as string.
 * @static
 * @example
 * formatters.DateFormatter.formatDate(new Date(), 'YYYY-MM-dd');
 * formatters.DateFormatter.formatDate(new Date(), 'YYYY-MM-dd hh:mm');
 * formatters.DateFormatter.formatDate(new Date(), 'dd MMM, YYYY');
 */
formatters.DateFormatter.formatDate = function(date, format) {
  if (!formatters.DateFormatter.formatter_) {
    formatters.DateFormatter.formatter_ = new formatters.DateFormatter;
  }

  return formatters.DateFormatter.formatter_.formatDate(date, format);
};


/**
 * Parses given date <code>str</code>  according to given <code>format</code>.
 * @param {string} str The date string to be parsed.
 * @param {string} format The date format.
 * @return {!Date} The parsed date.
 * @static
 * @example
 * formatters.DateFormatter.parseDate('2013-01-31', 'YYYY-MM-dd');
 * formatters.DateFormatter.parseDate('2013-01-31 20:30', 'YYYY-MM-dd hh:mm');
 * formatters.DateFormatter.parseDate('03 Jan, 2013', 'dd MMM, YYYY');
 */
formatters.DateFormatter.parseDate = function(str, format) {
  if (!formatters.DateFormatter.formatter_) {
    formatters.DateFormatter.formatter_ = new formatters.DateFormatter;
  }

  return formatters.DateFormatter.formatter_.parseDate(str, format);
};
