/**
 * @fileoverview Localization utils.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/locale
 */


/**
 * Gets the current value of the default locale.
 * @return {string} Returns the current value of the default locale.
 * @method
 */
 export const getLocale = function() {
  const env = ('object' === typeof navigator && navigator) || 
              ('object' === typeof process && process.env);
  const lang = env['userLanguage'] || env['language'] || 
               env['LANG'] || env['LANGUAGE'] || 'en';
  return lang.substr(0, 2).toLowerCase();
};

/**
 * Gets locale week names.
 * @return {!Array<string>} Returns week names.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @method
 */
export const getWeekNames = () => {
  const locale = getLocale();
  let names = days_[locale];

  if (!names) {
    try {
      const formatter = new Intl.DateTimeFormat(locale, {weekday: "short"});
      const date = new Date(2021, 0, 3); // Sun Jan 03 2021
      names = new Array(7);
      for (let i = 0; i < 7; ++i) {
        date.setDate(3 + i);
        names[i] = formatter.format(date);
      }
    } catch (ex) {
      names = getData_('days');
    }

    days_[locale] = names;
  }

  return names;
};

/**
 * Gets locale month names.
 * @return {!Array.<string>} Returns month names.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @method
 */
export const getMonthNames = () => {
  const locale = getLocale();
  let names = months_[locale];

  if (!names) {
    try {
      const formatter = new Intl.DateTimeFormat(locale, {month: "long"});
      const year = new Date().getFullYear();
      names = new Array(12);
      for (let i = 0; i < 12; ++i) {
        names[i] = formatter.format(new Date(year, i));
      }
    } catch (ex) {
      names = getData_('months');
    }

    months_[locale] = names;
  }

  return names;
};

/**
 * Gets locale month name.
 * @param {?Date=} date Optional date object, defaults is current date.
 * @return {string} Returns month name.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
 * @method
 */
export const getMonthName = (date = new Date()) => {
  try {
    return date.toLocaleString(getLocale(), {month: "long"});
  } catch(ex) {
    return getMonthNames()[date.getMonth()];
  }
};

/**
 * Gets month number by month name.
 * @param {string} name The month name.
 * @return {number} Returns month number.
 * @method
 */
 export const getMonthByName = (name) => {
  const monthes = getMonthNames();

  for (let i = 0; i < monthes.length; ++i) {
    if (name.substr(0, 3).toLowerCase() === 
        monthes[i].substr(0, 3).toLowerCase()) {
      return i;
    }
  }

  return -1;
};

/**
 * Gets locale data by key. Used for backward compatibility.
 * @param {string} key Data key.
 * @return {!Array<string>} Returns locale data.
 * @method
 * @private
 */
const getData_ = (key) => (data_[getLocale()] || data_['en'])[key];

/**
 * Storage for cached month names for locale.
 * @type {!Object<string, !Array<string>>}
 * @private
 */
let months_ = {};

/**
 * Storage for cached weekday names for locale.
 * @type {!Object<string, !Array<string>>}
 * @private
 */
 let days_ = {};

/**
 * @type {!Object<string, !Object>}
 * @private
 */
const data_ = {
  'en': {
    'days': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'months': ['January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November',
               'December']
  },
  'de': {
    'days': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
               'Juli', 'August', 'September', 'Oktober', 'November',
               'Dezember']
  },
  'ru': {
    'days': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    'months': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
               'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь',
               'Декабрь']
  }
};
