/**
 * @fileoverview Debouncing and throttling events utility methods.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://github.com/Datamart/debouncing
 * @module glize/utils/events
 */

import { debounce, throttle } from 'debouncing';
export {
  /**
   * In the debouncing technique, no matter how many times the user fires the 
   * event, the attached function will be executed only after the specified 
   * time once the user stops firing the event.
   * 
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds.
   * @param {!Function} func The function to execute.
   * @param {number=} timeout The timeout in milliseconds.
   * @return {!Function} Returns a function, that, as long as it continues 
   *     to be invoked, will not be triggered.
   * @see https://davidwalsh.name/javascript-debounce-function
   * @see https://github.com/Datamart/debouncing
   * @method
   */
  debounce,

  /**
   * Throttling is a technique in which, no matter how many times the user 
   * fires the event, the attached function will be executed only once in a 
   * given time interval.
   * 
   * Returns a function, that, as long as it continues to be invoked, will only
   * trigger every N milliseconds.
   * @param {!Function} func The function to execute.
   * @param {number=} timeout The timeout in milliseconds.
   * @return {!Function} Returns a function, that, as long as it continues 
   *     to be invoked, will only trigger every N milliseconds.
   * @see https://github.com/Datamart/debouncing
   * @method
   */
  throttle
};
