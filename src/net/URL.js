
/**
 * @fileoverview Creates a URL object composed from the given parameters.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see http://developer.mozilla.org/en-US/docs/Web/API/URL/URL
 */



/**
 * Creates and return a URL object composed from the given parameters.
 * @param {string} url Is a String representing an absolute or relative URL.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
 * @constructor
 * @return {undefined}
 */
net.URL = window['URL'] || window['webkitURL'] || function(url) {
  // The '@return {undefined}' fixes following warning:
  // found   : function (new:net.URL, string): ?
  // expected: function (new:net.URL, string): undefined

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
   * @type {!net.URL}
   * @private
   */
  var self_ = this;

  init_();
};
