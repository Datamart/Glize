
/**
 * @fileoverview Cookies utility methods.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Cookies utility methods.
 * @type {!Object.<string, Function>}
 * @requires util.Date
 * @namespace
 */
dom.Cookies = {
  /**
   * Sets a cookie.
   * @param {string} key The name of the cookie.
   * @param {string} value The value of the cookie.
   * @param {number} expires The days after the cookie expires.
   * @param {string=} opt_domain Optional, domain that the cookie is
   *     available to.
   */
  set: function(key, value, expires, opt_domain) {
    dom.document.cookie = escape(key) + '=' + escape(value || '') +
        '; expires=' +
        (new util.Date.DateTime(
        expires * 864e5 + util.Date.now()).toGMTString()) +
        '; path=/; domain=' + (opt_domain || dom.document.domain);
  },

  /**
   * Gets the value for the first cookie with the given name.
   * @param {string} key The name of the cookie to get.
   * @param {string=} opt_default The optional default value.
   * @return {string} The value of the cookie. If no cookie is set this
   *     returns opt_default or undefined if opt_default is not provided.
   */
  get: function(key, opt_default)  {
    return unescape(
        (dom.document.cookie.match(key + '=([^;].+?)(;|$)') || [])[1] ||
        opt_default || '');
  },

  /**
   * Removes and expires a cookie.
   * @param {string} key The cookie name.
   * @return {boolean} Whether the cookie existed before it was removed.
   */
  remove: function(key) {
    /** @type {string} */ var value = dom.Cookies.get(key);

    dom.Cookies.set(key, '', 0);
    return !!value;
  },

  /**
   * Removes and expires all cookie.
   */
  clear: function() {
    /** @type {!Array.<string>} */ var keys = dom.Cookies.keys();
    /** @type {number} */ var length = keys.length;

    while (length--) {
      dom.Cookies.remove(keys[length]);
    }
  },

  /**
   * Gets list of stored keys.
   * @return {!Array.<string>} Returns list of stored keys.
   */
  keys: function() {
    /** @type {!RegExp} */ var re = /;\s*/;
    /** @type {!Array.<string>} */ var parts = dom.document.cookie.split(re);
    /** @type {number} */ var length = parts.length;
    /** @type {!Array.<string>} */ var keys = new Array(length - 1);

    while (length--) {
      keys[length] = (parts[length].split('=')[0]);
    }
    return keys;
  }
};
