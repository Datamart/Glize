
/**
 * @fileoverview Date utils test suite.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 * @see {@link https://code.google.com/p/js-test-driver/}
 */


util.DateUtilsTestCase = TestCase('DateUtilsTestCase');


util.DateUtilsTestCase.prototype.testToISOString = function() {
  var date = new Date(2015, 0, 31, 0, 0, 0);
  date.toISOString = null; // clear native.

  assertEquals('2015-01-30T22:00:00.000Z', util.Date.toISOString(date));
};
