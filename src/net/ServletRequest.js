/**
 * @fileoverview Simple implementation of
 *               <code>javax.servlet.ServletRequest.</code>
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see http://docs.oracle.com/javaee/7/api/javax/servlet/ServletRequest.html
 */



/**
 * Simple implementation of <code>javax.servlet.ServletRequest</code>.
 * @requires util.StringUtils.URI
 * @requires util.Object
 * @requires net.URL
 * @constructor
 * @see http://docs.oracle.com/javaee/7/api/javax/servlet/ServletRequest.html
 */
net.ServletRequest = function() {

  /**
   * Returns the value of a request parameter as a <code>string</code>, or empty
   * <code>string</code> if the parameter does not exist.
   * @param {string} name A <code>string</code> specifying the name of the
   *     parameter.
   * @param {?Element|?Location|string=} opt_location Optional location object.
   * @return {string} Returns a <code>string</code> representing the single
   *     value of the parameter.
   */
  this.getParameter = function(name, opt_location) {
    /** @type {!Object.<string, string>} */
    var map = self_.getParameterMap(opt_location);
    return map[name] || '';
  };

  /**
   * @param {?Element|?Location|string=} opt_location Optional location object.
   * @return {!Array.<string>} Returns an <code>Array</code> of
   * <code>string</code> objects, each <code>string</code> containing the name
   * of a request parameter; or an empty <code>Array</code> if the request has
   * no parameters.
   */
  this.getParameterNames = function(opt_location) {
    /** @type {!Object.<string, string>} */
    var map = self_.getParameterMap(opt_location);
    return util.Object.keys(map);
  };

  /**
   * Returns a map of the parameters of this request including parameters from
   * parsed from query string and hash.
   * @param {?Element|?Location|?net.URL|string=} opt_location Optional location.
   * @return {!Object.<string, string>} Map containing parameter names as keys
   *     and parameter values as map values.
   */
  this.getParameterMap = function(opt_location) {
    opt_location = opt_location || location;
    if ('string' === typeof opt_location) {
      opt_location = new net.URL(opt_location);
    }

    /** @type {string} */ var url = opt_location.toString();
    /** @type {!Object.<string, string>} */ var map = {};
    /** @type {!Array.<string>} */ var pairs;
    /** @type {!Array.<string>} */ var pair;
    /** @type {number} */ var index;
    /** @type {string} */ var key;

    if (!(url in maps_)) {
      pairs = opt_location.search.substr(1).split('&').concat(
          opt_location.hash.substr(1).split('&'));
      index = pairs.length >>> 0;
      while (index--) {
        pair = pairs[index].split('=');
        key = pair[0];
        if (key) map[key] = util.StringUtils.URI.decode(pair[1]);
      }
      maps_[url] = map;
    }

    return maps_[url];
  };

  /**
   * The reference to current class instance.
   * Used in private methods and for preventing jslint errors.
   * @type {!net.ServletRequest}
   * @private
   */
  var self_ = this;

  /**
   * Cache for parsed parameters maps.
   * @type {!Object.<string, !Object.<string,string>>}
   * @private
   */
  var maps_ = {};
};
