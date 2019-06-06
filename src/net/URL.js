/**
 * @fileoverview Creates a URL object composed from the given parameters.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see http://developer.mozilla.org/en-US/docs/Web/API/URL/URL
 */


/**
 * @const
 * @private
 */
net.NATIVE_URL_ = window['URL'] || window['webkitURL'];



/**
 * Creates and return a URL object composed from the given parameters.
 * @param {string} url Is a String representing an absolute or relative URL.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
 * @constructor
 * @private
 */
net.URL_ = function(url) {
  /**
   * @return {string} Returns URL string representation.
   */
  this.toString = function() {
    return self_['protocol'] + '//' + self_['host'] +
           self_['pathname'] + self_['search'] + self_['hash'];
  };

  // Export for closure compiler.
  this['toString'] = this.toString;

  /**
   * @private
   */
  function init_() {
    /** @type {!RegExp} */ var regexp =
        /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    /** @type {!Array.<string>} */ var match = (url || '').match(regexp) || [];
    self_['protocol'] = match[2] ? match[2] + ':' : '';
    self_['host'] = match[4] || '';
    self_['hostname'] = self_['host'].split(':')[0];
    self_['port'] = +(self_['host'].split(':')[1]) || '';
    self_['pathname'] = match[5] || '';
    self_['search'] = match[7] ? ('?' + match[7]) : '';
    self_['hash'] = match[9] ? ('#' + match[9]) : '';
    self_['origin'] = self_['protocol'] + '//' + self_['host'];
  }

  /**
   * The reference to current class instance.
   * Used in private methods and for preventing jslint errors.
   * @type {!net.URL_}
   * @private
   */
  var self_ = this;

  init_();
};



/**
 * Creates and return a URL object composed from the given parameters.
 * @param {string} url Is a String representing an absolute or relative URL.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
 * @constructor
 */
net.URL = net.NATIVE_URL_ || net.URL_;


/**
 * Resolves relative URL to absolute.
 * @param {string} url Relative URL.
 * @param {string=} opt_base Optional base URL.
 * @return {string} Returns absolute URL.
 * @static
 */
net.toAbsolute = function(url, opt_base) {
  opt_base = (opt_base || location.href).split('?')[0].split('#')[0];

  if (url) {
    if (/^https?:\/\//.test(url)) {
      return url; // The URL is already absolute.
    }

    if (/^\/\//.test(url)) {
      return 'http:' + url;  // The URL is already absolute.
    }

    if (/^(data|javascript|mailto|sms|tel|)\:/.test(url)) {
      return url;
    }

    /** @type {!net.URL} */ var obj = new net.URL(opt_base);
    /** @type {!Array.<string>} */ var parts = url.split('/');
    /** @type {number} */ var length = parts.length;
    /** @type {number} */ var i = 0;
    /** @type {!Array.<string>} */ var base = [];

    if (!/^\//.test(url)) {
      base = obj['pathname'].split('/');
      base.pop();
    }

    for (; i < length; i++) {
      if ('.' != parts[i]) {
        if ('..' == parts[i]) {
          if ('undefined' == typeof base.pop())
            return dom.NULL;
        } else {
          base.push(parts[i]);
        }
      }
    }
    return obj['origin'] + ('/' + base.join('/')).replace('//', '/');
  }

  return dom.NULL;
};
