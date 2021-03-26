import * as assert from 'assert/strict';
import {dom} from 'glize';

const runTests = () => {
  testTemplate();
  testCookies();
};

const testTemplate = () => {
  let expect = '<b>Test</b>';
  let values = {'var_name': 'Test'};
  let result = dom.template.parse('<b>{{ var_name }}</b>', values);
  assert.equal(expect, result);

  expect = '<b>John admin</b>';
  values = { 'user': {'name': 'John'}, 'role': () => {return 'admin';}};
  result = dom.template.parse('<b>{{ user.name }} {{ role }}</b>', values);
  assert.equal(expect, result);

  expect = '<b>Item $150</b>';
  values = { 'price': '$150'};
  result = dom.template.parse('<b>{{item.name|Item}} {{price}}</b>', values);
  assert.equal(expect, result);
};

const testCookies = () => {
  global.document = {}; // Mock object.
  const key = 'test-key';
  const value = 'test-value';
  dom.cookies.set(key, value, 1);
  assert.equal(value, dom.cookies.get(key));
  assert.ok(dom.cookies.keys().indexOf(key) != -1);
  assert.ok(dom.cookies.remove(key));
  assert.equal(dom.cookies.remove('not-existing-key'), false);
  assert.equal('test-default', dom.cookies.get(key, 'test-default'));
  global.document = null; // Release mock. 
};

runTests();
