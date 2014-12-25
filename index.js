'use strict';

var path = require('path');

/**
 * Expose `relative`
 */

module.exports = relative;

/**
 * Return the relative path from `a` to `b`.
 *
 * **Example**:
 *
 * ```js
 * var relative = require('relative');
 * relative('a/b/foo.txt', 'c/d/file.txt');
 * //=> '../../c/d/file.txt'
 * ```
 *
 * @param   {String} `from`
 * @param   {String} `to`
 * @return  {String}
 * @api public
 */

function relative(a, b) {
  if (arguments.length === 1) {
    b = a; a = process.cwd();
  }

  a = normalize(path.resolve(a));
  b = normalize(path.resolve(b));

  if (/\./.test(path.basename(a))) {
    a = path.dirname(a);
  }

  var relativePath = path.relative(a, b);
  return relativePath.charAt(0) !== '.' ? './' + relativePath : relativePath;
}

/**
 * Get the path relative to the given base path.
 *
 * **Example**:
 *
 * ```js
 * relative.toBase('a/b', 'a/b/c/d/file.txt');
 * //=> 'c/d/file.txt'
 * ```
 *
 * @param {String} `base` The base directory
 * @param {String} `fp` The full filepath
 * @return {String} The relative path
 * @api public
 */

relative.toBase = function toBase(base, fp) {
  base = normalize(path.resolve(base));
  fp = normalize(path.resolve(fp));

  if (fp.indexOf(base) === 0) {
    fp = fp.replace(base, '');
  }

  // Remove leading slash, if created
  return fp.replace(/^[\\\/]*/, '');
};


/**
 * Normalize slashes in paths. This is necessary b/c
 * paths are not calculated the same by node.js when
 * windows paths are used.
 *
 * @api private
 */

function normalize(str) {
  return str.replace(/[\\\/]+/g, '/');
}
