
/**
 * @fileoverview Defines 'forms' namespace.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Defines 'forms' namespace.
 * @namespace
 */
var forms = {

  /**
   * List of form elements.
   * @type {!Array.<string>}
   */
  TAGS: ['INPUT', 'TEXTAREA', 'SELECT'],

  /**
   * Returns a boolean flag indicating if a given feature is supported.
   * @param {string} feature Is a string representing the feature name.
   * @param {Element=} opt_element Optional element to test.
   * @return {boolean} Returns true if a given feature is supported.
   * @see http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7
   * @see forms.FEATURES
   */
  hasFeature: function(feature, opt_element) {
    opt_element = opt_element || dom.createElement('INPUT');
    /** @type {boolean} */ var result = false;

    if (forms.FEATURES.PLACEHOLDER === feature ||
        forms.FEATURES.VALIDATION === feature) {
      result = feature in opt_element;
    } else if (forms.FEATURES.TYPE_RANGE === feature ||
               forms.FEATURES.TYPE_NUMBER === feature) {
      result = feature === opt_element.type;
    }
    return result;
  },

  /**
   * Adds onchange/oninput event handler on all form elements.
   * @param {HTMLFormElement} form Form element.
   * @param {!function(Element)} handler Event handler.
   */
  onchange: function(form, handler) {

    function checker_(element, handler) {
      /** @type {string} */ var value = element.value;
      setInterval(function() {
        if (value != element.value) {
          handler(/** @type {Event} */({'target': element}));
          value = element.value;
        }
      }, 99);
    }

    if (form) {
      /** @type {HTMLCollection} */ var elements = form.elements;
      /** @type {number} */ var length = elements.length;
      while (length)
        checker_(elements[--length], handler);
    }
  },

  /**
   * Initializes HTML5 form features: placeholder, validation, etc.
   * @param {Node} container The HTML container which contains form elements.
   * @example
   * forms.init(document.forms[0]);
   */
  init: function(container) {
    (new forms.PlaceHolder).init(container);
    (new forms.Validation).init(container);
  }
};


/**
 * Enumeration of HTML5 form features.
 * @enum {string}
 */
forms.FEATURES = {
  PLACEHOLDER: 'placeholder',
  VALIDATION: 'required',
  TYPE_RANGE: 'range',
  TYPE_NUMBER: 'number'
};


/**
 * Returns a boolean flag indicating if a given feature is supported.
 * @param {string} feature Is a string representing the feature name.
 * @return {boolean} Returns true if a given feature is supported.
 * @see forms.FEATURES
 * @deprecated Use {@link forms.hasFeature} instead.
 */
forms.isSupported = forms.hasFeature;
