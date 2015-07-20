
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
  var expected = 'bc';
  var callback = function(element, index) {
    return 'b' == element || 'c' == element;
  };
  arr.filter = null; // clear native.

  assertEquals(expected, util.Array.filter(arr, callback).join(''));
  assertEquals(expected, util.Array.filter(arr.join(''), callback).join(''));
};

util.ArrayUtilsTestCase.prototype.testMap = function() {
  var arr = ['a', 'b', 'c', 'd'];
  var expected = '97,98,99,100';
  var callback = function(element, index) {
    return element.charCodeAt(0);
  };
  arr.map = null; // clear native.

  assertEquals(expected, util.Array.map(arr, callback).join(','));
  assertEquals(expected, util.Array.map(arr.join(''), callback).join(','));
};

util.ArrayUtilsTestCase.prototype.testContains = function() {
  var arr = ['a', 'b', 'c', 'd'];
  arr.indexOf = null; // clear native.

  assertEquals(true, util.Array.contains(arr, 'a'));
  assertEquals(true, util.Array.contains(arr, 'c'));
  assertEquals(false, util.Array.contains(arr, 'w'));
};

util.ArrayUtilsTestCase.prototype.testRandom = function() {
  var arr = ['a', 'b', 'c', 'd'];
  var rnd = util.Array.random(arr);

  assertNotNull(rnd);
  assertTrue('undefined' !== typeof rnd);
  assertTrue('string' === typeof rnd);
  assertTrue(util.Array.contains(arr, rnd));
  assertTrue(rnd.charCodeAt(0) >= 97);
  assertTrue(rnd.charCodeAt(0) <= 100);
};

util.ArrayUtilsTestCase.prototype.testToArray = function() {
  (function() {
    var list = util.Array.toArray(arguments);
    assertNotNull(list);
    assertEquals(arguments.length, list.length);
    assertEquals(arguments[0], list[0]);
  })(1, 2, 3);

  var str = '123';
  var list = util.Array.toArray(str);
  assertEquals(str.length, list.length);
  assertEquals(str, list.join(''));
};
