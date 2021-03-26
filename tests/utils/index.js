import * as assert from 'assert';
import {utils} from 'glize';

const runTests = () => {
  testContains();
  testArrayRandom();
  testToArray();
  testToAmPmTime();
  testGetWeekDate();
  testCapitalize();
  testToQueryString();
  testUuid4();
  testHashString();
};

const testContains = () => {
  const arr = ['a', 'b', 'c', 'd'];
  assert.ok(utils.array.contains(arr, 'a'));
  assert.ok(utils.array.contains(arr, 'c'));
  assert.ok(!utils.array.contains(arr, 'w'));
};

const testArrayRandom = () => {
  const arr = ['a', 'b', 'c', 'd'];
  const rnd = utils.array.random(arr);

  assert.ok('undefined' !== typeof rnd);
  assert.ok('string' === typeof rnd);
  assert.ok(utils.array.contains(arr, rnd));
  assert.ok(rnd.charCodeAt(0) >= 97);
  assert.ok(rnd.charCodeAt(0) <= 100);
};

const testToArray = () => {
  (function() {
    const arr = utils.array.toArray(arguments);
    assert.equal(arguments.length, arr.length);
    assert.equal(arguments[0], arr[0]);
  })(1, 2, 3);

  const str = '123';
  const arr = utils.array.toArray(str);
  assert.equal(str.length, arr.length);
  assert.equal(str, arr.join(''));
};

const testToAmPmTime = () => {
  assert.equal('12:30 AM', utils.date.toAmPmTime('00:30'));
  assert.equal('1:15 AM', utils.date.toAmPmTime('01:15'));
  assert.equal('11:45 AM', utils.date.toAmPmTime('11:45'));
  assert.equal('12:15 PM', utils.date.toAmPmTime('12:15'));
  assert.equal('1:15 PM', utils.date.toAmPmTime('13:15'));
  assert.equal('11:15 PM', utils.date.toAmPmTime('23:15'));
};

const testGetWeekDate = () => {
  assert.equal('2015-W43', utils.date.getWeekDate(new Date(2015, 9, 22)));
  assert.equal('2004-W53', utils.date.getWeekDate(new Date(2005, 0, 1)));

  // ISO year 2009 has 53 weeks and ends three days into Gregorian year 2010.
  assert.equal('2009-W53', utils.date.getWeekDate(new Date(2009, 11, 31)));
  assert.equal('2009-W53', utils.date.getWeekDate(new Date(2010, 0, 1)));
  assert.equal('2009-W53', utils.date.getWeekDate(new Date(2010, 0, 2)));
  assert.equal('2009-W53', utils.date.getWeekDate(new Date(2010, 0, 3)));
};

const testCapitalize = () => {
  assert.equal('Test', utils.string.capitalize('test'));
  assert.equal('Test String', utils.string.capitalize('test string'));
};

const testToQueryString = () => {
  const data = {a: 1, b: 'b', c: false};
  assert.equal('?a=1&b=b&c=false', utils.string.toQueryString(data));
};

const testUuid4 = () => {
  const uuid = utils.string.uuid4();
  assert.equal(36, uuid.length);
  assert.equal('4', uuid.substr(14, 1));
  const c = uuid.substr(19, 1).toLowerCase();
  assert.ok(['8', '9', 'a', 'b'].includes(c));
};

const testHashString = () => {
  assert.equal('4Q69R', utils.string.hash('https://glize.js.org/'));
};

runTests();
