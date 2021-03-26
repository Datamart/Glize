import * as assert from 'assert';
import * as net from '../../src/net/index.js';

const runTests = () => {
  testJsonpLoad();
  testJsonpCount();
  testGetParameter();
  testGetParameterNames();
  testGetParameterMap();
  testGetQueryString();
};

const testJsonpLoad = () => {
  const url = 'https://archive.org/index.php?output=json&callback=callback';
  net.jsonp.load(url, 'callback')
    .then((data) => {})
    .catch((reason) => {})
    .finally(() => {})
};

const testJsonpCount = () => {
  assert.equal('number', typeof net.jsonp.getCount());
  assert.ok(net.jsonp.getCount() >= 0);
};

const testGetParameter = () => {
  const url = 'http://localhost?a=1&b=2#c=3&d=4';
  assert.equal('1', net.request.getParameter('a', url));
  assert.equal('2', net.request.getParameter('b', url));
  assert.equal('3', net.request.getParameter('c', url));
  assert.equal('4', net.request.getParameter('d', url));
};

const testGetParameterNames = () => {
  const url = 'http://localhost?a=1&b=2#c=3&d=4';
  const names = net.request.getParameterNames(url);
  assert.equal(4, names.length);
};

const testGetParameterMap = () => {
  const url = 'http://localhost?a=1&b=2#c=3&d=4';
  const map = net.request.getParameterMap(url);
  assert.equal('1', map['a']);
  assert.equal('2', map['b']);
  assert.equal('3', map['c']);
  assert.equal('4', map['d']);
};

const testGetQueryString = () => {
  let url = 'https://aa.bb/cc?dd=ee&ff=gg#hh=ii';
  let query = net.request.getQueryString(url);
  assert.equal('dd=ee&ff=gg', query);

  url = 'https://aa.bb/cc?#hh=ii';
  query = net.request.getQueryString(url);
  assert.equal('', query);

  url = 'https://aa.bb/cc#hh=ii';
  query = net.request.getQueryString(url);
  assert.equal('', query);
}

runTests();
