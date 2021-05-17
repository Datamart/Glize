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
 * @method
 */
export const getWeekNames = () => getData_('days');

/**
 * Gets locale month names.
 * @return {!Array.<string>} Returns month names.
 * @method
 */
export const getMonthNames = () => getData_('months');

/**
 * Gets locale month name.
 * @param {?Date=} date Optional date object, defaults is current date.
 * @return {string} Returns month name.
 * @method
 */
export const getMonthName = (date = new Date()) => getMonthNames()[date.getMonth()];

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
 * Gets locale data by key.
 * @param {string} key Data key.
 * @return {!Array<string>} Returns locale data.
 * @method
 * @private
 */
const getData_ = (key) => (data_[getLocale()] || data_['en'])[key];

/**
 * @type {!Object<string, !Object>}
 * @private
 */
const data_ = {
  'en': {
    'days': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
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
