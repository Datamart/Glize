
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
   * Range type constant.
   * @type {string}
   * @const
   */
  var RANGE_TYPE = 'range';

  /**
   * The "<code>.range-track</code>" css class should emulate
   * following pseudo-classes:<pre>
   *     input[type=range]::-webkit-slider-runnable-track {}
   *     input[type=range]::-moz-range-track {}
   *     input[type=range]::-ms-track {}</pre>
   * @type {string}
   * @const
   */
  var RANGE_TRACK_CLASS = RANGE_TYPE + '-track';

  /**
   * The "<code>.range-thumb</code>" css class should emulate
   * following pseudo-classes:<pre>
   *     input[type=range]::-webkit-slider-thumb {}
   *     input[type=range]::-moz-range-thumb {}
   *     input[type=range]::-ms-thumb {}</pre>
   * @type {string}
   * @const
   */
  var RANGE_THUMB_CLASS = RANGE_TYPE + '-thumb';

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
  var RANGE_CONTROL_CLASS = RANGE_TYPE + '-control';

  /**
   * @private
   */
  function init_() {
    /** @type {number} */ var value;
    if (RANGE_TYPE !== input_.type) {
      value = +(input_.value || 0);

      track_ = dom.createElement('DIV');
      dom.css.setClass(track_, RANGE_TRACK_CLASS);
      getControl_().appendChild(track_);

      thumb_ = dom.createElement('DIV');
      dom.css.setClass(thumb_, RANGE_THUMB_CLASS);
      track_.appendChild(thumb_);

      stepWidth_ = (track_.offsetWidth - thumb_.offsetWidth) /
          (max_ - min_) * step_;

      setPosition_(value > max_ ? max_ : value < min_ ? 0 : value, true);

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
    /** @type {number} */ var value;

    if (x >= rect['left'] + margin && x <= rect['right'] - margin) {
      setPosition_((x - margin - rect['left']) / stepWidth_);
    }
    // Prevent text selection.
    dom.events.preventDefault(e);
  }

  /**
   * Set thumb position and track value.
   * @param {number} x Thumb position.
   * @param {boolean=} opt_init Optional flag of initialization.
   */
  function setPosition_(x, opt_init) {
    if (opt_init || (x % step_ > 0.9 || x < 0.1)) {
      x = ~~(x + 0.5); // Math.ceil
      input_.value = '' + x;
      thumb_.style.left = stepWidth_ * x + 'px';
      dispatchEvents_();
    }
  }

  /**
   * Dispatches input events.
   * @return {boolean} Returns <code>true</code> if all events are
   *     dispatched successfully.
   * @private
   */
  function dispatchEvents_() {
    /** @type {boolean} */
    var result = dom.events.dispatchEvent(input_, dom.events.TYPE.INPUT);
    return dom.events.dispatchEvent(input_, dom.events.TYPE.CHANGE) && result;
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
   * Width of one step in pixels.
   * @type {number}
   * @private
   */
  var stepWidth_;

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
