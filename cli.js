#!/usr/bin/env node
'use strict';

var Clause = require('./lib/clause');

var concat = require('concat-stream'),
    parse = require('ass-parser'),
    Styles = require('ass-styles'),
    stringify = require('ass-stringify'),
    die = require('or-die'),
    App = require('help-version');

var fs = require('fs');


var app = App(fs.readFileSync(__dirname + '/usage.txt', 'utf8'));

(function main (argv) {
  process.stdin.pipe(concat({ encoding: 'string' }, function (sub) {
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
  }));
}(process.argv.slice(2)));
