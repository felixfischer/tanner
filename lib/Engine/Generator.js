/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var _ = require('lodash')

function Generator(){}

Generator.prototype.insert = function(input, results) {
  Object.keys(results).forEach(function(key){
    input = input.replace(key, results[key])
  })
  return input
}

module.exports = new Generator
