
/**
 * @fileoverview Array utils test suite.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 * @see {@link https://code.google.com/p/js-test-driver/}
 */


util.ArrayUtilsTestCase = TestCase('ArrayUtilsTestCase');


util.ArrayUtilsTestCase.prototype.testIndexOf = function() {
  var arr = ['a', 'b', 'c', 'd'];
  arr.indexOf = null; // clear native.

  assertEquals(0, util.Array.indexOf(arr, 'a'));
  assertEquals(1, util.Array.indexOf(arr, 'b'));
  assertEquals(2, util.Array.indexOf(arr, 'c'));
};

util.ArrayUtilsTestCase.prototype.testIsArray = function() {
  Array.isArray = null; // clear native.

  assertEquals(true, util.Array.isArray([1, 2, 3]));
  assertEquals(false, util.Array.isArray(null));
  assertEquals(false, util.Array.isArray(1));
  assertEquals(false, util.Array.isArray('string'));
  assertEquals(false, util.Array.isArray(new Date));
};

util.ArrayUtilsTestCase.prototype.testFilter = function() {
  var arr = ['a', 'b', 'c', 'd'];
  arr.filter = null; // clear native.

  var result = util.Array.filter(arr, function(element, index) {
    return 'b' == element || 'c' == element;
  });

  assertEquals('bc', result.join(''));
};

util.ArrayUtilsTestCase.prototype.testContains = function() {
  var arr = ['a', 'b', 'c', 'd'];
  arr.indexOf = null; // clear native.

  assertEquals(true, util.Array.contains(arr, 'a'));
  assertEquals(true, util.Array.contains(arr, 'c'));
  assertEquals(false, util.Array.contains(arr, 'w'));
};