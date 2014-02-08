# relative [![NPM version](https://badge.fury.io/js/relative.png)](http://badge.fury.io/js/relative)

> Easily calculate the relative path from file A to file B in Node.js project.

## Installation

Install with [npm](npmjs.org):

```bash
npm i relative --save
```

## Usage

```js
var relative = require('relative');
relative(from, to);

// Example
relative('test/fixtures/foo.txt', 'docs');
// => '../../docs'
```

**Calculates correctly from:**

* File to directory
* File to file
* Directory to file
* Directory to directory


### relative.toBase

Get the relative path from the given base path.

```js
relative.toBase(basepath, filepath)
```

Example:

```js
relative.toBase('one/two', 'one/two/three/four.json')
//=> three/four.json
```

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2014 [Jon Schlinkert](http://twitter.com/jonschlinkert), contributors.
Released under the [MIT license](./LICENSE-MIT)