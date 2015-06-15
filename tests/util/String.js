
/**
 * @fileoverview String test suite.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 * @see {@link https://code.google.com/p/js-test-driver/}
 */


util.StringTestCase = TestCase('StringTestCase');


util.StringTestCase.prototype.testTrim = function() {
  assertEquals('test string', util.String.trim('  test string  '));
  assertEquals('test string', util.String.trimLeft('  test string'));
  assertEquals('test string', util.String.trimRight('test string  '));
};
