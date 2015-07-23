
/**
 * @fileoverview Date util test suite.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://code.google.com/p/js-test-driver/
 */


util.DateTestCase = TestCase('DateTestCase');


util.DateTestCase.prototype.testToISOString = function() {
  var date = new Date(2015, 0, 31, 0, 0, 0);
  date.toISOString = null; // clear native.

  assertEquals('2015-01-30T22:00:00.000Z', util.Date.toISOString(date));
};

util.DateTestCase.prototype.testToAmPmTime = function() {
  assertEquals('12:30 AM', util.Date.toAmPmTime('00:30'));
  assertEquals('1:15 AM', util.Date.toAmPmTime('01:15'));
  assertEquals('11:45 AM', util.Date.toAmPmTime('11:45'));
  assertEquals('12:15 PM', util.Date.toAmPmTime('12:15'));
  assertEquals('1:15 PM', util.Date.toAmPmTime('13:15'));
  assertEquals('11:15 PM', util.Date.toAmPmTime('23:15'));
};
