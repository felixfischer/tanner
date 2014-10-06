"use strict"

var Vocab = require('./Vocab')
  , Filter = require('./Filter')


var Tanner = function(conf){
  this.config = conf || require('../config')
  this.vocab = new Vocab(this.config.vocab)
  this.filter = require('./Filter')
}


module.exports = new Tanner()
