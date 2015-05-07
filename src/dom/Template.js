
/**
 * @fileoverview Simple logic-less template engine.
 * @link http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 */



/**
 * Simple logic-less template engine.
 * @requires net.HttpRequest
 * @constructor
 */
dom.Template = function() {

  /**
   * Loads template by URL.
   * @param {string} url The template path.
   * @param {!function(string)} callback The callback function.
   * @param {!Object} values The template values as dict.
   * @example
   * <b>var</b> values = {
   *   'date': '2013-07-18',
   *   'user': {'name': 'John'},
   *   'func': <b>function</b>() {<b>return</b> 'Hello World.';}
   * };
   * <b>var</b> callback = <b>function</b>(content) {
   *   document.getElementById('div').innerHTML = content;
   * };
   * <b>var</b> template = <b>new</b> dom.Template();
   * template.load('template.html', callback, values);
   */
  this.load = function(url, callback, values) {
    if (cache_[url]) {
      callback(self_.parse(cache_[url], values));
    } else {
      request_.doGet(url, function(req) {
        cache_[url] = req['responseText'];
        callback(self_.parse(cache_[url], values));
      });
    }
  };

  /**
   * Parses template text content.
   * @param {string} content The template text content.
   * @param {!Object} values The template values as dict.
   * @param {string=} opt_prefix The optional var name prefix.
   * @return {string} Returns parsed template text content.
   * @example
   * <b>var</b> values = {
   *   'date': '2013-07-18',
   *   'user': {'name': 'John'},
   *   'func': <b>function</b>() {<b>return</b> 'Hello World.';}
   * };
   * <b>var</b> content = '{{ date }} {{ user.name }} {{ func }}';
   * <b>var</b> template = <b>new</b> dom.Template();
   * document.getElementById('div').innerHTML = template.parse(content, values);
   */
  this.parse = function(content, values, opt_prefix) {
    /** @type {number} */ var i = 0;
    /** @type {*} */ var value;
    /** @type {string} */ var key;
    /** @type {Array} */ var matches;
    /** @type {string} */ var match;
    /** @type {string} */ var name;
    /** @type {!RegExp} */ var re;

    for (key in values) {
      name = ((opt_prefix ? opt_prefix + '.' : '') + key).replace('.', '\\.');
      value = values[key];
      re = new RegExp('{{ ' + name + '(\\|\\w+)? }}', 'img');
      if (value instanceof Array) {
        value = value.join(', ');
        if (value) content = content.replace(re, value);
      } else if ('function' == typeof value) {
        value = value();
        if (value) content = content.replace(re, '' + value);
      } else if ('object' == typeof value) {
        content = self_.parse(content, /** @type {!Object} */ (value), key);
      } else if (value) {
        content = content.replace(re, '' + value);
      }
    }

    if (!opt_prefix) {
      // Replace default values.
      matches = content.match(/\{\{ [\w\-\.]+(\|\w+) \}\}/img);
      if (matches) {
        for (; i < matches.length;) {
          match = matches[i++];
          value = match.match(/\|(\w+) \}\}/);
          content = content.replace(match, (value && value[1]) || '');
        }
      }
      // Clear all not parsed variables.
      content = content.replace(/\{\{ [\w\-\.]+ \}\}/img, '');
    }
    return content;
  };

  /**
   * @dict
   * @private
   */
  var cache_ = {};

  /**
   * @type {!net.HttpRequest}
   * @private
   */
  var request_ = new net.HttpRequest;

  /**
   * The reference to current class instance. Used in private methods.
   * @type {!dom.Template}
   * @private
   */
  var self_ = this;
};
