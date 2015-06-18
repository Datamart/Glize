
/**
 * @fileoverview Defines 'forms' namespace.
 * @link http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Defines 'forms' namespace.
 * @namespace Defines 'forms' namespace.
 */
var forms = {

  /**
   * List of form elements.
   * @type {!Array.<string>}
   */
  TAGS: ['INPUT', 'TEXTAREA', 'SELECT'],

  /**
   * Enumeration of HTML5 form features.
   * @type {!Object.<string, string>}
   * @example
   * {PLACEHOLDER, VALIDATION, TYPE_RANGE, TYPE_NUMBER}
   */
  FEATURES: {
    PLACEHOLDER: 'placeholder',
    VALIDATION: 'required',
    TYPE_RANGE: 'range',
    TYPE_NUMBER: 'number'
  },

  /**
   * Returns a boolean flag indicating if a given feature is supported.
   * @param {string} feature Is a string representing the feature name.
   * @return {boolean} Returns true if a given feature is supported.
   * @see http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7
   * @see forms.FEATURES
   */
  hasFeature: function(feature) {
    forms.features_ = forms.features_ || {};
    if (!(feature in forms.features_)) {
      /** @type {HTMLInputElement} */ var input =
          /** @type {HTMLInputElement} */ (dom.createElement('INPUT'));
      if (forms.FEATURES.PLACEHOLDER === feature ||
          forms.FEATURES.VALIDATION === feature)
        forms.features_[feature] = feature in input;
      else if (forms.FEATURES.TYPE_RANGE === feature ||
               forms.FEATURES.TYPE_NUMBER === feature)
        forms.features_[feature] = feature === input.type;
    }
    return forms.features_[feature];
  },

  /**
   * Adds onchange/oninput event handler on all form elements.
   * @param {HTMLFormElement} form Form element.
   * @param {!Function} handler Event handler.
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
   * @static
   * @example
   * forms.init(document.forms[0]);
   */
  init: function(container) {
    (new forms.PlaceHolder).init(container);
    (new forms.Validation).init(container);
  }
};


/**
 * Returns a boolean flag indicating if a given feature is supported.
 * @param {string} feature Is a string representing the feature name.
 * @return {boolean} Returns true if a given feature is supported.
 * @see forms.FEATURES
 * @deprecated Use {@link forms.hasFeature} instead.
 */
forms.isSupported = forms.hasFeature;
