
/**
 * @fileoverview Simple Beacon implementation.
 *
 * @see http://w3c.github.io/beacon/
 * @see http://www.w3.org/TR/beacon/#sec-sendBeacon-method
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Simple Beacon implementation.
 * @requires net.HttpRequest
 * @namespace
 */
dom.Beacon = {
  /**
   * Transmits data provided by the <code>data</code> parameter to the URL
   * provided by the <code>url</code> parameter.
   * @param {string} url The parameter indicates the resolved URL where the
   *     <code>data</code> is to be transmitted.
   * @param {ArrayBufferView|Blob|FormData|string=} opt_data The optional data
   *     to be transmitted.
   * @return {boolean} Returns <code>true</code> if the user agent is able to
   *     successfully queue the data for transfer.
   */
  sendBeacon: function(url, opt_data) {
    /** @type {Function} */ var fn = dom.device['sendBeacon'];
    /** @type {boolean} */ var result = fn ? fn(url, opt_data) : true;
    /** @type {XMLHttpRequest} */ var req;

    if (!fn) {
      req = dom.context.XMLHttpRequest ?
          new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
      req.open('POST', url, false);
      req.setRequestHeader('Accept', '*/*');
      req.setRequestHeader('Content-Type', 'text/plain;charset=' + dom.CHARSET);
      req.send(opt_data);
    }

    return result;
  }
};
