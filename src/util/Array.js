
/**
 * @fileoverview Array utility methods.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Array utility methods.
 * @namespace
 */
util.Array = {
  /**
   * Searches the array for the specified element, and returns its position.
   * @param {!Array} arr The array.
   * @param {*} element The element to locate in the array.
   * @param {number=} opt_fromIndex The optional index to start the search at.
   * @return {number} Returns the first index at which a given element can be
   *                  found in the array, or -1 if it is not present.
   * @see https://es5.github.io/#x15.4.4.14
   */
  indexOf: function(arr, element, opt_fromIndex) {
    opt_fromIndex = opt_fromIndex | 0;

    /** @type {number} */ var length = arr.length;
    /** @type {Function} */ var fn = arr.indexOf;
    /** @type {number} */ var result = fn ?
        fn.call(arr, element, opt_fromIndex) : -1;

    if (!fn) {
      for (; opt_fromIndex < length && !~result; opt_fromIndex++) {
        result = arr[opt_fromIndex] === element ? opt_fromIndex : result;
      }
    }

    return result;
  },

  /**
   * Determines whether an object is an array.
   * @param {*} obj The object to be checked.
   * @return {boolean} Returns <code>true</code> if an object is an
   *                   array, <code>false</code> if it is not.
   * @see https://es5.github.io/#x15.4.3.2
   */
  isArray: function(obj) {
    /** @type {Function} */ var fn = Array.isArray;

    return fn ?
        fn(obj) : '[object Array]' === Object.prototype.toString.call(obj);
  },

  /**
   * Creates a new array with all elements that pass the test implemented
   * by the provided function.
   * @param {!Array} arr The array.
   * @param {!function(*, number, Array):boolean} callback The callback function
   * @param {Object=} opt_context The optional context object.
   * @return {Array} Returns filtered array.
   * @see http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.20
   */
  filter: function(arr, callback, opt_context) {
    /** @type {number} */ var length = arr.length;
    /** @type {number} */ var i = 0;
    /** @type {Function} */ var fn = arr.filter;
    /** @type {Array} */ var result = fn ? fn.call(arr, callback) : [];

    if (!fn) {
      for (; i < length;) {
        var element = arr[i++];
        if (callback.call(opt_context, element, i, arr)) {
          result.push(element);
        }
      }
    }

    return result;
  },

  /**
   * Checks if array contains the given element.
   * @param {!Array} arr The array to test for the presence of the element.
   * @param {*} element The element to search.
   * @return {boolean} Returns <code>true</code> if element is present.
   */
  contains: function(arr, element) {
    return 0 <= util.Array.indexOf(arr, element);
  }
};
