/**
 * relative <https://github.com/jonschlinkert/relative>
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const fs = require('fs');
const path = require('path');


// True if the filepath is a directory.
function isDir() {
  var filepath = path.join.apply(path, arguments);
  if (!fs.existsSync(filepath)) {
    return false;
  }
  return fs.statSync(filepath).isDirectory();
}

// Unixify all slashes
function normalizeSlash(str) {
  return str.replace(/\\/g, '/');
}


/**
 * Return the relative path from
 * @param   {[type]}  from  [description]
 * @param   {[type]}  to    [description]
 * @return  {[type]}        [description]
 */

var relative = module.exports = function(from, to) {
  if(arguments.length === 1) {
    to = from;
    from = process.cwd();
  }

  from = !isDir(from) ? path.dirname(from) : from;
  var rel = path.relative(path.resolve(from), path.resolve(to));
  return normalizeSlash(rel);
};


/**
 * Get the relative path from the given
 * base path.
 *
 * @param   {String}  basepath  The base directory
 * @param   {String}  filepath  The full filepath
 * @return  {String}            The relative path
 */

relative.toBase = function (basepath, filepath) {
  filepath = path.resolve(filepath);
  basepath = path.resolve(basepath);

  if (filepath.indexOf(basepath) === 0) {
    filepath = filepath.replace(basepath, '');
  }
  filepath = normalizeSlash(filepath);

  // Remove leading slash.
  return filepath.replace(/^\//, '');
};


/**
 * Check the path to see if it _can be_ relative.
 * This is really just a disqualification of
 * paths that _cannot be_ relative.
 *
 * @param {String} filepath Path to test
 * @return {Boolean}
 */

relative.isRelative = function (filepath) {
  return !/^([a-z]{2,10}:\/)?\//i.test(filepath);
};