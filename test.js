/**
 * relative <https://github.com/jonschlinkert/relative>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var path = require('path');
var relative = require('./');
var cwd = process.cwd();

function normalize(str) {
  return str.replace(/[\\\/]+/g, '/');
}

describe('relative', function() {
  it('should resolve the relative path from a file to a file', function() {
    normalize(relative('test/fixtures/foo.txt', 'docs/new/file.txt')).should.equal('../../docs/new/file.txt');
    normalize(relative('test/fixtures/foo.txt', 'test/fixtures/bar.txt')).should.equal('./bar.txt');
  });

  it('should resolve the relative path from a file to a directory', function() {
    normalize(relative('test\\fixtures\\foo.txt', 'docs')).should.equal('../../docs');
    normalize(relative('test\\fixtures\\foo.txt', 'test/fixtures')).should.equal('./');
  });

  it('should resolve the relative path from a directory to a directory', function() {
    normalize(relative('test/fixtures', 'docs')).should.equal('../../docs');
    normalize(relative('test/foo', 'test/bar')).should.equal('../bar');
  });

  it('should resolve the relative path from a directory to a file', function() {
    normalize(relative('test/fixtures', 'docs/foo.txt')).should.equal('../../docs/foo.txt');
    normalize(relative('test/fixtures', 'test/foo.txt')).should.equal('../foo.txt');
  });

  it('should resolve the relative path to process.cwd()', function() {
    normalize(relative('test/fixtures/foo.txt', process.cwd())).should.equal('../..');
  });

  it('should resolve the relative path from process.cwd()', function() {
    normalize(relative(process.cwd(), 'test/fixtures/foo.txt')).should.equal('./test/fixtures/foo.txt');
  });
});


describe('normalize path', function() {
  it('should resolve the relative path from a file to a file', function() {
    var actual = relative('test/fixtures/foo.txt', 'docs/new/file.txt')
    normalize(actual).should.equal('../../docs/new/file.txt');
  });

  it('should resolve the relative path from a file to a directory', function() {
    var actual = relative('test/fixtures/foo.txt', 'docs')
    normalize(actual).should.equal('../../docs');
  });

  it('should resolve the relative path from a directory to a directory', function() {
    var actual = relative('test/fixtures', 'docs')
    normalize(actual).should.equal('../../docs');
  });

  it('should resolve the relative path from a directory to a file', function() {
    var actual = relative('test/fixtures', 'docs/foo.txt')
    normalize(actual).should.equal('../../docs/foo.txt');
  });

  it('should resolve the relative path to process.cwd()', function() {
    var actual = relative('test/fixtures/foo.txt', process.cwd())
    normalize(actual).should.equal('../..');
  });

  it('should resolve the relative path from process.cwd()', function() {
    var actual = relative(process.cwd(), 'test/fixtures/foo.txt')
    console.log(actual)
    normalize(actual).should.equal('./test/fixtures/foo.txt');
  });
});


describe('relative.toBase', function() {
  it('should resolve the relative path from a base path to a file', function() {
    normalize(relative.toBase('test/fixtures', 'test/fixtures/docs/new/file.txt')).should.equal('docs/new/file.txt');
  });

  it('should resolve the relative path from a base path to a file', function() {
    normalize(relative.toBase('test/fixtures/', 'test/fixtures/docs/new/file.txt')).should.equal('docs/new/file.txt');
  });

  it('should resolve the relative path from a base path to a file', function() {
    normalize(relative.toBase('test/fixtures/', 'test/fixtures/docs/new')).should.equal('docs/new');
  });

  it('should resolve the relative path from a base path to a file', function() {
    normalize(relative.toBase('test/fixtures/', 'test/fixtures/docs/new/')).should.equal('docs/new');
  });
});
