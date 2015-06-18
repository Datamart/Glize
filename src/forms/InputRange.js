
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
    if (RANGE_TYPE !== input_.type) {

      track_ = dom.createElement('DIV');
      dom.css.setClass(track_, RANGE_TRACK_CLASS);
      getControl_().appendChild(track_);

      thumb_ = dom.createElement('DIV');
      dom.css.setClass(thumb_, RANGE_THUMB_CLASS);
      track_.appendChild(thumb_);
      thumb_.style['webkitTransition'] = 'all 150ms ease-in-out';

      stepWidth_ = (track_.offsetWidth - thumb_.offsetWidth) /
          (input_.max - input_.min) * step_;

      setPosition_((track_.offsetWidth - thumb_.offsetWidth) / 2, true);

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
      inited_ = true;
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
      setPosition_(x - margin - rect['left']);
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
    /** @type {number} */ var value = x / stepWidth_;
    if (opt_init || (value % step_ > 0.9 || value < 0.1)) {
      value = ~~(value + 0.5);
      input_.value = '' + value;
      thumb_.style.left = stepWidth_ * value + 'px';
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
