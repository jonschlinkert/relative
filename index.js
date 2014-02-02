/**
 * Relative <https://github.com/jonschlinkert/relative>
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var path = require('path');

var relative = module.exports = function(from, to) {
  from = !file.isDir(from) ? path.dirname(from) : from;
  var rel = path.relative(path.resolve(from), path.resolve(to));
  return file.normalizeSlash(rel);
};
