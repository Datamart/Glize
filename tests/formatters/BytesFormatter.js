
/**
 * @fileoverview Bytes format library test suite.
 *
 * @link https://google.github.io/styleguide/javascriptguide.xml
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @link https://code.google.com/p/js-test-driver/
 */


formatters.BytesFormatterTestCase = TestCase('BytesFormatterTestCase');


formatters.BytesFormatterTestCase.prototype.testFormat = function() {

  var formatter = new formatters.BytesFormatter;
  assertEquals('1000 bytes', formatter.formatBytes(1000));
  assertEquals('1.00 KB', formatter.formatBytes(1024));
  assertEquals('976.56 KB', formatter.formatBytes(1e6));
  assertEquals('1.91 MB', formatter.formatBytes(2e6));
};
