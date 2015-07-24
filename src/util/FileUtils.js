
/**
 * @fileoverview Miscellaneous files utility methods.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


/**
 * Miscellaneous files utility methods.
 * @requires util.Base64
 * @namespace
 */
util.FileUtils = {
  /**
   * @param {string} data Data content.
   * @param {string=} opt_fileName Optional file name.
   * @param {string=} opt_contentType Optional content type.
   * @see http://msdn.microsoft.com/en-us/library/cc848897(VS.85).aspx
   */
  saveAs: function(data, opt_fileName, opt_contentType) {
    /** @type {Element} */ var link = dom.createElement('A');
    opt_fileName = opt_fileName || 'file';
    opt_contentType = opt_contentType || 'text/plain';
    if (dom.context['Blob'] && 'download' in link) {
      link['href'] = (dom.context['URL'] || dom.context['webkitURL']).
          createObjectURL(
          new dom.context['Blob'](
          [data], {'type': opt_contentType + ';charset=' + dom.CHARSET}));
      link.setAttribute('download', opt_fileName);
      dom.document.body.appendChild(link);
      link.click();
    } else {
      dom.context.open('data:' + opt_contentType +
          ';base64,' + util.Base64.encode(data));
    }
  }
};
