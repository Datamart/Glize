/**
 * @fileoverview PropertyReader utils.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Constructor of PropertyReader.
 * @constructor
 */
util.PropertyReader = function() {

  /**
   * Gets attribute' values of <code>tagName</code> founded in
   *     <code>context</code>.
   * @param {?Document|?Node} context The DOM context.
   * @param {string} tagName The element tag name.
   * @param {string} attribute The name of attribute.
   * @param {string} value The name of value attribute.
   * @see util.MetaData
   */
  this.read = function(context, tagName, attribute, value) {
    if (context) {
      /** @type {?NodeList} */
      var nodes = dom.getElementsByTagName(context, tagName);
      /** @type {number} */ var i = 0;
      /** @type {!Node} */ var node;
      /** @type {string} */ var name;
      /** @type {string} */ var result;

      for (; i < nodes.length;) {
        node = nodes[i++];
        name = node.getAttribute(attribute);
        if (name) {
          result = node.getAttribute(value);
          cache_[name] = result;
          values_.push(result);
          names_.push(name);
        }
      }
    }
  };

  /**
   * @return {!Array.<string>} Returns list of values.
   */
  this.getValues = function() {
    return values_;
  };

  /**
   * @return {!Array.<string>} Returns list of names.
   */
  this.getNames = function() {
    return names_;
  };

  /**
   * @return {!Object.<string, string>} Returns data object.
   */
  this.getData = function() {
    return cache_;
  };

  /**
   * @param {string} key The property key.
   * @return {?string} Returns property value.
   */
  this.getValue = function(key) {
    return cache_[key];
  };

  /**
   * @dict
   * @private
   */
  var cache_ = {};

  /**
   * @type {!Array.<string>}
   * @private
   */
  var values_ = [];

  /**
   * @type {!Array.<string>}
   * @private
   */
  var names_ = [];
};
