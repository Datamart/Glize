import * as compressors from '../../src/compressors/index.js';
// import assert from 'assert/strict';
import * as path from 'path';
import * as assert from 'assert';

const runTests = () => {
  console.log('path.delimiter', path.delimiter);
  testDefaultCompressor();
  testLzwCompressor();
};

const testDefaultCompressor = function() {
  const input = 'TOBEORNOTTOBEORTOBEORNOT#';
  const encoded = compressors.compress(input);
  const decoded = compressors.decompress(encoded);

  assert.ok(input.length > encoded.length);
  assert.equal(input.length, decoded.length);
  assert.equal(input, decoded);
}

const testLzwCompressor = function() {
  const input = 'TOBEORNOTTOBEORTOBEORNOT#';
  const encoded = compressors.compress(input, compressors.TYPE.LZW);
  const decoded = compressors.decompress(encoded, compressors.TYPE.LZW);

  assert.ok(input.length > encoded.length);
  assert.equal(input.length, decoded.length);
  assert.equal(input, decoded);
};

runTests();
