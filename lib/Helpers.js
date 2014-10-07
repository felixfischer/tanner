/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var util = require('util')

var Helpers = function(config) {
  this.config = config
}

Helpers.prototype.log = function(type, msg){
  msg = msg || type
  console.log(util.inspect(msg, this.config.util.inspect))
}

module.exports = Helpers
