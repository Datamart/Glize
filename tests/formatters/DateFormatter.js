
/**
 * @fileoverview Date format library test suite.
 *
 * @link https://google.github.io/styleguide/javascriptguide.xml
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @link https://code.google.com/p/js-test-driver/
 */


formatters.DateFormatterTestCase = TestCase('DateFormatterTestCase');


formatters.DateFormatterTestCase.prototype.testFormat = function() {
  var date = new Date(2013, 5, 15, 13, 30);
  locale.getLocale = function() {return 'en'};

  var formatter = new formatters.DateFormatter();
  assertEquals('2013-06-15', formatter.format(date, 'YYYY-MM-dd'));
  assertEquals('2013-06-15 13:30', formatter.format(date, 'YYYY-MM-dd hh:mm'));
  assertEquals('15 Jun, 2013', formatter.format(date, 'dd MMM, YYYY'));

  assertEquals('2013-06-15', formatters.DateFormatter.format(date, 'YYYY-MM-dd'));
  assertEquals('2013-06-15 13:30', formatters.DateFormatter.format(date, 'YYYY-MM-dd hh:mm'));
  assertEquals('15 Jun, 2013', formatters.DateFormatter.format(date, 'dd MMM, YYYY'));

  assertEquals('2013-06-15T13:30:00.000Z', formatter.format(date, 'YYYY-MM-ddThh:mm:ss.000Z'));
};


formatters.DateFormatterTestCase.prototype.testParse = function() {
  var date = new Date(2013, 5, 15, 13, 30);
  locale.getLocale = function() {return 'en'};

  var formatter = new formatters.DateFormatter();
  assertEquals(date, formatter.parse('2013-06-15 13:30', 'YYYY-MM-dd hh:mm'));
  assertEquals(date, formatter.parse('15 Jun, 2013 13:30', 'dd MMM, YYYY hh:mm'));
};
