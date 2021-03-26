import * as assert from 'assert/strict';
import {compressors} from 'glize';

const runTests = () => {
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
