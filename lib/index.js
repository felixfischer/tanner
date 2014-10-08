/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

/** @module Tanner */

"use strict";

var Vocab = require('./Vocab')
  , Interpreter = require('./Interpreter')
  , Filter = require('./Filter')


/**
 * provides a single object as unified interface for all contained features
 * (vocab, filter)
 * @constructor
 */
function Tanner(conf){
  this.config = conf || require('../config')
  this.vocab = new Vocab(this.config.vocab)
  this.interpreter = Interpreter
  this.filter = Filter
}


module.exports = new Tanner()
