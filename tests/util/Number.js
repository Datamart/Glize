
/**
 * @fileoverview Number utils test suite.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 * @see {@link https://code.google.com/p/js-test-driver/}
 */


util.NumberUtilsTestCase = TestCase('NumberUtilsTestCase');


util.NumberUtilsTestCase.prototype.isInteger = function() {
  Number.isInteger = null; // clear native.

  assertEquals(true, util.Number.isInteger(3));
  assertEquals(true, util.Number.isInteger(8e3));
  assertEquals(true, util.Number.isInteger(Number.MAX_VALUE));
  assertEquals(true, util.Number.isInteger(util.Number.MIN_SAFE_INTEGER));
  assertEquals(true, util.Number.isInteger(util.Number.MAX_SAFE_INTEGER));

  assertEquals(false, util.Number.isInteger('3'));
  assertEquals(false, util.Number.isSafeInteger(NaN));
  assertEquals(false, util.Number.isSafeInteger(Infinity));
  assertEquals(false, util.Number.isSafeInteger(null));
};

util.NumberUtilsTestCase.prototype.isSafeInteger = function() {
  Number.isSafeInteger = null; // clear native.

  assertEquals(true,  util.Number.isSafeInteger(3));
  assertEquals(true,  util.Number.isSafeInteger(8e3));
  assertEquals(true,  util.Number.isSafeInteger(util.Number.MIN_SAFE_INTEGER));
  assertEquals(true,  util.Number.isSafeInteger(util.Number.MAX_SAFE_INTEGER));

  assertEquals(false, util.Number.isSafeInteger(Math.pow(2, 53)));
  assertEquals(false, util.Number.isSafeInteger(NaN));
  assertEquals(false, util.Number.isSafeInteger(Infinity));
  assertEquals(false, util.Number.isSafeInteger('3'));
  assertEquals(false, util.Number.isSafeInteger(3.1));
  assertEquals(false, util.Number.isSafeInteger(null));
  assertEquals(false, util.Number.isSafeInteger(Number.MAX_VALUE));
};
