'use strict';


module.exports = function (expr) {
  var m = expr.match(/^([^.]+)\.([^=]*[^-+=])([-+]?)=(.*)$/);

  var style = m[1];
  var property = m[2];
  var modifier = m[3];
  var value = m[4];

  if (!modifier) {
    return function (restyler) {
      restyler.set(style, property, value);
    };
  }
  else {
    value = Number(value);
    return function (restyler) {
      var oldValue = +restyler.get(style, property);
      var newValue = (modifier == '+') ? oldValue + value : oldValue - value;
      return restyler.set(style, property, newValue);
    };
  }
};
