/**
 * relative <https://github.com/jonschlinkert/relative>
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var isDir = require('is-directory');

/**
 * Return the relative path from `a` to `b`.
 *
 * **Example**:
 *
 * ```js
 * var relative = require('relative');
 * relative('test/fixtures/foo.txt', 'docs/new/file.txt');
 * //=> '../../docs/new/file.txt'
 * ```
 *
 * @param   {String} `from`
 * @param   {String} `to`
 * @return  {String}
 * @api public
 */

var relative = module.exports = function relative(from, to) {
  if (arguments.length === 1) {
    to = from;
    from = process.cwd();
  }

  if (!isDir(from)) {
    from = path.dirname(from);
  }

  from = path.resolve(from);
  to = path.resolve(to);

  return path.relative(from, to);
};


/**
 * Get the path relative to the given base path.
 *
 * **Example**:
 *
 * ```js
 * relative.toBase('test/fixtures', 'test/fixtures/docs/new/file.txt');
 * //=> 'docs/new/file.txt'
 * ```
 *
 * @param {String} `basepath` The base directory
 * @param {String} `filepath` The full filepath
 * @return {String} The relative path
 * @api public
 */

relative.toBase = function toBase(basepath, filepath) {
  filepath = path.resolve(filepath);
  basepath = path.resolve(basepath);

  if (filepath.indexOf(basepath) === 0) {
    filepath = filepath.replace(basepath, '');
  }

  // Remove leading slash if one was created
  return filepath.replace(/^[\\\/]*/, '');
};
