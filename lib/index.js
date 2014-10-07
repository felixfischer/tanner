/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict"

var Vocab = require('./Vocab')
  , Filter = require('./Filter')


var Tanner = function(conf){
  this.config = conf || require('../config')
  this.vocab = new Vocab(this.config.vocab)
  this.filter = Filter
}


module.exports = new Tanner()
