
/**
 * @fileoverview Event-driven implementation is based on W3C DOM Level 3
 * Events Specification.
 *
 * @see {@link http://www.w3.org/TR/domcore/#interface-eventtarget}
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 */



/**
 * The EventDispatcher class implements W3C EventTarget and EventListener
 * interfaces.
 * @see {@link http://www.w3.org/TR/domcore/#interface-eventtarget}
 * @constructor
 */
dom.EventDispatcher = function() {

  /**
   * Registers an event listener.
   * @param {string} type The event type for which the user is registering.
   * @param {function(dom.EventDispatcher)} listener The listener parameter
   *     takes an interface implemented by the user which contains the
   *     methods to be called when the event occurs.
   * @see http://www.w3.org/TR/domcore/#dom-eventtarget-addeventlistener
   */
  this.addEventListener = function(type, listener) {
    events_[type] = (events_[type] || []).concat([listener]);
  };

  /**
   * Removes an event listener.
   * @param {string} type The event type of the listener being removed.
   * @param {function(dom.EventDispatcher)} listener Reference to the event
   *     listener to be removed.
   * @return {boolean} Returns true if listener was removed.
   * @see http://www.w3.org/TR/domcore/#dom-eventtarget-removeeventlistener
   */
  this.removeEventListener = function(type, listener) {
    /** @type {Array} */ var listeners = events_[type];
    /** @type {number} */ var length = listeners ? listeners.length : 0;

    while (length--) {
      if (listeners[length] === listener) {
        listeners.splice(length, 1);
        return true;
      }
    }
    return false;
  };

  /**
   * Dispatches an event into the implementation's event model.
   * @param {Event|Object|string} evt The event object or event type to be
   * dispatched.
   * @see http://www.w3.org/TR/domcore/#dom-eventtarget-dispatchevent
   */
  this.dispatchEvent = function(evt) {
    /** @type {string} */ var type = 'string' == typeof evt ? evt : evt['type'];
    /** @type {Array} */ var listeners = events_[type];
    /** @type {number} */ var length = listeners ? listeners.length : 0;
    /** @type {number} */ var index = 0;

    while (index < length) {
      listeners[index++](self_);
    }
  };

  /**
   * Event storage.
   * @type {!Object.<string, Array>}
   * @private
   */
  var events_ = {};

  /**
   * The reference to current class instance.
   * Used in private methods and for preventing jslint errors.
   * @type {!dom.EventDispatcher}
   * @private
   */
  var self_ = this;
};
