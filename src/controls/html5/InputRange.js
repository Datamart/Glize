
/**
 * @fileoverview Simple implementation of HTML5 input
 *               <code>type="range"</code> control.
 *
 * @see http://www.w3.org/TR/html-markup/input.range.html
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @deprecated Use {@link forms.InputRange} instead.
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */



/**
 * Simple implementation of HTML5 input <code>type="range"</code> control.
 * @param {string|HTMLInputElement} input The input element or its ID attribute.
 * @extends {forms.InputRange} forms.InputRange
 * @constructor
 * @see http://www.w3.org/TR/html-markup/input.range.html
 * @deprecated Use {@link forms.InputRange} instead.
 */
controls.html5.InputRange = function(input) {
  forms.InputRange.apply(this, arguments);
};
