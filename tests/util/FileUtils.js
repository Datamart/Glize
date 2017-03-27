
/**
 * @fileoverview Array utils test suite.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 * @see {@link https://code.google.com/p/js-test-driver/}
 */


util.FileUtilsTestCase = TestCase('FileUtilsTestCase');


util.FileUtilsTestCase.prototype.testToBlob = function() {
  var data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAA9CAMAAABx7';
  var blob = util.FileUtils.toBlob(data);

  assertNotNull(blob);
  assertEquals('object', typeof blob);
  assertTrue(blob instanceof Blob);
  assertEquals('image/png', blob.type);

  assertNull(util.FileUtils.toBlob('data'));
};

/**
 * @bug https://github.com/ariya/phantomjs/issues/14247
 * @bug TypeError: FileConstructor is not a constructor
 */
util.FileUtilsTestCase.prototype.testToFile = function() {
  // var data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAA9CAMAAABx7';
  // var file = util.FileUtils.toFile(data, 'filename');

  // assertNotNull(file);
  // assertEquals('object', typeof file);
  // assertTrue(file instanceof Blob);
  // assertTrue(file instanceof File);
  // assertEquals('image/png', file.type);
  // assertEquals('filename', file.name);
};
