'use strict';

var checkAccess = require('./check-access');


module.exports = function (expr) {
  var m = expr.match(/^([^:]+):([^=]*[^-+=])([-+]?)=(.*)$/);

  var style = m[1];
  var attribute = m[2];
  var modifier = m[3];
  var value = m[4];

  if (!modifier) {
    return function (styles) {
      checkAccess(styles, style, attribute);
      styles[style][attribute] = value;
    };
  }
  else {
    value = Number(value);
    return function (styles) {
      checkAccess(styles, style, attribute);
      var oldValue = +styles[style][attribute];
      var newValue = (modifier == '+') ? oldValue + value : oldValue - value;
      styles[style][attribute] = newValue;
    };
  }
};
