#!/usr/bin/env node
'use strict';

var Clause = require('./src/clause');

var concat = require('concat-stream')
  , parse = require('ass-parser')
  , Restyler = require('ass-restyler')
  , stringify = require('ass-stringify');

var fs = require('fs');


var argv = process.argv.slice(2);


var usage = function () {
  fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
};


var main = function () {
  process.stdin.pipe(concat({ encoding: 'string' }, function (sub) {
    var restyler = Restyler(parse(sub, { comments: true }));

    argv.forEach(function (expr) {
      Clause(expr)(restyler);
    });

    console.log(stringify(restyler.value));
  }));
};


(argv.length == 1 && argv == '--help') ? usage() : main();
