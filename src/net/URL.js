
/**
 * @fileoverview Creates a URL object composed from the given parameters.
 * @see http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Creates and return a URL object composed from the given parameters.
 * @param {string} url Is a String representing an absolute or relative URL.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
 * @constructor
 */
net.URL = window['URL'] || window['webkitURL'] || function(url) {

  /**
   * @private
   */
  function init_() {
    self_['protocol'] = match_[2] ? match_[2] + ':' : '';
    self_['host'] = match_[4] || '';
    self_['hostname'] = self_['host'].split(':')[0];
    self_['port'] = +(self_['host'].split(':')[1]) || '';
    self_['pathname'] = match_[5] || '';
    self_['search'] = match_[7] ? ('?' + match_[7]) : '';
    self_['hash'] = match_[9] ? ('#' + match_[9]) : '';

    self_['toString'] = function() {
      return self_['protocol'] + '//' + self_['host'] +
             self_['pathname'] + self_['search'] + self_['hash'];
    };
  }

  /**
   * The regular expression for matching URL parts from <code>url</code> string.
   * @type {!RegExp}
   * @private
   */
  var regexp_ = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

  /**
   * The list of matched URL parts.
   * @type {!Array.<string>}
   * @private
   */
  var match_ = (url || '').match(regexp_) || [];

  /**
   * The reference to current class instance.
   * Used in private methods and for preventing jslint errors.
   * @type {!net.URL}
   * @private
   */
  var self_ = this;

  init_();

  return self_;
};
