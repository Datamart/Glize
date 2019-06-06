/**
 * @fileoverview MetaData utils.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Constructor of MetaData.
 * @constructor
 * @extends {util.PropertyReader} util.PropertyReader
 * @example
 * var meta = new util.MetaData();
 * console.log(meta.getMetaData());
 * console.log(meta.getMetaData(document));
 * console.log(meta.getMetaData(document.getElementById('container')));
 * console.log(meta.getMetaData(ajax.responseXML));
 */
util.MetaData = function() {
  util.PropertyReader.apply(this, arguments);

  /**
   * @param {?Document|?Node=} opt_context The optional DOM context.
   * @return {!Object.<string, string>} Returns meta data.
   */
  this.getMetaData = function(opt_context) {
    self_.read(opt_context || dom.document, 'meta', 'name', 'content');
    return self_.getData();
  };

  /**
   * @type {!util.MetaData}
   * @private
   */
  var self_ = this;
};
