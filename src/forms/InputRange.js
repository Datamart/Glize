
/**
 * @fileoverview Simple implementation of HTML5 input
 *               <code>type="range"</code> control.
 *
 * @see http://www.w3.org/TR/html-markup/input.range.html
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Simple implementation of HTML5 input <code>type="range"</code> control.
 * @param {string|HTMLInputElement} input The input element or its ID attribute.
 * @constructor
 * @requires dom.css
 * @requires dom.events
 * @see http://www.w3.org/TR/html-markup/input.range.html
 */
forms.InputRange = function(input) {

  /**
   * The "<code>.range-track</code>" css class should emulate
   * following pseudo-classes:<pre>
   *     input[type=range]::-webkit-slider-runnable-track {}
   *     input[type=range]::-moz-range-track {}
   *     input[type=range]::-ms-track {}</pre>
   * @type {string}
   * @const
   */
  var RANGE_TRACK_CLASS = forms.FEATURES.TYPE_RANGE + '-track';

  /**
   * The "<code>.range-thumb</code>" css class should emulate
   * following pseudo-classes:<pre>
   *     input[type=range]::-webkit-slider-thumb {}
   *     input[type=range]::-moz-range-thumb {}
   *     input[type=range]::-ms-thumb {}</pre>
   * @type {string}
   * @const
   */
  var RANGE_THUMB_CLASS = forms.FEATURES.TYPE_RANGE + '-thumb';

  /**
   * The "<code>.range-track-focus</code>" css class should emulate
   * following pseudo-classes:<pre>
   *     input[type=range]:focus::-webkit-slider-runnable-track {}
   *     input[type=range]:focus::-webkit-slider-thumb {}
   *     input[type=range]:focus::-moz-range-track {}
   *     input[type=range]:focus::-moz-range-thumb {}</pre>
   * @type {string}
   * @const
   */
  var RANGE_TRACK_FOCUS_CLASS = RANGE_TRACK_CLASS + '-focus';

  /**
   * The "<code>.range-control</code>" css class for control container.
   * @type {string}
   * @const
   * @example
   * <span class="range-control">
   *   <input />
   *   <div class="range-track">
   *     <div class="range-thumb"></div>
   *   </div>
   * </span>
   */
  var RANGE_CONTROL_CLASS = forms.FEATURES.TYPE_RANGE + '-control';

  /**
   * @private
   */
  function init_() {
    if (!forms.hasFeature(forms.FEATURES.TYPE_RANGE, input_)) {
      /** @type {number} */ var value = +(input_.value || 0);
      input_.value = '0';

      track_ = dom.createElement('DIV');
      dom.css.setClass(track_, RANGE_TRACK_CLASS);
      getControl_().appendChild(track_);

      thumb_ = dom.createElement('DIV');
      dom.css.setClass(thumb_, RANGE_THUMB_CLASS);
      track_.appendChild(thumb_);

      interval_ = (track_.offsetWidth - thumb_.offsetWidth) /
          (max_ - min_) * step_;
      setValue_(value > max_ ? max_ : value < min_ ? min_ : value);

      if (maxTouchPoints_) {
        dom.events.addEventListener(
            track_, dom.events.TYPE.TOUCHSTART, mousedown_);
        dom.events.addEventListener(
            thumb_, dom.events.TYPE.TOUCHSTART, mousedown_);
      } else {
        dom.events.addEventListener(
            track_, dom.events.TYPE.MOUSEDOWN, mousedown_);
        dom.events.addEventListener(
            thumb_, dom.events.TYPE.MOUSEDOWN, mousedown_);
      }
    }
  }

  /**
   * @return {Element} Returns reference to control element.
   * @private
   */
  function getControl_() {
    if (!control_) {
      control_ = dom.createElement('SPAN');
      dom.css.setClass(control_, RANGE_CONTROL_CLASS);
      input_.parentNode.insertBefore(control_, input_);
      control_.appendChild(input_);
    }
    return control_;
  }

  /**
   * @param {Event} e The mousedown event.
   * @private
   */
  function mousedown_(e) {
    if (dom.events.getEventTarget(e) == thumb_) {
      if (maxTouchPoints_) {
        dom.events.addEventListener(
            dom.document, dom.events.TYPE.TOUCHMOVE, mousemove_);
        dom.events.addEventListener(
            dom.document, dom.events.TYPE.TOUCHEND, mouseup_);
      } else {
        dom.events.addEventListener(
            dom.document, dom.events.TYPE.MOUSEMOVE, mousemove_);
        dom.events.addEventListener(
            dom.document, dom.events.TYPE.MOUSEUP, mouseup_);
      }
      dom.css.addClass(track_, RANGE_TRACK_FOCUS_CLASS);
    }
    mousemove_(e);
  }

  /**
   * @param {Event} e The mouseup event.
   * @private
   */
  function mouseup_(e) {
    if (maxTouchPoints_) {
      dom.events.removeEventListener(
          dom.document, dom.events.TYPE.TOUCHMOVE, mousemove_);
      dom.events.removeEventListener(
          dom.document, dom.events.TYPE.TOUCHEND, mouseup_);
    } else {
      dom.events.removeEventListener(
          dom.document, dom.events.TYPE.MOUSEMOVE, mousemove_);
      dom.events.removeEventListener(
          dom.document, dom.events.TYPE.MOUSEUP, mouseup_);
    }
    dom.css.removeClass(track_, RANGE_TRACK_FOCUS_CLASS);
  }

  /**
   * @param {Event} e The mousemove event.
   * @private
   */
  function mousemove_(e) {
    e = dom.events.getEvent(e);
    /** @type {Object} */ var rect = dom.getBoundingClientRect(track_);
    /** @type {number} */ var margin = thumb_.offsetWidth / 2;
    /** @type {number} */ var x = e['changedTouches'] ?
        e['changedTouches'][0].clientX : e.clientX;

    if (x >= rect['left'] + margin && x <= rect['right'] - margin) {
      setValue_((x - margin - rect['left']) / interval_);
    }

    // Prevent text selection.
    dom.events.preventDefault(e);
  }

  /**
   * Sets new input's value.
   * @param {number} value The new value to set.
   * @private
   */
  function setValue_(value) {
    value = ~~(value + 0.5); // value = Math.ceil(value);
    if (value != input_.value && value + min_ >= min_ && value + min_ <= max_) {
      input_.value = '' + value;
      thumb_.style.left = value * interval_ + 'px';
      dispatchEvents_();
    }
  }

  /**
   * Dispatches input events.
   * @private
   */
  function dispatchEvents_() {
    dom.events.dispatchEvent(input_, dom.events.TYPE.INPUT);
    dom.events.dispatchEvent(input_, dom.events.TYPE.CHANGE);
  }

  /**
   * The reference to control element.
   * @type {Element}
   * @private
   */
  var control_ = dom.NULL;

  /**
   * The reference to slider thumb element.
   * @type {Element}
   * @private
   */
  var thumb_ = dom.NULL;

  /**
   * The reference to slider track element.
   * @type {Element}
   * @private
   */
  var track_ = dom.NULL;

  /**
   * The reference to input element.
   * @type {HTMLInputElement}
   * @private
   */
  var input_ = 'string' === typeof input ?
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
   * The step interval in pixels.
   * @type {number}
   * @private
   */
  var interval_;

  /**
   * Detects touch screen.
   * @type {number}
   * @private
   */
  var maxTouchPoints_ = +navigator['maxTouchPoints'] ||
                        +navigator['msMaxTouchPoints'] ||
                        +('ontouchstart' in window);

  init_();
};
