/**
 * @fileoverview Date utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/utils/date
 */


/**
 * Converts 24-hour time string to 12-hour time string.
 * @param {string} time The time string ("00:30", "01:45", "12:00", "22:15").
 * @return {string} Return converted 24-hour time string to 12-hour time.
 * @method
 * @example
 * toAmPmTime('00:30'); // 12:30 AM
 * toAmPmTime('01:15'); // 1:15 AM
 * toAmPmTime('11:45'); // 11:45 AM
 * toAmPmTime('12:15'); // 12:15 PM
 * toAmPmTime('13:15'); // 1:15 PM
 * toAmPmTime('23:15'); // 11:15 PM
 */
export const toAmPmTime = (time) => {
  const hours = time.slice(0, 2);
  return (hours % 12 || 12) + ':' + time.slice(3, 5) + ' ' +
          (12 > hours ? 'AM' : 'PM');
};

/**
 * Gets week date.
 * @param {!Date=} opt_date The optional date object.
 * @return {string} Returns week date in ISO 8601 format.
 * @see https://en.wikipedia.org/wiki/ISO_8601#Week_dates
 * @see https://en.wikipedia.org/wiki/ISO_week_date
 * @method
 * @example
 * var weekDate = getWeekDate(new Date(2015, 9, 26));
 * var expected = '2015-W44';
 * weekDate === expected;
 */
export const getWeekDate = (date = new Date()) => {
  const number = getWeekNumber(date);
  const week = ('0' + number).slice(-2);

  return date.getFullYear() + '-W' + week;
};

/**
 * Gets week number.
 * @param {!Date=} opt_date The optional date object.
 * @return {number} Returns week number.
 * @method
 * @see https://en.wikipedia.org/wiki/ISO_8601#Week_dates
 * @see https://en.wikipedia.org/wiki/ISO_week_date
 */
export const getWeekNumber = (date = new Date()) => {
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const jan4 = new Date(date.getFullYear(), 0, 4);
  const diff = date - jan4;

  return 1 + Math.round((diff / 864e5 - 3 + (jan4.getDay() + 6) % 7) / 7);
};
