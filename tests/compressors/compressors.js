
/**
 * @fileoverview Compressors util test suite.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://code.google.com/p/js-test-driver/
 */



util.CompressorsTestCase = TestCase('CompressorsTestCase');

util.CompressorsTestCase.prototype.testLzw = function() {
  var input = 'TOBEORNOTTOBEORTOBEORNOT#';
  var encoded = compressors.LZW.compress(input);
  assertTrue(input.length > encoded.length);
  var decoded = compressors.LZW.decompress(encoded);
  assertTrue(input.length == decoded.length);
  assertEquals(input, decoded);

  encoded = compressors.compress(input, compressors.TYPE.LZW);
  assertTrue(input.length > encoded.length);
  decoded = compressors.decompress(encoded, compressors.TYPE.LZW);
  assertTrue(input.length == decoded.length);
  assertEquals(input, decoded);
};
