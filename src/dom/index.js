/**
 * @fileoverview DOM utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/dom
 * @suppress {misplacedTypeAnnotation}
 */
import {
  expirableLocalStorage,
  expirableSessionStorage,
} from "expirable-storage";

import * as cookies from "./cookies.js";
import * as template from "./template.js";

export { cookies, template };
export { expirableLocalStorage, expirableSessionStorage };

/**
 * Gets default document charset.
 * @return {string} Returns default document charset.
 * @method
 */
export const getCharset = () => {
  const doc = getDocument();
  const charset = doc && (doc.charset || doc.characterSet);
  return (charset || "utf-8").toLowerCase();
};

/**
 * Loads script.
 * @param {string} src The script source to load.
 * @param {number=} [timeout=1000] The maximum execution timeout in seconds.
 * @return {!Promise} Returns the result as a Promise object.
 * @method
 */
export const loadScript = (src, timeout = 1e4) => {
  return new Promise((resolve, reject) => {
    const doc = getDocument();

    if (doc) {
      const script = makeNode("SCRIPT");
      const cleanup = (fn) => {
        timer && clearTimeout(timer);
        script.onload = script.onerror = null;
        deleteNode(script);
        fn();
      };

      script.onload = () => cleanup(resolve);
      script.onerror = () => cleanup(reject);
      script.async = true;
      appendNode(doc.body, script).src = src;

      const timer = setTimeout(() => cleanup(reject), timeout);
    } else {
      reject();
    }
  });
};

/**
 * Gets root context object, <code>Window</code> for browsers
 *   and <code>global</code> obkect for Node.
 * @return {!Window|!Object} Returns root context object.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window
 * @see https://nodejs.org/api/globals.html#globals_global
 * @method
 */
export const getRootContext = () => {
  const context =
    ("object" === typeof self && self.self === self && self) ||
    ("object" === typeof global && global.global === global && global);
  return /** @type {!Window|!Object} */ (context);
};

/**
 * Gets HTML document object.
 * @return {?HTMLDocument} Returns HTML document object.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 * @method
 */
export const getDocument = () => {
  const ctx = getRootContext();
  const doc = ctx.document;

  return /** @type {?HTMLDocument} */ (doc);
};

/**
 * Removes the object from the document hierarchy.
 * @param {?Node} element The element to remove.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * @see https://msdn.microsoft.com/en-us/library/ms536708%28v=vs.85%29.aspx
 * @method
 */
export const deleteNode = (element) => {
  element && element.parentNode && element.parentNode.removeChild(element);
};

/**
 * Alias of W3C <code>element.appendChild</code>.
 * Used to reduce size after code compilation.
 * @param {?Node|?Element} parent The parent element.
 * @param {?Node|?Element} child The child element.
 * @return {!Node} Returns a reference to the <code>child</code> that
 *     is appended to the parent.
 * @method
 */
export const appendNode = (parent, child) => parent.appendChild(child);

/**
 * Alias of W3C <code>document.createElement</code>.
 * Used to reduce size after code compilation.
 * @param {string} tagName Tag name.
 * @return {?Element} Returns created element.
 * @method
 */
export const makeNode = (tagName) => getDocument().createElement(tagName);

/**
 * Alias of W3C <code>document.getElementById</code>.
 * Used to reduce size after code compilation.
 * @param {string} id A case-sensitive string representing the unique ID of the
 *     element being sought.
 * @return {?Element} Returns reference to an Element object, or null if an
 *     element with the specified ID is not in the document.
 * @method
 */
export const getElement = (id) => getDocument().getElementById(id);

/**
 * Alias of W3C <code>element.getElementsByTagName</code>.
 * Used to reduce size after code compilation.
 * @param {!Element|!Node} element Element to search tags.
 * @param {string} tagName Tag name.
 * @return {?NodeList} Returns list of found elements in the
 *     order they appear in the tree.
 * @method
 */
export const getElementsByTag = (element, tagName) => {
  return element && element.getElementsByTagName(tagName);
};

/**
 * Alias of W3C <code>element.getElementsByClassName</code>.
 * Used to reduce size after code compilation.
 * @param {!Element|!Node} element Element to start searching.
 * @param {string} className Class name to match.
 * @return {?NodeList} Array of found elements.
 * @method
 */
export const getElementsByClass = (element, className) => {
  return element && element.getElementsByClassName(className);
};

/**
 * Alias of W3C <code>element.querySelectorAll</code>.
 * Used to reduce size after code compilation.
 * @param {!Element|!DocumentFragment} element Element to start searching.
 * @param {string} selectors One or more CSS selectors separated by commas.
 * @return {?NodeList} Returns a list of the elements within the document that
 *     match the specified group of selectors.
 * @see https://www.w3.org/TR/selectors-api/#queryselectorall
 * @method
 */
export const getElementsBySelectors = (element, selectors) => {
  return element && element.querySelectorAll(selectors);
};

/**
 * Alias of W3C <code>element.querySelector</code>.
 * Used to reduce size after code compilation.
 * @param {!Element|!DocumentFragment} element Element to start searching.
 * @param {string} selectors One or more CSS selectors separated by commas.
 * @return {?Element} Returns the first element that is a descendant of the
 *     element on which it is invoked that matches the specified group of
 *     selectors.
 * @see https://www.w3.org/TR/selectors-api/#queryselector
 * @method
 */
export const getElementBySelectors = (element, selectors) => {
  return element && element.querySelector(selectors);
};

/**
 * Alias of W3C <code>element.addEventListener</code>.
 * Used to reduce size after code compilation.
 * @param {!Element|!Node|!Window} element Element to which attach event.
 * @param {string} type Type of event.
 * @param {function(!Event, ...)} listener Event listener.
 * @method
 */
export const addEvent = (element, type, listener) => {
  element && element.addEventListener(type, listener, false);
};
