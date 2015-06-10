/**
 * @fileoverview Simple implementation of HTML5 place holder.
 * @link http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Simple implementation of HTML5 placeholder for non-supported browsers.
 * @constructor
 * @requires dom.events
 * @example
 * (<b>new</b> forms.PlaceHolder).init(document.forms[0]);
 */
forms.PlaceHolder = function() {

  /**
   * Initializes HTML5 form placeholder feature.
   * @param {Node} container The HTML container which contains form elements.
   */
  this.init = function(container) {
    if (!forms.isSupported(forms.FEATURES.PLACEHOLDER)) {
      for (/** @type {number} */ var i = 0; i < forms.TAGS.length;) {
        initPlaceHolder_(dom.getElementsByTagName(container, forms.TAGS[i++]));
      }
    }
  };

  /**
   * Sets event listeners for elements with placeholder attribute.
   * @param {NodeList} elements Form elements.
   * @private
   */
  function initPlaceHolder_(elements) {
    for (/** @type {number} */ var i = 0; i < elements.length;) {
      /** @type {Node|Element} */ var element = elements[i++];

      if (element.getAttribute(attribute_)) {
        dom.events.addEventListener(
            element, dom.events.TYPE.FOCUS, handleEvent_);
        dom.events.addEventListener(
            element, dom.events.TYPE.BLUR, handleEvent_);

        handleEvent_({'target': element, 'type': dom.events.TYPE.BLUR});
      }
    }
  }

  /**
   * @param {Event|Object} e Event.
   * @private
   */
  function handleEvent_(e) {
    e = dom.events.getEvent(/** @type {Event} */ (e));
    /** @type {EventTarget} */ var element = dom.events.getEventTarget(e);
    /** @type {string} */ var type = e.type;
    /** @type {string} */ var value = element.value;

    if (element) {
      dom.css.removeClass(/** @type {Node} */ (element), attribute_);
      /** @type {string} */ var placeholder = element.getAttribute(attribute_);
      if (dom.events.TYPE.FOCUS == type && placeholder == value) {
        element.value = '';
      } else if (dom.events.TYPE.BLUR == type && '' == value) {
        element.value = placeholder;
        dom.css.addClass(/** @type {Node} */ (element), attribute_);
      }
    }
  }

  /**
   * @type {string}
   * @private
   */
  var attribute_ = 'placeholder';
};
