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
    assert.strictEqual(arguments.length, arr.length);
    assert.strictEqual(arguments[0], arr[0]);
  })(1, 2, 3);

  const str = '123';
  const arr = utils.array.toArray(str);
  assert.strictEqual(str.length, arr.length);
  assert.strictEqual(str, arr.join(''));
};

const testToAmPmTime = () => {
  assert.strictEqual('12:30 AM', utils.date.toAmPmTime('00:30'));
  assert.strictEqual('1:15 AM', utils.date.toAmPmTime('01:15'));
  assert.strictEqual('11:45 AM', utils.date.toAmPmTime('11:45'));
  assert.strictEqual('12:15 PM', utils.date.toAmPmTime('12:15'));
  assert.strictEqual('1:15 PM', utils.date.toAmPmTime('13:15'));
  assert.strictEqual('11:15 PM', utils.date.toAmPmTime('23:15'));
};

const testGetWeekDate = () => {
  assert.strictEqual('2015-W43', utils.date.getWeekDate(new Date(2015, 9, 22)));
  assert.strictEqual('2004-W53', utils.date.getWeekDate(new Date(2005, 0, 1)));

  // ISO year 2009 has 53 weeks and ends three days into Gregorian year 2010.
  assert.strictEqual('2009-W53', utils.date.getWeekDate(new Date(2009, 11, 31)));
  assert.strictEqual('2009-W53', utils.date.getWeekDate(new Date(2010, 0, 1)));
  assert.strictEqual('2009-W53', utils.date.getWeekDate(new Date(2010, 0, 2)));
  assert.strictEqual('2009-W53', utils.date.getWeekDate(new Date(2010, 0, 3)));
};

const testCapitalize = () => {
  assert.strictEqual('Test', utils.string.capitalize('test'));
  assert.strictEqual('Test String', utils.string.capitalize('test string'));
};

const testToQueryString = () => {
  const data = {a: 1, b: 'b', c: false};
  assert.strictEqual('?a=1&b=b&c=false', utils.string.toQueryString(data));
};

const testUuid4 = () => {
  const variant = ['8', '9', 'a', 'b'];
  const re = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  for (let i = 0; i < 99; ++i) {
    const uuid = utils.string.uuid4();
    assert.ok(re.test(uuid), 'UUID "' + uuid + '" does not match to the regular expression.');
    assert.strictEqual(uuid.length, 36, 'The length of the UUID "' + uuid + '" is not equal to 36.');
    assert.strictEqual(uuid.substr(14, 1), '4', 'Invalid UUID version.');
    const c = uuid.substr(19, 1).toLowerCase();
    assert.ok(variant.includes(c), 'Invalid UUID variant field (RFC 4122/DCE).');
  }
};

const testHashString = () => {
  assert.strictEqual('4Q69R', utils.string.hash('https://glize.js.org/'));
};

runTests();
