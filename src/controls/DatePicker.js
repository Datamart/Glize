
/**
 * @fileoverview DatePicker control.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */



/**
 * Constructor of DatePicker.
 * @param {Object=} opt_options Optional options.
 * @constructor
 * @requires formatters.DateFormatter
 * @requires controls.Calendar
 * @example
 * <input onclick="controls.DatePicker.show(this)"
 *        data-format="YYYY/MM/dd"
 *        value="2013/06/20"
 *        readonly>
 * <input onclick="controls.DatePicker.show(this)"
 *        data-format="MMM dd YYYY"
 *        value="May 20 2013"
 *        readonly>
 */
controls.DatePicker = function(opt_options) {

  opt_options = opt_options || {};
  opt_options['selectable'] = true;
  opt_options['format'] = opt_options['format'] || 'YYYY-MM-dd';

  /**
   * Gets date format.
   * <br>Gets date format from element <code>data-format</code> attribute,
   * otherwise returns <code>YYYY-MM-dd</code>.
   * @return {string} Returns date format.
   */
  this.getFormat = function() {
    return element_.getAttribute('data-format') || opt_options['format'];
  };

  /**
   * <code>protected</code> Gets related HTML element.
   * @return {Node} Returns related HTML element.
   * @protected
   */
  this.getElement = function() {
    return element_;
  };

  /**
   * <code>protected</code> Gets reference to
   * <code>{@link controls.Calendar}</code>.
   * @return {controls.Calendar} Returns reference to
   * <code>{@link controls.Calendar}</code>.
   * @protected
   */
  this.getCalendar = function() {
    return calendar_;
  };

  /**
   * Shows date picker control.
   * @param {Node|Element} element The related element.
   * @example
   * <input onclick="controls.DatePicker.show(this)"
   *        data-format="YYYY/MM/dd"
   *        value="2013/06/20"
   *        readonly>
   */
  this.show = function(element) {
    /** @type {Node} */ var picker = controls.DatePicker.control_;
    if ('block' === picker.style.display) {
      self_.hide();
    } else {
      element_ = element;
      draw_();
      /** @type {number} */ var y = dom.document.documentElement.scrollTop ||
                                    dom.context.pageYOffset || 0;
      /** @type {number} */ var x = dom.document.documentElement.scrollLeft ||
                                    dom.context.pageXOffset || 0;
      /** @type {Object} */ var rect = dom.getBoundingClientRect(element);
      // TODO: implement possibility to show picker above element.
      picker.style.top = (rect['bottom'] + y) + 'px';
      picker.style.left = (rect['left'] + x) + 'px';
      picker.style.display = 'block';
      dom.events.addEventListener(
          dom.document, dom.events.TYPE.KEYDOWN, keydown_);
      dom.events.addEventListener(
          dom.document, dom.events.TYPE.MOUSEDOWN, mousedown_);
    }
  };

  // Export for closure compiler.
  this['show'] = this.show;

  /**
   * Hides date picker control.
   */
  this.hide = function() {
    if (controls.DatePicker.control_)
      controls.DatePicker.control_.style.display = 'none';
    dom.events.removeEventListener(
        dom.document, dom.events.TYPE.KEYDOWN, keydown_);
    dom.events.removeEventListener(
        dom.document, dom.events.TYPE.MOUSEDOWN, mousedown_);
  };

  // Export for closure compiler.
  this['hide'] = this.hide;

  /**
   * Sets formatted date as element value.
   * <br><i>Note:</i> For HTML form elements sets <code>value</code> attribute,
   * for other HTML elements sets <code>innerHTML</code>.
   * Dispatches {@link dom.events.TYPE.CHANGE} event.
   * @param {string} value The formatted date value.
   */
  this.setValue = function(value) {
    if ('value' in element_) element_.value = value;
    else element_.innerHTML = value;

    dom.events.dispatchEvent(element_, dom.events.TYPE.CHANGE);
  };

  /**
   * Gets element value.
   * <br><i>Note:</i> From HTML form elements gets <code>value</code> attribute,
   * from other HTML elements gets <code>textContent || innerText</code>.
   * @return {string} Returns element value.
   */
  this.getValue = function() {
    return element_.getAttribute('data-value') || element_.value ||
           element_.textContent || element_.innerText;
  };

  /**
   * <code>protected</code> Gets list of date objects.
   * @return {!Array.<Date>} Returns list of date objects.
   * @protected
   */
  this.getDates = function() {
    /** @type {string} */ var value = self_.getValue();
    return [value ?
          formatter_.parse(value, self_.getFormat()) : util.Date.getDate()];
  };

  /**
   * Handles calendar click event.
   * @protected
   */
  this.clickHandler = function() {
    self_.setValue(formatter_.format(calendar_.getDate(), self_.getFormat()));
    self_.hide();
  };

  /**
   * @private
   */
  function draw_() {
    calendar_ ? calendar_.clear() : init_();
    calendar_.draw(self_.getDates());
    calendar_.addEventListener(dom.events.TYPE.CLICK, self_.clickHandler);
  }

  /**
   * @private
   */
  function init_() {
    if (!controls.DatePicker.control_) {
      controls.DatePicker.control_ = dom.document.body.appendChild(
          dom.createElement('DIV'));
      controls.DatePicker.control_.style.position = 'absolute';
      dom.css.setClass(controls.DatePicker.control_, 'date-picker');
    }
    calendar_ = new controls.Calendar(
        controls.DatePicker.control_, opt_options);
  }

  /**
   * @param {Event} e The keydown event.
   * @private
   */
  function keydown_(e) {
    e = dom.events.getEvent(e);
    27 == (e.keyCode || e.which) && self_.hide();
  }

  /**
   * @param {Event} e The mousedown event.
   * @private
   */
  function mousedown_(e) {
    /** @type {boolean} */ var hide = true;
    /** @type {EventTarget} */ var target = dom.events.getEventTarget(e);

    if (target) {
      for (; target && 'BODY' != target.tagName;) {
        if (target == controls.DatePicker.control_) {
          hide = false;
          break;
        }
        target = target.parentNode;
      }
      hide && self_.hide();
    }
  }

  /**
   * The reference to current class instance. Used in private methods.
   * @type {!controls.DatePicker}
   * @private
   */
  var self_ = this;

  /**
   * @type {Node}
   * @private
   */
  var element_ = dom.NULL;

  /**
   * @type {controls.Calendar}
   * @private
   */
  var calendar_ = dom.NULL;

  /**
   * @type {!formatters.DateFormatter}
   * @private
   */
  var formatter_ = new formatters.DateFormatter;

  init_();
};


/**
 * Shows date picker control.
 * @param {Node} element The related element.
 * @static
 */
controls.DatePicker.show = function(element) {
  if (!element.picker_) {
    element.picker_ = new controls.DatePicker;
  }
  element.picker_.show(element);
};
