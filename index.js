/**
 * Relative <https://github.com/jonschlinkert/relative>
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var path = require('path');



/**
 * Return the relative path from
 * @param   {[type]}  from  [description]
 * @param   {[type]}  to    [description]
 * @return  {[type]}        [description]
 */

var relative = module.exports = function(from, to) {
  from = !file.isDir(from) ? path.dirname(from) : from;
  var rel = path.relative(path.resolve(from), path.resolve(to));
  return file.normalizeSlash(rel);
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
  filepath = file.normalizeSlash(filepath);
  return filepath.replace(/^\//, '')
};