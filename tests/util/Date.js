
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

util.DateTestCase.prototype.testGetWeekDate = function() {
  assertEquals('2015-W43', util.Date.getWeekDate(new Date(2015, 9, 22)));
  assertEquals('2004-W53', util.Date.getWeekDate(new Date(2005, 0, 1)));

  // ISO year 2009 has 53 weeks and ends three days into Gregorian year 2010.
  assertEquals('2009-W53', util.Date.getWeekDate(new Date(2009, 11, 31)));
  assertEquals('2009-W53', util.Date.getWeekDate(new Date(2010, 0, 1)));
  assertEquals('2009-W53', util.Date.getWeekDate(new Date(2010, 0, 2)));
  assertEquals('2009-W53', util.Date.getWeekDate(new Date(2010, 0, 3)));
};
