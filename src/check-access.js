'use strict';

var StyleAccessError = require('make-error')('StyleAccessError');

var util = require('util');


module.exports = function (styles, style, attribute) {
  if (!styles[style]) {
    throw new StyleAccessError(util.format('Style not found: %s', style));
  }

  if (styles[style][attribute] == null) {
    throw new StyleAccessError(util.format('Attribute not found: %s:%s', style, attribute));
  }
};
