
/**
 * @fileoverview Simple implementation of HTML5 input type="range" control.
 *
 * @see http://www.w3.org/TR/html-markup/input.range.html
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Simple implementation of HTML5 input type="range" control.
 * @param {string|HTMLInputElement} input The input element or its ID attribute.
 * @constructor
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
   * This css class should emulate following pseudo-classes:<pre>
   *     input[type=range]::-webkit-slider-runnable-track {}
   *     input[type=range]::-moz-range-track {}
   *     input[type=range]::-ms-track {}</pre>
   * @type {string}
   * @const
   */
  var RANGE_TRACK_CLASS = RANGE_TYPE + '-track';

  /**
   * This css class should emulate following pseudo-classes:<pre>
   *     input[type=range]::-webkit-slider-thumb {}
   *     input[type=range]::-moz-range-thumb {}
   *     input[type=range]::-ms-thumb {}</pre>
   * @type {string}
   * @const
   */
  var RANGE_THUMB_CLASS = RANGE_TYPE + '-thumb';

  /**
   * This css class should emulate following pseudo-classes:<pre>
   *     input[type=range]:focus::-webkit-slider-runnable-track {}
   *     input[type=range]:focus::-webkit-slider-thumb {}
   *     input[type=range]:focus::-moz-range-track {}
   *     input[type=range]:focus::-moz-range-thumb {}</pre>
   * @type {string}
   * @const
   */
  var RANGE_TRACK_FOCUS_CLASS = RANGE_TRACK_CLASS + '-focus';

  /**
   * Css class for common implementation wrapper.
   * @type {string}
   * @const
   * @example
   * <span class="range-wrapper">
   *   <input />
   *   <div class="range-track">
   *     <div class="range-thumb"></div>
   *   </div>
   * </span>
   */
  var RANGE_WRAPPER_CLASS = RANGE_TYPE + '-wrapper';

  /**
   * @private
   */
  function init_() {
    if (RANGE_TYPE !== input_.type) {

      track_ = dom.createElement('DIV');
      dom.css.setClass(track_, RANGE_TRACK_CLASS);
      getWrapper_().appendChild(track_);

      thumb_ = dom.createElement('DIV');
      dom.css.setClass(thumb_, RANGE_THUMB_CLASS);
      track_.appendChild(thumb_);

      // TODO: Calculate left position depending on input value, min and max.
      thumb_.style.left = (track_.offsetWidth - thumb_.offsetWidth) / 2 + 'px';

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
   * @return {Element} Returns reference to wrapper element.
   * @private
   */
  function getWrapper_() {
    if (!wrapper_) {
      wrapper_ = dom.createElement('SPAN');
      dom.css.setClass(wrapper_, RANGE_WRAPPER_CLASS);
      input_.parentNode.insertBefore(wrapper_, input_);
      wrapper_.appendChild(input_);
    }
    return wrapper_;
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
      thumb_.style.left = x - margin - rect['left'] + 'px';
      // TODO: Increment / decrement value.
      // TODO: Use step attribute.
      value = +(input_.value || 0);
      if (value >= min_ && value <= max_) {
        input_.value = '' + value;
        dispatchEvents_();
      }
    }
    // Prevent text selection.
    dom.events.preventDefault(e);
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
   * The reference to wrapper element.
   * @type {Element}
   * @private
   */
  var wrapper_ = dom.NULL;

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
   * Detects touch screen.
   * @type {number}
   * @private
   */
  var maxTouchPoints_ = +navigator['maxTouchPoints'] ||
                        +navigator['msMaxTouchPoints'] ||
                        +('ontouchstart' in window);

  init_();
};
