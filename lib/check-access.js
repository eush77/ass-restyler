'use strict';

var format = require('util').format;


module.exports = function (styles, style, attribute) {
  if (!styles[style]) {
    throw Error(format('Style not found: %s', style));
  }

  if (styles[style][attribute] == null) {
    throw Error(format('Attribute not found: %s:%s', style, attribute));
  }
};
