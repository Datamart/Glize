/**
 * @fileoverview Simple logic-less template engine.
 *
 * @see https://google.github.io/styleguide/javascriptguide.xml
 * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @module glize/dom/template
 */

/**
 * Parses template text content.
 * @param {string} content The template text content.
 * @param {!Object} values The template values as dict.
 * @param {string=} opt_prefix The optional var name prefix.
 * @return {string} Returns parsed template text content.
 * @example
 * const values = {
 *   'date': '2013-07-18',
 *   'user': {'name': 'John'},
 *   'func': () => {return 'Hello World.';}
 * };
 * const content = '{{ date }} {{ user.name }} {{ func }} {{ empty|default }}';
 * document.getElementById('div').innerHTML = parseTemplate(content, values);
 * @method
 */
export const parseTemplate = (content, values, opt_prefix) => {
  const placeholder = '__DOLLAR__' + Date.now();
  const pattern = (str = '') => {
    return '{{\\s*' + str.replace('.', '\\.') + '(\\|[\\w\\-\\.]+)?\\s*}}';
  };

  for (let key in values) {
    let value = values[key];
    key = ((opt_prefix ? opt_prefix + '.' : '') + key);

    if ('object' == typeof value) {
      content = parseTemplate(content, /** @type {!Object} */ (value), key);
    } else {
      if (Array.isArray(value)) {
        value = value.join(', ');
      } else if ('function' == typeof value) {
        value = value();
      }

      if (value) {
        let re = new RegExp(pattern(key), 'img');
        value = value.replace('$', placeholder);
        content = content.replace(re, value);
        content = content.replace(placeholder, '$');
      }
    }
  }

  if (!opt_prefix) {
    content = parseDefaultValue_(content);
  }

  return content;
};

/**
 * @param {string} content The content to parse.
 * @return {string} Returns parsed content.
 * @private
 */
const parseDefaultValue_ = (content) => {
  // Replace default values.
  let matches = content.match(/\{\{\s*[\w\-\.]+(\|\w+)\s*\}\}/img);
  if (matches) {
    for (let i = 0; i < matches.length;) {
      let match = matches[i++];
      let value = match.match(/\|(\w+)\s*\}\}/);
      content = content.replace(match, (value && value[1]) || '');
    }
  }

  // Clear all not parsed variables.
  content = content.replace(/\{\{\s*[\w\-\.]+\s*\}\}/img, '');

  return content;
};
