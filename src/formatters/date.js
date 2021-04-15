/**
 * @fileoverview Date format library.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/formatters/date
 * @requires glize/locale
 */

import {getMonthName, getMonthByName} from '../locale/index.js';

/**
 * Static number formats that do not require parsing of the input string.
 * @enum {!Object<string, function(!Date): number>}
 * @inner
 */
const NUMBER_FORMAT = {
  /**
   * @param {!Date} date The date to be formatted.
   * @return {number} Returns formatted date as number.
   */
  'YYYYMMdd': (date) => {
      return 1e4 * date.getFullYear() +
             1e2 * (date.getMonth() + 1) + date.getDate();
  },
  /**
   * @param {!Date} date The date to be formatted.
   * @return {number} Returns formatted date as number.
   */
  'YYYYMMddhhmm': (date) => {
      return 1e4 * NUMBER_FORMAT['YYYYMMdd'](date) +
             1e2 * date.getHours() + date.getMinutes();
  },
  /**
   * @param {!Date} date The date to be formatted.
   * @return {number} Returns formatted date as number.
   */
  'YYYYMMddhhmmss': (date) => {
      return 1e2 * NUMBER_FORMAT['YYYYMMddhhmm'](date) + date.getSeconds();
  }
};

/**
 * Formats given <code>date</code> according to given <code>format</code>.
 * @param {!Date} date The date to be formatted.
 * @param {string} format The date format.
 * @return {string} Returns formatted date as string.
 * @method
 * @example
 * formatDate(new Date(), 'YYYY-MM-dd');
 * formatDate(new Date(), 'YYYY-MM-dd hh:mm');
 * formatDate(new Date(), 'dd MMM, YYYY');
 */
export const formatDate = (date, format) => {
  const fn = NUMBER_FORMAT[format];
  const pad = (num) => ('0' + num).slice(-2);

  if (fn) {
    format = '' + fn(date);
  } else {
    const month = getMonthName(date);
    const tokens = [
      'YYYY', date.getFullYear(),
      'YY', (date.getFullYear() + '').substr(2),
      'MMMM', month,
      'MMM', month.substr(0, 3),
      'MM', pad(date.getMonth() + 1),
      'dd', pad(date.getDate()),
      'd', date.getDate(),
      'hh', pad(date.getHours()),
      'mm', pad(date.getMinutes()),
      'ss', pad(date.getSeconds())
    ];

    const length = tokens.length;
    for (let i = 0; i < length;) {
      format = format.replace(tokens[i++], tokens[i++]);
    }
  }

  return format;
};

/**
 * Parses given date <code>str</code> according to given <code>format</code>.
 * @param {string} str The date string to be parsed.
 * @param {string} format The date format.
 * @return {?Date} The parsed date.
 * @method
 * @example
 * parseDate('2013-01-31', 'YYYY-MM-dd');
 * parseDate('2013-01-31 20:30', 'YYYY-MM-dd hh:mm');
 * parseDate('03 Jan, 2013', 'dd MMM, YYYY');
 */
export const parseDate = (str, format) => {
  const re = /[\/\s,\.\:\-]/;
  const dateParts = str.split(re);
  const formatParts = format.split(re);
  const map = {};

  for (let i = 0; i < Math.min(dateParts.length, formatParts.length); ++i) {
    const key = formatParts[i];
    if (key) map[key] = dateParts[i];
  }

  const year = +(map['YYYY'] || '20' + map['YY']);
  let month = +(map['MM'] || 0) - 1;
  if (map['MMMM'] || map['MMM']) {
    month = getMonthByName(map['MMMM'] || map['MMM']);
  }

  return month >= 0 && +map['dd'] < 32 ?
      new Date(
        year, month, +map['dd'], 
        +map['hh'] || 0, +map['mm'] || 0, +map['ss'] || 0) :
      null;
};
