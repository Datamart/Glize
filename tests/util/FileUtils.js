
/**
 * @fileoverview Array utils test suite.
 *
 * @see {@link http://google.github.io/styleguide/javascriptguide.xml}
 * @see {@link developers.google.com/closure/compiler/docs/js-for-compiler}
 * @see {@link https://code.google.com/p/js-test-driver/}
 */


util.FileUtilsTestCase = TestCase('FileUtilsTestCase');

util.FileUtilsTestCase.TEST_DATA = [
  {type: 'image/png', data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAA9CAMAAABx7'},
  {type: 'text/html', data: 'data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E'},
  {type: 'text/plain', data: 'data:text/plain,Hello World!'},
  {type: 'text/plain', data: 'data:,Hello World!'}
];

util.FileUtilsTestCase.prototype.testToBlob = function() {
  for (var i = 0; i < util.FileUtilsTestCase.TEST_DATA.length;) {
    var test = util.FileUtilsTestCase.TEST_DATA[i++];
    var blob = util.FileUtils.toBlob(test.data);

    assertNotNull(blob);
    assertEquals('object', typeof blob);
    assertTrue(blob instanceof Blob);
    assertEquals(test.type, blob.type);
  }

  assertNull(util.FileUtils.toBlob('invalid-data'));
};

/**
 * @bug https://github.com/ariya/phantomjs/issues/14247
 * @bug TypeError: FileConstructor is not a constructor
 */
util.FileUtilsTestCase.prototype.testToFile = function() {
  // for (var i = 0; i < util.FileUtilsTestCase.TEST_DATA.length;) {
  //   var test = util.FileUtilsTestCase.TEST_DATA[i++];
  //   var file = util.FileUtils.toFile(test.data, 'filename');

  //   assertNotNull(file);
  //   assertEquals('object', typeof file);
  //   assertTrue(file instanceof Blob);
  //   assertTrue(file instanceof File);
  //   assertEquals(test.type, file.type);
  //   assertEquals('filename', file.name);
  // }
};
