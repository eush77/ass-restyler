#!/usr/bin/env node
'use strict';

var Clause = require('./lib/clause');

var parse = require('ass-parser'),
    Styles = require('ass-styles'),
    stringify = require('ass-stringify'),
    die = require('or-die'),
    readFileStdin = require('read-file-stdin'),
    App = require('help-version');

var fs = require('fs');


var app = App(fs.readFileSync(__dirname + '/usage.txt', 'utf8'));

(function main (argv) {
  var exprs = [];
  var filenames = [];
  var inplace = false;

  // Parse arguments.
  argv.forEach(function (arg) {
    if (arg == '-i') {
      inplace = true;
    } else if (arg.indexOf(':') >= 0 && arg[0] != '/') {
      exprs.push(arg);
    } else {
      filenames.push(arg);
    }
  });

  if (filenames.length > 1 && !inplace) {
    die("Error: Multiple filenames are only allowed in in-place mode");
  }

  if (!inplace && !filenames.length) {
    filenames.push(null);
  }

  filenames.forEach(function (filename) {
    transform(filename, inplace, exprs);
  });
}(process.argv.slice(2)));


function transform (filename, inplace, exprs) {
  readFileStdin(filename, function (err, buffer) {
    if (err) return die(err.toString());

    var sub = buffer.toString();

    try {
      var ass = parse(sub, { comments: true });
      var styles = Styles(ass);

      exprs.forEach(function (expr) {
        Clause(expr)(styles);
      });

      var str = stringify(ass);

      if (inplace) {
        fs.writeFileSync(filename, str, { encoding: 'utf8' });
      } else {
        process.stdout.write(str);
      }
    }
    catch (err) {
      die(err.toString());
    }
  })
}
