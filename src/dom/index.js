/**
 * @fileoverview DOM utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/dom
 */

import * as cookies from './cookies.js';
import * as template from './template.js';

export { cookies, template };
 

/**
 * Gets default document charset.
 * @return {string} Returns default document charset.
 * @method
 */
export const getCharset = () => {
 const doc = getDocument();
 const charset = doc && (doc.charset || doc.characterSet);
 return (charset || 'utf-8').toLowerCase();
};

/**
 * Loads script. 
 * @param {string} src The script source to load.
 * @param {number=} [timeout=1000] The maximum execution timeout in seconds.
 * @return {!Promise} Returns the result as a Promise object.
 * @method
 */
export const loadScript = (src, timeout = 1E4) => {
  return new Promise((resolve, reject) => {
    const doc = getDocument();

    if (doc) {
      const script = doc.createElement('SCRIPT');
      const cleanup = (fn) => {
        timer && clearTimeout(timer);
        script.onload = script.onerror = null;
        script.parentNode.removeChild(script);
        fn();
      };

      script.onload = () => cleanup(resolve);
      script.onerror = () => cleanup(reject);
      script.async = true;
      script.src = src;
      doc.body.appendChild(script);

      const timer = setTimeout(() => cleanup(reject), timeout);
    } else {
      reject();
    }
  });
};

/**
 * Gets root context object.
 * @return {!Window|!Object} Returns root context object.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window
 * @see https://nodejs.org/api/globals.html#globals_global
 * @method
 */
export const getContext = () => {
  const context = 
    ('object' === typeof self && self.self === self && self) ||
    ('object' === typeof global && global.global === global && global);
  return /** @type {!Window|!Object} */ (context);
};

/**
 * Gets HTML document object.
 * @return {?HTMLDocument} Returns HTML document object.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 * @method
 */
export const getDocument = () => {
  const ctx = getContext();
  const doc = ctx.document;

  return /** @type {?HTMLDocument} */ (doc);
};
