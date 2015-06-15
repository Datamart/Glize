
/**
 * @fileoverview Object utility methods.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 */


/**
 * Object utility methods.
 * @requires util.StringUtils.JSON
 * @namespace
 */
util.Object = {
  /**
   * Extends <code>target</code> with <code>source</code> properties.
   * @param {!Object} target The target object.
   * @param {!Object} source The source object.
   * @return {!Object} Returns reference to updated <code>target</code> object.
   */
  extend: function(target, source) {
    for (/** @type {string} */ var key in source) {
      if (source[key] instanceof Array) {
        target[key] = [].concat(source[key]);
      } else if ('object' == typeof source[key]) {
        target[key] = util.Object.extend(
            /** @type {!Object} */ (target[key] || {}),
            /** @type {!Object} */ (source[key]));
      } else {
        target[key] = source[key];
      }
    }
    return /** @type {!Object} */ (target);
  },

  /**
   * Returns list of object keys.
   * @param {!Object} obj Target Object.
   * @return {!Array.<string>} List of target object keys.
   * @see http://www.ecma-international.org/ecma-262/5.1/#sec-15.2.3.14
   */
  keys: function(obj) {
    /** @type {Function} */ var fn = Object.keys;
    /** @type {!Array.<string>} */ var keys = fn ? fn(obj) : [];
    /** @type {string|number} */ var key;

    if (!fn) {
      for (key in obj) {
        keys.push(key);
      }
    }

    return keys;
  },

  /**
   * Filters object.
   * @param {!Object} obj The target object.
   * @param {!function(*): boolean} func The filter function.
   * @return {!Object} Returns filtered object.
   */
  filter: function(obj, func) {
    /** @type {!Object} */ var result = {};
    /** @type {string|number} */ var key;

    for (key in obj) {
      if (func(obj[key])) {
        result[key] = obj[key];
      }
    }
    return result;
  },

  /**
   * Returns a string representation of <code>obj</code> object.
   * @param {!Object} obj The representing object.
   * @return {string} Returns a string representing object.
   * @see util.StringUtils.JSON.stringify
   */
  toString: function(obj) {
    return util.StringUtils.JSON.stringify(obj);
  }
};
