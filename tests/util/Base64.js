
/**
 * @fileoverview Base64 test suite.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 * @see {@link https://code.google.com/p/js-test-driver/}
 */


util.Base64TestCase = TestCase('Base64TestCase');


util.Base64TestCase.prototype.testBase64 = function() {
   // clear native 'btoa' and 'atob' methods.
  dom.context = {btoa: null, atob: null};

  var input = 'test';
  var expected = 'dGVzdA==';
  var encoded = util.Base64.encode(input);
  var decoded = util.Base64.decode(encoded);

  assertNotNull(encoded);
  assertNotNull(decoded);
  assertEquals(expected, encoded);
  assertEquals(input, decoded);
};
