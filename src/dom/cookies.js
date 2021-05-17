/**
 * @fileoverview Cookies utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/dom/cookies
 */


/**
 * Sets a cookie.
 * @param {string} key The name of the cookie.
 * @param {string} value The value of the cookie.
 * @param {number} expiration The days after the cookie expires.
 * @param {string=} opt_domain Optional, domain that the cookie belongs to.
 * @method
 */
export const set = (key, value, expiration, opt_domain) => {
  const expires = new Date(expiration * 864E5 + Date.now()).toGMTString();
  document.cookie = escape(key) + '=' + escape(value || '') +
    '; expires=' + expires +
    '; path=/; domain=' + (opt_domain || document.domain);
};

/**
 * Gets the value for the first cookie with the given name.
 * @param {string} key The name of the cookie to get.
 * @param {string=} opt_default The optional default value.
 * @return {string} The value of the cookie. If no cookie is set this
 *     returns opt_default or undefined if opt_default is not provided.
 * @method
 */
export const get = (key, opt_default = '') => {
  const re = key + '=([^;].+?)(;|$)';
  return unescape((document.cookie.match(re) || [])[1] || opt_default);
};

/**
 * Removes and expires a cookie.
 * @param {string} key The cookie name.
 * @return {boolean} Whether the cookie existed before it was removed.
 * @method
 */
export const remove = (key) => {
  const value = get(key);

  set(key, '', 0);
  return !!value;
};

/**
 * Removes and expires all cookie.
 * @method
 */
export const clear = () => {
  const names = keys();
  let length = names.length;

  while (length--) {
    remove(names[length]);
  }
};

/**
 * Gets list of stored keys.
 * @return {!Array<string>} Returns list of stored keys.
 * @method
 */
export const keys = () => {
  const re = /;\s*/;
  const parts = document.cookie.split(re);
  let length = parts.length;
  const keys = new Array(length - 1);

  while (length--) {
    keys[length] = (parts[length].split('=')[0]);
  }

  return keys;
};
