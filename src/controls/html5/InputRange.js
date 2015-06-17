
/**
 * @fileoverview Implementation of HTML5 input type="range" control.
 * @link http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Constructor of InputRange.
 * @param {string|Element} input The input element or its ID attribute.
 * @constructor
 * @link http://www.w3.org/TR/html-markup/input.range.html
 */
controls.html5.InputRange = function(input) {

  /**
   * @private
   */
  function init_() {
    if ('range' !== input_.type) {

      track_ = dom.createElement('DIV');
      // input[type=range]::-webkit-slider-runnable-track {}
      // input[type=range]::-moz-range-track {}
      // input[type=range]::-ms-track {}
      dom.css.setClass(track_, 'range-track');
      getWrapper_().appendChild(track_);

      thumb_ = dom.createElement('DIV');
      // input[type=range]::-webkit-slider-thumb {}
      // input[type=range]::-moz-range-thumb {}
      // input[type=range]::-ms-thumb {}
      dom.css.setClass(thumb_, 'range-thumb');
      track_.appendChild(thumb_);

      // TODO: Calculate left position depending on input value, min and max.
      thumb_.style.left = (track_.offsetWidth - thumb_.offsetWidth) / 2 + 'px';

      dom.events.addEventListener(
          track_, dom.events.TYPE.MOUSEDOWN, mousedown_);
      dom.events.addEventListener(
          thumb_, dom.events.TYPE.MOUSEDOWN, mousedown_);
    }
  }

  /**
   * @return {Element} Returns reference to wrapper element.
   * @private
   */
  function getWrapper_() {
    if (!wrapper_) {
      wrapper_ = dom.createElement('SPAN');
      dom.css.setClass(wrapper_, 'range-wrapper');
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
      dom.events.addEventListener(
          dom.document, dom.events.TYPE.MOUSEMOVE, mousemove_);
      dom.events.addEventListener(
          dom.document, dom.events.TYPE.MOUSEUP, mouseup_);
      dom.css.addClass(track_, 'range-track-focus');
    }
    mousemove_(e);
  }

  /**
   * @param {Event} e The mouseup event.
   * @private
   */
  function mouseup_(e) {
    dom.events.removeEventListener(
        dom.document, dom.events.TYPE.MOUSEMOVE, mousemove_);
    dom.events.removeEventListener(
        dom.document, dom.events.TYPE.MOUSEUP, mouseup_);
    dom.css.removeClass(track_, 'range-track-focus');
  }

  /**
   * @param {Event} e The mousemove event.
   * @private
   */
  function mousemove_(e) {
    e = dom.events.getEvent(e);
    /** @type {Object} */ var rect = dom.getBoundingClientRect(track_);
    /** @type {number} */ var margin = thumb_.offsetWidth / 2;
    /** @type {number} */ var x = e.clientX;
    /** @type {number} */ var value;

    if (x >= rect['left'] + margin && x <= rect['right'] - margin) {
      thumb_.style.left = x - margin - rect['left'] + 'px';
      // TODO: Increment / decrement value.
      // TODO: Use step attribute.
      value = +(input_.value || 0);
      if (value >= min_ && value <= max_) {
        input_.value = value;
        dispatchEvents_();
      }
    }
    // Prevent text selection.
    dom.events.preventDefault(e);
  }

  /**
   * Dispatches input events.
   * @return {boolean} Returns <code>true</code> if all events are
   * dispatched successfully.
   * @private
   */
  function dispatchEvents_() {
    /** @type {boolean} */
    var result = dom.events.dispatchEvent(input_, 'input');
    result = dom.events.dispatchEvent(input_, dom.events.TYPE.CHANGE) && result;
    return result;
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
   * @type {Element}
   * @private
   */
  var input_ = 'string' === typeof input ? dom.getElementById(input) : input;

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

  init_();
};
