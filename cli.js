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
  var input = inputFileArg(argv);

  readFileStdin(input, function (err, buffer) {
    if (err) return die(err.toString());

    var sub = buffer.toString();

    try {
      var ass = parse(sub, { comments: true });
      var styles = Styles(ass);

      argv.forEach(function (expr) {
        Clause(expr)(styles);
      });

      process.stdout.write(stringify(ass));
    }
    catch (err) {
      die(err.toString());
    }
  });
}(process.argv.slice(2)));


// Searches for the argument that does not contain `:`.
// Returns the argument (if found) or `null`.
// If such an argument is not unique, return `null`.
// Returned argument is stripped from array.
function inputFileArg (argv) {
  var foundIndex;
  var count = 0;

  argv.forEach(function (arg, index) {
    if (arg.indexOf(':') < 0) {
      foundIndex = foundIndex || index;
      count += 1;
    }
  });

  return (count == 1)
    ? argv.splice(foundIndex, 1)[0]
    : null;
}
