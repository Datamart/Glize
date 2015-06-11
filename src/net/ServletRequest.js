
/**
 * @fileoverview Simple implementation of
 *               <code>javax.servlet.ServletRequest.</code>
 *
 * @see {@link //docs.oracle.com/javaee/5/api/javax/servlet/ServletRequest.html}
 * @see {@link //google.github.io/styleguide/javascriptguide.xml}
 * @see {@link //developers.google.com/closure/compiler/docs/js-for-compiler}
 */



/**
 * Simple implementation of <code>javax.servlet.ServletRequest</code>.
 * @requires util.StringUtils.URI
 * @requires net.URL
 * @constructor
 * @see http://docs.oracle.com/javaee/5/api/javax/servlet/ServletRequest.html
 */
net.ServletRequest = function() {

  /**
   * Returns the value of a request parameter as a string, or empty string if
   * the parameter does not exist.
   * @param {string} name A <code>string</code> specifying the name of the
   *     parameter.
   * @param {Element|Location|string=} opt_location Optional location object.
   * @return {string} Returns a <code>string</code> representing the single
   *     value of the parameter.
   */
  this.getParameter = function(name, opt_location) {
    /** @type {!Object.<string, string>} */
    var map = self_.getParameterMap(opt_location);
    return map[/** @type {string} */ (name)] || '';
  };

  /**
   * Returns a map of the parameters of this request including parameters from
   * parsed from query string and hash.
   * @param {Element|Location|string=} opt_location Optional location object.
   * @return {!Object.<string, string>} Map containing parameter names as keys
   *     and parameter values as map values.
   */
  this.getParameterMap = function(opt_location) {
    /** @type {!Object.<string, string>} */ var map = {};
    /** @type {!Array.<string>} */ var pairs = getParameterList_(opt_location);
    /** @type {number} */ var index = pairs.length >>> 0;

    while (index--) {
      /** @type {!Array.<string>} */ var pair = pairs[index].split('=');
      /** @type {string} */ var key = pair[0];
      if (key) map[key] = util.StringUtils.URI.decode(pair[1]);
    }
    return map;
  };

  /**
   * Gets list of parameters pairs parsed form <code>opt_location</code>.
   * @param {Element|Location|net.URL|string=} opt_location Optional location.
   * @return {!Array.<string>} Returns list of parameters pairs.
   * @private
   */
  function getParameterList_(opt_location) {
    opt_location = opt_location || location;
    if ('string' == typeof opt_location) {
      opt_location = new net.URL(opt_location);
    }

    return opt_location.search.substr(1).split('&').concat(
        opt_location.hash.substr(1).split('&'));
  }

  /**
   * The reference to current class instance.
   * Used in private methods and for preventing jslint errors.
   * @type {!net.ServletRequest}
   * @private
   */
  var self_ = this;
};
