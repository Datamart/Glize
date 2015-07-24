
/**
 * @fileoverview Simple implementation of HTML5 input
 *               <code>type="number"</code> control.
 *
 * @see http://www.w3.org/TR/html-markup/input.number.html
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @deprecated Use {@link forms.InputNumber} instead.
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */



/**
 * An implementation of HTML5 input <code>type="number"</code> for non
 * HTML5 browsers.
 * @param {string|HTMLInputElement} input The input element or its ID attribute.
 * @extends {forms.InputNumber} forms.InputNumber
 * @constructor
 * @see http://www.w3.org/TR/html-markup/input.number.html
 * @deprecated Use {@link forms.InputNumber} instead.
 */
controls.html5.InputNumber = function(input) {
  forms.InputNumber.apply(this, arguments);
};
