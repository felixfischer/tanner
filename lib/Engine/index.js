/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

/** @module */


/**
 * the central engine for generating text
 * @constructor
 */
function Engine(vocab){
  this.vocab = vocab
  this.interpreter = require('./Interpreter')
  this.filter = require('./Filter')
  this.generator = require('./Generator')
}


Engine.prototype.generate = function(input){
  var res = []
  var searchItems = this.interpreter.items(input)
  searchItems.forEach(function(item){
    var filter = this.interpreter.parse(item.slice(1, -1))
    var answer = this.filter.findOne(this.vocab, filter)
    res.push(answer)
  }, this)
  return this.generator.insert(input, searchItems, res)
}


Engine.prototype.calculate = function(input){
  var count = 1
  this.interpreter.items(input).forEach(function(item){
    var filter = this.interpreter.parse(item.slice(1, -1))
    var answers = this.filter.find(this.vocab, filter)
    count = count * answers.length
  }, this)
  count = this.filter.getReadableNumber(count)
  return count
}


module.exports = Engine
