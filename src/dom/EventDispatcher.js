/**
 * @fileoverview Event-driven implementation is based on W3C DOM Level 3
 *     {@link http://www.w3.org/TR/domcore/#events|Events} Specification.
 *
 * @see http://www.w3.org/TR/domcore/#interface-eventtarget
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * The <code>EventDispatcher<code> class implements W3C
 * {@link http://www.w3.org/TR/domcore/#interface-eventtarget|EventTarget} and
 * {@link http://www.w3.org/TR/domcore/#eventlistener|EventListener} interfaces.
 * @see http://www.w3.org/TR/domcore/#interface-eventtarget
 * @see http://www.w3.org/TR/domcore/#eventlistener
 * @constructor
 */
dom.EventDispatcher = function() {

  /**
   * Registers an event listener.
   * @param {string} type The event type for which the user is registering.
   * @param {function(?Event)} listener The listener parameter
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
   * @param {function(?Event)} listener Reference to the event
   *     listener to be removed.
   * @return {boolean} Returns true if listener was removed.
   * @see http://www.w3.org/TR/domcore/#dom-eventtarget-removeeventlistener
   */
  this.removeEventListener = function(type, listener) {
    /** @type {?Array} */ var listeners = events_[type];
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
   * @param {!Event|!Object|string} evt The event object or event type to be
   *     dispatched.
   * @see http://www.w3.org/TR/domcore/#dom-eventtarget-dispatchevent
   */
  this.dispatchEvent = function(evt) {
    /** @type {string} */ var type = 'string' == typeof evt ? evt : evt['type'];
    /** @type {?Array} */ var listeners = events_[type];
    /** @type {number} */ var length = listeners ? listeners.length : 0;
    /** @type {number} */ var index = 0;

    while (index < length) {
      listeners[index++](/** @type {!Event} */({'target': self_, 'type': type}));
    }
  };

  /**
   * Events storage.
   * @type {!Object.<string, !Array>}
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
