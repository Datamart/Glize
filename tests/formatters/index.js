import * as assert from 'assert/strict';
import {formatters} from 'glize';

const runTests = () => {
  testFormatBytes();
  testFormatDate();
  testParseDate();
  testFormatNumber();
  testRoundNumber();
  testOrdinal();
};

const testFormatBytes = () => {
  assert.equal('1000 bytes', formatters.formatBytes(1000));
  assert.equal('1.00 KB', formatters.formatBytes(1024));
  assert.equal('976.56 KB', formatters.formatBytes(1e6));
  assert.equal('1.91 MB', formatters.formatBytes(2e6));
};

const testFormatDate = () => {
  global.navigator = {'language': 'en'};
  const date = new Date(2013, 5, 15, 13, 30);
  assert.equal('2013-06-15', formatters.formatDate(date, 'YYYY-MM-dd'));
  assert.equal('2013-06-15 13:30', formatters.formatDate(date, 'YYYY-MM-dd hh:mm'));
  assert.equal('15 Jun, 2013', formatters.formatDate(date, 'dd MMM, YYYY'));
  assert.equal('2013-06-15T13:30:00.000Z', formatters.formatDate(date, 'YYYY-MM-ddThh:mm:ss.000Z'));
  assert.equal('20130615', formatters.formatDate(date, 'YYYYMMdd'));
  assert.equal('201306151330', formatters.formatDate(date, 'YYYYMMddhhmm'));
};

const testParseDate = () => {
  global.navigator = {'language': 'en'}; // Mock object.
  const date = new Date(2013, 5, 15, 13, 30);
  assert.equal(+date, +formatters.parseDate('2013-06-15 13:30', 'YYYY-MM-dd hh:mm'));
  assert.equal(+date, +formatters.parseDate('15 Jun, 2013 13:30', 'dd MMM, YYYY hh:mm'));
};

const testFormatNumber = () => {
  assert.equal(formatters.formatNumber(100), '100');
  assert.equal(formatters.formatNumber(1000), '1,000');
  assert.equal(formatters.formatNumber(1500), '1,500');
  assert.equal(formatters.formatNumber(10000), '10,000');
  assert.equal(formatters.formatNumber(1e6), '1,000,000');

  const options = {'prefix': '$'};
  assert.equal(formatters.formatNumber(100, options), '$100');
  assert.equal(formatters.formatNumber(1e6, options), '$1,000,000');
};

const testRoundNumber = () => {
  assert.equal(formatters.roundNumber(100), '100');
  assert.equal(formatters.roundNumber(1000), '1k');
  assert.equal(formatters.roundNumber(1500), '1.50k');
  assert.equal(formatters.roundNumber(10000), '10k');
  assert.equal(formatters.roundNumber(1e6), '1m');

  const options = {'prefix': '$'};
  assert.equal(formatters.roundNumber(100, options), '$100');
  assert.equal(formatters.roundNumber(1e6, options), '$1m');
};

const testOrdinal = () => {
  assert.equal(formatters.ordinal(1), 'st');
  assert.equal(formatters.ordinal(2), 'nd');
  assert.equal(formatters.ordinal(3), 'rd');
  assert.equal(formatters.ordinal(4), 'th');
};

runTests();
