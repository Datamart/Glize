
/**
 * @fileoverview Simple implementation of HTML5 input
 *               <code>type="number"</code> control.
 *
 * @see http://www.w3.org/TR/html-markup/input.number.html
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * An implementation of HTML5 input <code>type="number"</code> for non
 * HTML5 browsers.
 * @param {string|HTMLInputElement} input The input element or its ID attribute.
 * @constructor
 * @requires dom.events
 * @see http://www.w3.org/TR/html-markup/input.number.html
 */
forms.InputNumber = function(input) {

  /**
   * @bug 344616 https://bugzilla.mozilla.org/show_bug.cgi?id=344616
   * @private
   */
  function init_() {
    if (!forms.hasFeature(forms.FEATURES.TYPE_NUMBER)) {
      dom.events.addEventListener(input_, dom.events.TYPE.KEYDOWN, keydown_);
      dom.events.addEventListener(
          input_, dom.events.TYPE.MOUSEDOWN, mousedown_);
      dom.events.addEventListener(
          input_, dom.events.TYPE.MOUSEMOVE, mousemove_);

      if (!input_.getAttribute('pattern')) {
        input_.setAttribute('pattern', '^\-?[0-9]+$');
      }

      if (!input_.getAttribute('maxlength')) {
        input_.setAttribute('maxlength', ('' + max_).length);
      }

      input_.style.backgroundImage = 'url(data:image/png;base64,' + img_ + ')';
      input_.style.backgroundPosition = 'right center';
      input_.style.backgroundRepeat = 'no-repeat';
      input_.style.paddingRight =
          (parseInt(dom.getComputedStyle(input_, 'padding-right'), 10) || 0) +
          padding_ + 'px';
      dom.css.addClass(input_, 'input-number');
    }
  }

  /**
   * @private
   */
  function increment_() {
    /**@type {number} */ var value = parseInt(input_.value, 10) || 0;
    dispatchEvents_('' + Math.min(max_, value + step_));
  }

  /**
   * @private
   */
  function decrement_() {
    /**@type {number} */ var value = parseInt(input_.value, 10) || 0;
    dispatchEvents_('' + Math.max(min_, value - step_));
  }

  /**
   * @param {Event} e The keydown event.
   * @private
   */
  function keydown_(e) {
    e = dom.events.getEvent(e);
    if (isNaN(input_.value)) {
      input_.focus();
    } else {
      if (38 === e.keyCode) increment_();
      else if (40 === e.keyCode) decrement_();
    }
  }

  /**
   * @param {Event} e The mousedown event.
   * @private
   */
  function mousedown_(e) {
    e = dom.events.getEvent(e);
    /** @type {Object} */ var rect = dom.getBoundingClientRect(input_);
    /** @type {number} */ var x = e.clientX;
    /** @type {number} */ var y = e.clientY;
    // @bug MSIE does not calculates rect.height for inline elements.
    /** @type {number} */ var height = rect['height'] || input_.offsetHeight;

    if (x && x > rect['right'] - padding_) {
      (y < rect['top'] + height / 2) ? increment_() : decrement_();
    }
  }

  /**
   * @param {Event} e The mousemove event.
   * @private
   */
  function mousemove_(e) {
    e = dom.events.getEvent(e);
    /** @type {number} */ var x = e.clientX;

    input_.style.cursor =
        (x && x > dom.getBoundingClientRect(input_)['right'] - padding_) ?
        'default' : 'text';
  }

  /**
   * Dispatches input events.
   * @param {string} value The new value.
   * @private
   */
  function dispatchEvents_(value) {
    if (value != input_.value) {
      input_.value = value;
      dom.events.dispatchEvent(input_, dom.events.TYPE.INPUT);
      dom.events.dispatchEvent(input_, dom.events.TYPE.CHANGE);
    }
  }

  /**
   * The reference to input element.
   * @type {HTMLInputElement}
   * @private
   */
  var input_ = typeof input == 'string' ?
      /** @type {HTMLInputElement} */ (dom.getElementById(input)) : input;

  /**
   * The expected lower bound for the input value.
   * @type {number}
   * @private
   */
  var min_ = +(input_.getAttribute('min') || -1e6);

  /**
   * The expected upper bound for the input value.
   * @type {number}
   * @private
   */
  var max_ = +(input_.getAttribute('max') || 1e6);

  /**
   * Specifies the value granularity of the input value.
   * @type {number}
   * @private
   */
  var step_ = +(input_.getAttribute('step') || 1);

  /**
   * Base64 encoded PNG top-bottom arrows image.
   * @type {string}
   * @private
   */
  var img_ = 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQBAMAAAA7eDg3AAAAA3NCSVQICAjb4U' +
             '/gAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBG' +
             'aXJld29ya3MgQ1M26LyyjAAAABR0RVh0Q3JlYXRpb24gVGltZQA2LzYvMTOlfn' +
             '1pAAAAElBMVEUAAABmZmb///9kZGRmZmZmZmaw6hPAAAAABXRSTlMAAAAB/Rh8' +
             'uVEAAAArSURBVAjXY1CCAAUGvAwFViYoIzQIwlANDYWKMDChMRBSroEw7UYErY' +
             'AwAOxWEY6fpOynAAAAAElFTkSuQmCC';

  /**
   * Input's right padding. (Actual background image width.)
   * @type {number}
   * @private
   */
  var padding_ = 16;

  // var img = new Image();img.src = 'data:image/png;base64,' + img_ + '';
  // console.log(padding_ == img.width + 1)

  init_();
};
