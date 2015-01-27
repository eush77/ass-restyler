'use strict';

var test = require('tape')
  , concat = require('concat-stream');

var spawn = require('child_process').spawn
  , fs = require('fs');


var clauses = [
  'DefaultVCD:Fontname=Comic Sans',
  'Default:Fontname=Comic Sans',
  'Overlap:Fontname=Comic Sans',
  'credits:Fontname=Comic Sans',
  'Default:SecondaryColour=&H00FF00FF',
  'DefaultVCD:Bold+=3',
  'Overlap:Shadow+=0.5',
  'credits:BorderStyle*=2'
];


test('ass-restyler', function (t) {
  var after, output;
  var left = 2;

  var nodei = spawn('../cli.js', clauses, {
    cwd: __dirname
  });

  fs.createReadStream(__dirname + '/before.ass').pipe(nodei.stdin);
  nodei.stdout.pipe(concat({ encoding: 'string' }, function (stdout) {
    output = stdout;
    next();
  }));

  fs.readFile(__dirname + '/after.ass', { encoding: 'utf8' }, function (err, data) {
    t.error(err, 'reading after.ass');
    after = data;
    next();
  });

  function next() {
    if (!--left) {
      done();
    }
  }

  function done() {
    t.equal(output, after);
    t.end();
  }
});
