
/**
 * @fileoverview Number format library test suite.
 * @link http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @link https://code.google.com/p/js-test-driver/
 */


formatters.NumberFormatterTestCase = TestCase('NumberFormatterTestCase');


formatters.NumberFormatterTestCase.prototype.testFormat = function() {
  var formatter = new formatters.NumberFormatter();
  assertEquals(formatter.formatNumber(100), '100');
  assertEquals(formatter.formatNumber(1000), '1,000');
  assertEquals(formatter.formatNumber(1500), '1,500');
  assertEquals(formatter.formatNumber(10000), '10,000');
  assertEquals(formatter.formatNumber(1e6), '1,000,000');

  var formatter = new formatters.NumberFormatter({'prefix': '$'});
  assertEquals(formatter.formatNumber(100), '$100');
  assertEquals(formatter.formatNumber(1e6), '$1,000,000');
};


formatters.NumberFormatterTestCase.prototype.testRound = function() {
  var formatter = new formatters.NumberFormatter();
  assertEquals(formatter.roundNumber(100), '100');
  assertEquals(formatter.roundNumber(1000), '1k');
  assertEquals(formatter.roundNumber(1500), '1.50k');
  assertEquals(formatter.roundNumber(10000), '10k');
  assertEquals(formatter.roundNumber(1e6), '1m');

  var formatter = new formatters.NumberFormatter({'prefix': '$'});
  assertEquals(formatter.roundNumber(100), '$100');
  assertEquals(formatter.roundNumber(1e6), '$1m');
};


formatters.NumberFormatterTestCase.prototype.testOrdinal = function() {
  var formatter = new formatters.NumberFormatter();
  assertEquals(formatter.ordinal(1), 'st');
  assertEquals(formatter.ordinal(2), 'nd');
  assertEquals(formatter.ordinal(3), 'rd');
  assertEquals(formatter.ordinal(4), 'th');
};
