'use strict';

var path = require('path');
var fs = require('fs');

/**
 * Expose `relative`
 */

module.exports = relative;

/**
 * Get the relative path from `a` to `b`.
 */

function relative(a, b, stat) {
  var len = arguments.length;
  if (len === 1) {
    b = a; a = process.cwd(); stat = null;
  }

  if (len === 2 && typeof b === 'boolean') {
    b = a; a = process.cwd(); stat = true;
  }

  if (len === 2 && typeof b === 'object') {
    stat = b; b = a; a = process.cwd();
  }

  var origB = b;
  var origA = a;

  // see if a slash exists before normalizing
  var slashA = endsWith(a, '/');
  var slashB = endsWith(b, '/');

  a = normalize(a);
  b = normalize(b);

  // if `a` had a slash, add it back
  if (slashA) { a = a + '/'; }

  if (isFile(a, stat)) {
    a = path.dirname(a);
  }

  var res = path.relative(a, b);
  if (res === '') {
    return '.';
  }

  // if `b` originally had a slash, and the path ends
  // with `b` missing a slash, then re-add the slash.
  var noslash = trimEnd(origB, '/');
  if (slashB && (res === noslash || endsWith(res, noslash))) {
    res = res + '/';
  }
  return res;
}

/**
 * Get the path relative to the given base path.
 */

relative.toBase = function toBase(base, fp) {
  base = normalize(base);
  fp = normalize(fp);

  var res = fp.slice(base.length);
  if (res.charAt(0) === '/') {
    res = res.slice(1);
  }
  return res;
};

/**
 * Normalize slashes in paths. This is necessary b/c
 * paths are not calculated the same by node.js when
 * windows paths are used.
 */

function normalize(str) {
  return str.replace(/[\\\/]+/g, '/');
}

/**
 * Remove the given character from the path.
 */

function trimEnd(fp, ch) {
  return fp.slice(0, fp.length - ch.length);
}

/**
 * Does the path end with the given `ch`aracter?
 */

function endsWith(fp, ch) {
  return fp.slice(-ch.length)[0] === ch;
}

/**
 * If `fp` exists, return a `stat` object,
 * otherwise return `null`.
 */

function tryStats(fp) {
  try {
    return fs.statSync(fp);
  } catch(err) {}
  return null;
}

/**
 * Returns true if `fp` is a directory. To use a `fs`
 * stat object to actually check the file system,
 * either pass `true` as the second arg, or pass your
 * own stat object as the second arg.
 *
 * @param  {String} `fp`
 * @param  {Boolean|Object} `stat`
 * @return {Boolean}
 */

function isDir(fp, stat) {
  if (endsWith(fp, '/')) {
    return true;
  }

  if (stat != null && typeof stat === 'object') {
    return stat.isDirectory();
  }

  var segs = fp.split('/');
  var last = segs[segs.length - 1];
  if (last && last.indexOf('.') !== -1) {
    return false;
  }
  return true;
}

/**
 * Return true if `fp` looks like a file, or
 * actually is a file if fs.stat is used.
 */

function isFile(fp, stat) {
  if (stat === true) {
    stat = tryStats(fp);
  }
  return !isDir(fp, stat);
}