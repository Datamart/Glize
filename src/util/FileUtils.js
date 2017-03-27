
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
      dom.appendChild(dom.document.body, link);
      link.click();
    } else {
      dom.context.open('data:' + opt_contentType +
          ';base64,' + util.Base64.encode(data));
    }
  },

  /**
   * Converts dataURL to Blob.
   * @param {string} data The dataURL.
   * @return {Blob} Returns dataURL converted to Blob.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Blob
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
   */
  toBlob: function(data) {
    /** @type {Blob} */ var blob = dom.NULL;
    /** @type {RegExp} */
    var re = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,/;

    if (re.test(data)) {
      /** @type {!Array.<string>} */ var parts = data.split(',');
      /** @type {string} */ var type = parts[0].split(':')[1].split(';')[0];
      /** @type {Function} */ var decoder = ~parts[0].indexOf('base64') ?
                                            util.Base64.decode : unescape;
      /** @type {string} */ var byteString = decoder(parts[1]);
      /** @type {number} */ var length = byteString.length;
      /** @type {Uint8Array} */ var byteArray = new Uint8Array(length);
      /** @type {number} */ var i = 0;

      for (; i < length; ++i) {
        byteArray[i] = byteString.charCodeAt(i);
      }

      blob = new Blob([byteArray], {type: type || 'text/plain'});
    }
    return blob;
  },

  /**
   * Converts dataURI to File.
   * @param {string} data The dataURL.
   * @return {File} Returns dataURL converted to File.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/File
   */
  toFile: function(data, name) {
    /** @type {Blob} */ var blob = util.FileUtils.toBlob(data);
    return blob && new File([blob], name, {type: blob.type});
  }
};
