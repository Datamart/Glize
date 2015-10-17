
/**
 * @fileoverview Simple implementation of JSONP.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://en.wikipedia.org/wiki/JSONP
 */


/**
 *  Simple implementation of JSONP.
 * @see https://en.wikipedia.org/wiki/JSONP
 * @namespace
 */
net.JSONP = {
  /**
   * The query-string parameter name.
   * @const {string}
   */
  CALLBACK_KEY: 'jsonp',

  /**
   * Performs JSONP request.
   * @param {string} url The URL to which to send the request.
   * @param {!Function} callback The callback function.
   * @see dom.scripts.load
   * @see https://en.wikipedia.org/wiki/JSONP
   */
  load: function(url, callback) {
    /** @type {number} */ var random = ~~(Math.random() * 1e9);
    /** @type {string} */ var key = net.JSONP.CALLBACK_KEY + '_' + random;
    /** @type {string} */ var query = net.JSONP.CALLBACK_KEY + '=' + key;

    dom.context[key] = function(data) {
      callback(data);
      dom.context[key] = dom.NULL;
    };

    dom.scripts.load(url + (~url.indexOf('?') ? '&' : '?') + query, function() {
      net.JSONP.count_--;
    });

    net.JSONP.count_++;
  },

  /**
   * Gets count of active requests.
   * @return {number} Returns count of active requests.
   */
  getCount: function() {
    return net.JSONP.count_;
  },

  /**
   * The count of active requests.
   * @type {number}
   * @see net.JSONP#getCount
   * @private
   */
  count_: 0
};
