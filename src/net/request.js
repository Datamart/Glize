/**
 * @fileoverview Simple implementation of
 *               <code>javax.servlet.ServletRequest.</code> and
 *               <code>javax.servlet.http.HttpServletRequest</code>.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://docs.oracle.com/javaee/7/api/javax/servlet/ServletRequest.html
 * @see https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletRequest.html
 * @module glize/net/requests
 * @requires glize/dom/cookies
 */

import {cookies}  from '../dom/index.js';

/**
 * Returns the query string that is contained in the request URL after the
 *     path.
 * @param {?Element|?Location|?URL|string=} opt_location Optional location object.
 * @return {string} Returns the query string that is contained in the request
 *     URL after the path.
 * @method
 */
export const getQueryString = (opt_location) => {
  opt_location = getLocation_(opt_location);
  return opt_location.search && opt_location.search.substr(1);
};

/**
 * Returns an <code>Array</code> of all the cookies included
 *    with this request.
 * @return {!Array<!Object>} Returns an <code>Array</code> of all the cookies
 *     included with this request.
 * @method
 */
export const getCookies = function() {
  const keys = cookies.keys();
  const length = keys.length;
  const result = [];

  for (let i = 0; i < length;) {
    const name = keys[i++];
    result[i] = {'name': name, 'value': cookies.get(name)};
  }

  return result;
};

/**
 * Returns the value of a request parameter as a <code>string</code>, or empty
 * <code>string</code> if the parameter does not exist.
 * @param {string} name A <code>string</code> specifying the name of the
 *     parameter.
 * @param {?Element|?Location|string=} opt_location Optional location object.
 * @return {string} Returns a <code>string</code> representing the single
 *     value of the parameter.
 * @method
 */
export const getParameter = (name, opt_location) => {
  const map = getParameterMap(opt_location);
  return map[name] || '';
};

/**
 * @param {?Element|?Location|string=} opt_location Optional location object.
 * @return {!Array<string>} Returns an <code>Array</code> of
 * <code>string</code> objects, each <code>string</code> containing the name
 * of a request parameter; or an empty <code>Array</code> if the request has
 * no parameters.
 * @method
 */
export const getParameterNames = (opt_location) => {
  const map = getParameterMap(opt_location);
  return Object.keys(map);
};

/**
 * Returns a map of the parameters of this request including parameters from
 * parsed from query string and hash.
 * @param {?Element|?Location|?URL|string=} opt_location Optional location.
 * @return {!Object<string, string>} Map containing parameter names as keys
 *     and parameter values as map values.
 * @method
 */
export const getParameterMap = (opt_location) => {
  opt_location = getLocation_(opt_location);
  const url = opt_location.toString();
  const map = {};

  if (!(url in maps_)) {
    const pairs = opt_location.search.substr(1).split('&').concat(
        opt_location.hash.substr(1).split('&'));
    let index = pairs.length >>> 0;
    while (index--) {
      const pair = pairs[index].split('=');
      const key = pair[0];
      if (key) map[key] = decodeURIComponent(pair[1]);
    }
    maps_[url] = map;
  }

  return maps_[url];
};

/**
 * @param {?Element|?Location|?URL|string=} opt_location Optional location.
 * @return {!URL}
 * @method
 * @private
 */
const getLocation_ = (opt_location) => {
  opt_location = opt_location || location;

  if ('string' === typeof opt_location) {
    opt_location = new URL(opt_location);
  }

  return /** @type {!URL} */ (opt_location);
};

/**
 * Cache for parsed parameters maps.
 * @type {!Object<string, !Object<string,string>>}
 * @private
 */
const maps_ = {};
