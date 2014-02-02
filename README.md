# relative [![NPM version](https://badge.fury.io/js/relative.png)](http://badge.fury.io/js/relative)

> Easily calculate the relative path from file A to file B

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

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2014 [Jon Schlinkert](http://twitter.com/jonschlinkert), [Brian Woodward](http://twitter.com/doowb), contributors.
Released under the [MIT license](./LICENSE-MIT)