/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var _ = require('lodash')

function Generator(){}

Generator.prototype.insert = function(input, searchItems, results) {
  searchItems.forEach(function(item, i){
    input = input.replace(item, results[i])
  })
  return input
}

module.exports = new Generator
