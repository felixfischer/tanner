/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var Files = require('./Files')
  , Dict = require('./Dict')


var Vocab = function(conf){
  if (Vocab.prototype._singletonInstance)
    return Vocab.prototype._singletonInstance
  Vocab.prototype._singletonInstance = this
  this.files = new Files(conf)
  this.init()
}


Vocab.prototype.init = function(){
  var dicts = {}
  var stats = {}
  this.files.data.forEach(function(file){
    var dict = new Dict(file.content)
    dict.desc = file.desc
    dict.path = file.path
    dicts[dict.name] = dict
    stats[dict.name] = dict.stats
  })
  this.dicts = dicts
  this.stats = stats
}


module.exports = Vocab
