
/**
 * @fileoverview Simple implementation of
 *               <code>javax.servlet.http.HttpServletRequest</code>.
 *
 * @see {@link //google.github.io/styleguide/javascriptguide.xml}
 * @see {@link //developers.google.com/closure/compiler/docs/js-for-compiler}
 */



/**
 * Simple implementation of <code>javax.servlet.http.HttpServletRequest<code>.
 * @constructor
 * @extends {net.ServletRequest} net.ServletRequest
 * @requires dom.scripts
 * @requires dom.Cookies
 */
net.HttpServletRequest = function() {
  net.ServletRequest.apply(this, arguments);

  /**
   * Returns the query string that is contained in the request URL after the
   *     path.
   * @return {string} Returns the query string that is contained in the request
   *     URL after the path.
   */
  this.getQueryString = function() {
    return location.search && location.search.substr(1);
  };

  /**
   * Returns an <code>Array</code> of all the cookies included
   * with this request.
   * @return {!Array.<Object>} Returns an <code>Array</code> of all the cookies
   * included with this request.
   */
  this.getCookies = function() {
    /** @type {!Array.<string>} */ var keys = dom.Cookies.keys();
    /** @type {number} */ var length = keys.length;
    /** @type {number} */ var i = 0;
    /** @type {!Array.<Object>} */ var cookies = [];
    /** @type {string} */ var name;

    for (; i < length;) {
      name = keys[i++];
      cookies[i] = {'name': name, 'value': dom.Cookies.get(name)};
    }
    return cookies;
  };

  /**
   * Returns the portion of the request URI that indicates the context of the
   * request.
   * @return {string} Returns current context path.
   */
  this.getContextPath = function() {
    if (!net.HttpServletRequest.contextPath_) {
      /** @type {Element} */ var script = dom.scripts.getCurrent();
      if (script) {
        /** @type {string} */ var path = script.getAttribute('src');
        /** @type {Element} */ var a = dom.createElement('A');
        a['href'] = path;

        // Replace all relatives.
        path = path.replace(/(\.+\/)+/, '');
        net.HttpServletRequest.contextPath_ = a['pathname'].replace(path, '');
      }
    }
    return net.HttpServletRequest.contextPath_ || '';
  };
};
