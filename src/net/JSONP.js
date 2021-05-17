/**
 * @fileoverview Simple implementation of JSONP.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://en.wikipedia.org/wiki/JSONP
 * @module glize/net/jsonp
 * @requires glize/dom
 */

import * as dom from '../dom/index.js';


/**
 * Performs JSONP request.
 * @param {string} url The URL to which to send the request.
 * @param {string=} param Optional callback query-string parameter name.
 * @param {number=} timeout The maximum execution timeout.
 * @return {!Promise} Returns the result as a Promise object.
 * @see https://en.wikipedia.org/wiki/JSONP
 * @method
 */
export const load = (url, param = 'jsonp', timeout = 1E4) => {
  return new Promise((resolve, reject) => {
    const random = ~~(Math.random() * 1e9);
    const key = param + '_' + random;
    const query = param + '=' + key;
    const context = dom.getContext();
    const src = url + (~url.indexOf('?') ? '&' : '?') + query;

    const cleanup = () => {
      context[key] = null;
      count_--;
    };

    context[key] = (data) => {
      cleanup();
      resolve(data);
    };

    dom.loadScript(src, timeout).catch(() => {
      cleanup();
      reject();
    });
    count_++;
  });
};

/**
 * Gets count of active requests.
 * @return {number} Returns count of active requests.
 * @method
 */
export const getCount = () => count_;

/**
 * The count of active requests.
 * @type {number}
 * @private
 */
let count_ = 0;
