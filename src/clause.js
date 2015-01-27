'use strict';

var checkAccess = require('./check-access');


module.exports = function (expr) {
  var m = expr.match(/^([^:]+):([^=]*[^-+*=])([-+*]?)=(.*)$/);

  if (!m) {
    throw Error('Wrong clause format: ' + expr);
  }

  var style = m[1];
  var attribute = m[2];
  var modifier = m[3];
  var value = m[4];

  var transform = {
    '+': function (oldValue, delta) {
      return Number(oldValue) + Number(delta);
    },
    '-': function (oldValue, delta) {
      return oldValue - delta;
    },
    '*': function (oldValue, delta) {
      return oldValue * delta;
    }
  };

  if (!modifier) {
    return function (styles) {
      checkAccess(styles, style, attribute);
      styles[style][attribute] = value;
    };
  }
  else {
    return function (styles) {
      checkAccess(styles, style, attribute);
      var oldValue = styles[style][attribute];
      styles[style][attribute] = transform[modifier](oldValue, value);
    };
  }
};
