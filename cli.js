#!/usr/bin/env node
'use strict';

var Clause = require('./lib/clause');

var concat = require('concat-stream'),
    parse = require('ass-parser'),
    Styles = require('ass-styles'),
    stringify = require('ass-stringify');

var fs = require('fs');


var argv = process.argv.slice(2);


var usage = function () {
  fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
};


var main = function () {
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
      console.error(err.toString());
      process.exit(1);
    }
  }));
};


(argv.length == 1 && argv == '--help') ? usage() : main();
