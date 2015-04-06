/*!
 * relative <https://github.com/jonschlinkert/relative>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var fs = require('fs');
var path = require('path');
var relative = require('./');
var cwd = process.cwd();

function normalize(str) {
  return str.replace(/[\\\/]+/g, '/');
}

function rel() {
  var res = relative.apply(relative, arguments);
  return normalize(res);
}

describe('relative', function() {
  it('should throw an error on bad args:', function() {
    (function() {
      rel();
    }).should.throw('relative expects a string.');

    (function() {
      rel(null);
    }).should.throw('relative expects a string.');

    (function() {
      rel({});
    }).should.throw('relative expects a string.');

    (function() {
      rel([]);
    }).should.throw('relative expects a string.');
  });

  it('should return an empty string', function() {
    rel('').should.equal('');
  });

  it('should resolve the relative path from a file to a file', function() {
    rel('', 'dir').should.equal('dir');
    rel('a/b/c.txt', 'd').should.equal('../../d');
    rel('d', 'a/b/c.txt').should.equal('../a/b/c.txt');
    rel('a/b/c.txt', 'd/e/f.txt').should.equal('../../d/e/f.txt');
    rel('a/b/c.txt', 'a/b/g.txt').should.equal('g.txt');
  });

  it('should resolve the relative path from a file to a directory', function() {
    rel('fixtures/a.txt', 'b/').should.equal('../b/');
    rel('b/', 'fixtures/a.txt').should.equal('../fixtures/a.txt');
    rel('a/b/c.txt', 'd').should.equal('../../d');
    rel('a\\b\\c.txt', 'd').should.equal('../../d');
    rel('a\\b\\c.txt', 'a/b').should.equal('.');
  });

  it('should resolve the relative path from a directory to a directory', function() {
    rel('a', 'a').should.equal('.');
    rel('a/b', 'd').should.equal('../../d');
    rel('a/c', 'a/g').should.equal('../g');
    rel('../a/c', '../a/g').should.equal('../g');
  });

  it('should resolve the relative path from a directory to a file', function() {
    rel('a/b', 'd/c.txt').should.equal('../../d/c.txt');
    rel('a/b', 'a/c.txt').should.equal('../c.txt');
    rel('a-with-dashes', 'a-with-dashes/b/c.txt').should.equal('b/c.txt');
  });

  it('should work when the dirname has dots', function() {
    rel('fixtures/abc/', 'fixtures/abc/b/c.txt').should.equal('b/c.txt');
    rel('fixtures/a.b.c/', 'fixtures/a.b.c/b/c.txt').should.equal('b/c.txt');

    // this should be considered a filename, since the path does not end in a slash
    rel('fixtures/a.b.c', 'fixtures/a.b.c/b/c.txt').should.equal('a.b.c/b/c.txt');
  });
});

describe('stat', function() {
  it('should use fs.statSync() when `true` is passed as the last arg:', function() {
    rel('fixtures/a.b.c', 'fixtures/a.b.c/b/c.txt').should.equal('a.b.c/b/c.txt');
    rel('fixtures/a.b.c', 'fixtures/a.b.c/b/c.txt', true).should.equal('b/c.txt');

    rel('fixtures/a.b.c', 'fixtures').should.equal('.');
    rel('fixtures/a.b.c', 'fixtures', true).should.equal('..');
  });

  it('should use a `stat` object when passed as the last arg:', function() {
    var stat = fs.statSync('fixtures/a.b.c');

    rel('fixtures/a.b.c', 'fixtures/a.b.c/b/c.txt').should.equal('a.b.c/b/c.txt');
    rel('fixtures/a.b.c', 'fixtures/a.b.c/b/c.txt', stat).should.equal('b/c.txt');

    rel('fixtures/LICENSE', 'fixtures').should.equal('..');
    rel('fixtures/LICENSE', 'fixtures', stat).should.equal('..');

    rel('fixtures/a.b.c', 'fixtures').should.equal('.');
    rel('fixtures/a.b.c', 'fixtures', stat).should.equal('..');
  });
});

describe('process.cwd()', function() {
  it('should use process.cwd() when only one argument is passed', function() {
    rel('a/b/c.txt').should.equal('a/b/c.txt');
    rel(process.cwd()).should.equal('.');
    rel('../c').should.equal('../c');
    rel('./').should.equal('.');
  });

  it('should get the relative path TO process.cwd()', function() {
    rel('a/b.txt', process.cwd()).should.equal('..');
    rel('a/b/', process.cwd()).should.equal('../..');
    rel('a/b/c.txt', process.cwd()).should.equal('../..');

    // these will always be wrong unless we provide more information
    rel('a/LICENSE', process.cwd()).should.equal('../..');
    rel('a/b', process.cwd()).should.equal('../..');
  });

  it('should get the relative path FROM process.cwd()', function() {
    rel(process.cwd(), 'a/b/c.txt').should.equal('a/b/c.txt');

    rel(process.cwd(), 'a/b.txt').should.equal('a/b.txt');
    rel(process.cwd(), 'a/b/').should.equal('a/b/');
    rel(process.cwd(), 'a/b/c.txt').should.equal('a/b/c.txt');
    rel(process.cwd(), 'a/LICENSE').should.equal('a/LICENSE');
    rel(process.cwd(), 'a/b').should.equal('a/b');
  });
});

describe('.toBase()', function() {
  it('should resolve the relative path from a base path to a file', function() {
    relative.toBase('a/b', 'a/b/d/e/f.txt').should.equal('d/e/f.txt');
  });

  it('should resolve the relative path from a base path to a file', function() {
    relative.toBase('a/b/', 'a/b/d/e/f.txt').should.equal('d/e/f.txt');
  });

  it('should resolve the relative path from a base path to a file', function() {
    relative.toBase('a/b/', 'a/b/d/e').should.equal('d/e');
    relative.toBase('a/b/', 'a/b/d/e/').should.equal('d/e/');
  });

  it('should resolve the relative path from a base path to a file', function() {
    relative.toBase('a/b/', 'a/b/d/e/').should.equal('d/e/');
  });
});
