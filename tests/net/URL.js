
/**
 * @fileoverview URL utils test suite.
 * @link http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @link https://code.google.com/p/js-test-driver/
 */


net.URLTestCase = TestCase('URLTestCase');

net.URLTestCase.prototype.testURL = function() {
  net.URL = net.URL_; // clear native window.URL.
  var str = 'http://www.example.com:80/dir/file.html?a=b&c=d#e=f';
  var url = new net.URL(str);
  assertEquals('http:', url.protocol);
  assertEquals('www.example.com:80', url.host);
  assertEquals('www.example.com', url.hostname);
  assertEquals('80', url.port);
  assertEquals('/dir/file.html', url.pathname);
  assertEquals('?a=b&c=d', url.search);
  assertEquals('#e=f', url.hash);
  assertEquals(str, url.toString());
};

net.URLTestCase.prototype.testToAbsolute = function() {
  var data = [
    ['http://base.com/mypage1.html', 'mypage1.html', 'http://base.com'],
    ['http://base.com/mypage2.html', './mypage2.html', 'http://base.com'],
    ['http://base.com/mypage3.html', '../mypage3.html', 'http://base.com/dir'],
    ['http://base.com/dir1/mypage4.html', '../dir1/mypage4.html', 'http://base.com/dir1'],
    ['http://base.com/dir1/mypage5.html', '/dir1/mypage5.html', 'http://base.com/dir1'],
    [null, '../../dir1/mypage6.html', 'http://base.com/dir1']
  ];

  for (var i = 0; i < data.length; i++) {
    var params = data[i];
    assertEquals(params[0], net.toAbsolute(params[1], params[2]));
  }
};
