
/**
 * @fileoverview Defines animations utility methods.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */


/**
 * Defines animations utility methods.
 * @namespace
 */
var animation = {
  /**
   * Runs animations.
   * @param {!Node} element The element to animate.
   * @param {!Object.<string, string|number>} options The animation options.
   * @example
   * animation.animate(element, {'width': 500});
   * animation.animate(element, {'width': 0});
   */
  animate: function(element, options) {
    // Testing.
    // if (element.tagName == 'DIV') return animation.run_(element, options);

    if ('transition' in element.style) {
      for (/** @type {string} */ var key in options) {
        animation.setCssProperty_(element, key, options[key]);
      }
    } else {
      animation.run_(element, options);
    }
  },

  /**
   * @param {!Node} element The element to animate.
   * @param {string} property The CSS property name.
   * @param {string|number} value The CSS property value.
   * @private
   */
  setCssProperty_: function(element, property, value) {
    /** @type {!RegExp} */ var isDigit = /^\d+([\.]{1,}\d+)?$/;
    /** @type {number} */ var timer = setTimeout(function() {
      element.style.transition = 'all ' +
          Math.random().toFixed(2) + 's ease-in-out';
      if ('transform' === property) {
        element.style.transform =
            element.style.WebkitTransform =
            element.style.MozTransform =
            element.style.OTransform = value;
      } else {
        element.style[property] = value + (isDigit.test(value) ? 'px' : '');
      }
      clearTimeout(timer);
    }, dom.context['XULElement'] ? 99 : 0); // fix Firefox issue with delay 99ms
  }
};


/**
 * Runs animation by property.
 * @param {Node} element Animated element.
 * @param {Object.<string, number>} options Animation options.
 * @private
 */
animation.run_ = function(element, options) {
  /**
   * @param {function(number)} frame The frame function.
   * @param {function(number): number=} opt_delta The optional delta function.
   * @param {number=} opt_duration The optional duration.
   * @param {number=} opt_delay The optional delay.
   */
  function animate(frame, opt_delta, opt_duration, opt_delay) {
    opt_duration = (opt_duration || 300) * Math.random() + 100;
    opt_delay = opt_delay || 10;
    opt_delta = opt_delta || function(progress) {
      //return Math.pow(progress, 2);
      return progress;
    };

    /** @type {!Date} */ var start = util.Date.getDate();
    /** @type {number} */ var progress;
    /** @type {number} */ var interval = setInterval(function() {
      progress = (util.Date.getDate() - start) / opt_duration;
      if (1 < progress) progress = 1;
      frame(opt_delta(progress));
      if (1 === progress) clearInterval(interval);
    }, opt_delay);
  }

  animate(function(delta) {
    for (/** @type {string} */ var prop in options) {
      element.style[prop] = options[prop] * delta + 'px';
    }
  });
};

