# Utilities
- [number-utils](#number-utils--) 
- [strings-util](#strings-util--)


# number-utils [![NPM version](https://img.shields.io/npm/v/number-utils.svg?style=flat)](https://npmjs.org/package/number-utils) [![NPM downloads](https://img.shields.io/npm/dm/number-utils.svg?style=flat)](https://npmjs.org/package/number-utils)

Number utility methods.

## Install

```
$ npm install number-utils
```

## Usage

```js
const numberUtils = require('number-utils');

numberUtils.isInteger(123);
// => true
numberUtils.isInteger(1.23);
// => false
numberUtils.isInteger('123');
// => false

numberUtils.random(5, 9);
// A random integer between 5 and 9.
```

## API

### MIN_SAFE_INTEGER
The constant represents the minimum safe integer in JavaScript.

### MAX_SAFE_INTEGER
The constant represents the maximum safe integer in JavaScript.

### boolean isInteger(value)
Determines whether the passed value is an integer.

### boolean isSafeInteger(value)
Determines whether the provided value is a number that is a safe integer.

### integer random(min, max)
Returns a random integer greater than or equal to "min" and less than or equal "max".

## Resources
- http://www.ecma-international.org/ecma-262/6.0/#sec-number-objects
- http://www.ecma-international.org/ecma-262/6.0/#sec-number.isinteger
- https://github.com/Datamart/Glize/blob/master/src/util/Number.js

# strings-util [![NPM version](https://img.shields.io/npm/v/strings-util.svg?style=flat)](https://npmjs.org/package/strings-util) [![NPM downloads](https://img.shields.io/npm/dm/strings-util.svg?style=flat)](https://npmjs.org/package/strings-util)

String utility methods.

## Install

```
$ npm install strings-util
```

## Usage

```js
const stringsUtil = require('strings-util');

stringsUtil.trim('  test  ');
// => "test"
stringsUtil.trimLeft('  test  ');
// => "test  "
stringsUtil.trimRight('  test  ');
// => "  test"

stringsUtil.startsWith('test string', 'test');
// => true
stringsUtil.endsWith('test string', 'string');
// => true

stringsUtil.capitalize('test');
// => "Test"
stringsUtil.capitalize('test string');
// => "Test String"
```

## API

### string trim(str)
Trims leading and trailing whitespace from the given string.

### string trimLeft(str)
Removes whitespace from the left end of the string.

### string trimRight(str)
Removes whitespace from the right end of the string.

### boolean startsWith(str, prefix)
Checks whether <code>str</code> starts with <code>prefix</code>.

### boolean endsWith(str, suffix)
Checks whether <code>str</code> ends with <code>suffix</code>.

### string capitalize(str)
Transforms the first character of each word to uppercase; other characters are unaffected.

## Resources
- http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.20
- http://www.w3.org/wiki/CSS/Properties/text-transform
- https://github.com/Datamart/Glize/blob/master/src/util/String.js
