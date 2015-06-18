
/**
 * @fileoverview Simple implementation of HTML5 input type="range" control.
 *
 * @see http://www.w3.org/TR/html-markup/input.range.html
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Constructor of InputRange.
 * @param {string|HTMLInputElement} input The input element or its ID attribute.
 * @extends {forms.InputRange} forms.InputRange
 * @constructor
 * @see http://www.w3.org/TR/html-markup/input.range.html
 * @deprecated Use {@link forms.InputRange} instead.
 */
controls.html5.InputRange = function(input) {
  forms.InputRange.apply(this, arguments);
};
