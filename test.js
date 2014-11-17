/**
 * relative <https://github.com/jonschlinkert/relative>
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var normalize = require('normalize-path');
var path = require('path');
var cwd = process.cwd();
var relative = require('./');


describe('relative', function() {
  it('should resolve the relative path from a file to a file', function() {
    normalize(relative('test/fixtures/foo.txt', 'docs/new/file.txt')).should.equal('../../docs/new/file.txt');
  });

  it('should resolve the relative path from a file to a directory', function() {
    normalize(relative('test/fixtures/foo.txt', 'docs')).should.equal('../../docs');
  });

  it('should resolve the relative path from a directory to a directory', function() {
    normalize(relative('test/fixtures', 'docs')).should.equal('../docs');
  });

  it('should resolve the relative path from a directory to a file', function() {
    normalize(relative('test/fixtures', 'docs/foo.txt')).should.equal('../docs/foo.txt');
  });

  it('should resolve the relative path to process.cwd()', function() {
    normalize(relative('test/fixtures/foo.txt', process.cwd())).should.equal('../..');
  });

  it('should resolve the relative path from process.cwd()', function() {
    normalize(relative(process.cwd(), 'test/fixtures/foo.txt')).should.equal('test/fixtures/foo.txt');
  });
});


describe('normalize path', function() {
  it('should resolve the relative path from a file to a file', function() {
    var actual = relative('test/fixtures/foo.txt', 'docs/new/file.txt', true)
    normalize(actual).should.equal('../../docs/new/file.txt');
  });

  it('should resolve the relative path from a file to a directory', function() {
    var actual = relative('test/fixtures/foo.txt', 'docs', true)
    normalize(actual).should.equal('../../docs');
  });

  it('should resolve the relative path from a directory to a directory', function() {
    var actual = relative('test/fixtures', 'docs', true)
    normalize(actual).should.equal('../docs');
  });

  it('should resolve the relative path from a directory to a file', function() {
    var actual = relative('test/fixtures', 'docs/foo.txt', true)
    normalize(actual).should.equal('../docs/foo.txt');
  });

  it('should resolve the relative path to process.cwd()', function() {
    var actual = relative('test/fixtures/foo.txt', process.cwd(), true)
    normalize(actual).should.equal('../..');
  });

  it('should resolve the relative path from process.cwd()', function() {
    var actual = relative(process.cwd(), 'test/fixtures/foo.txt', true)
    normalize(actual).should.equal('test/fixtures/foo.txt');
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
