/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

/** @module Tanner */

"use strict";

var Vocab = require('./Vocab')
  , Engine = require('./Engine')


/**
 * Tanner's main interface
 * @constructor
 */
function Tanner(conf){
  this.config = conf || require('../config')
  this.vocab = new Vocab(this.config.vocab)
  this.engine = new Engine(this.vocab)
}


module.exports = new Tanner()
