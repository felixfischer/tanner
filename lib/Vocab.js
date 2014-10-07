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
    var dict = new Dict(file)
    dict.desc = file.desc
    dict.path = file.path
    dicts[dict.name] = dict
    stats[dict.name] = dict.stats
  })
  this.dicts = dicts
  this.stats = stats
}


Vocab.prototype.combi = function(){
  var types = Object.keys(this.dicts)
  var res = {}
  types.forEach(function(key, i, arr){
    var type = this.dicts[key]
    res[key] = {}
    if (type.subtypes && type.subtypes.length > 0)
      res[key].subtypes = type.subtypes
    if (type.classes && type.classes.length > 0)
      res[key].classes = type.classes
  }, this)
  return res
}

Vocab.prototype.combiList = function(){
  var res = []
  var combis = this.combi()
  Object.keys(combis).forEach(function(key, i, arr){
    var type = combis[key]
    if (type.subtypes) {
      type.subtypes.forEach(function(subtype){
        if (type.classes) {
          type.classes.forEach(function(clas){
            var typeSubtypeClass = key + '.' + subtype + '-' + clas
            res.push(typeSubtypeClass)
          })
        }
        else {
          var typeSubtype = key + '.' + subtype
          res.push(typeSubtype)
        }
      })
    }
    else {
      if (type.classes) {
        type.classes.forEach(function(clas){
          var typeClass = key + '-' + clas
          res.push(typeClass)
        })
      }
      else {
        var typeOnly = key
        res.push(typeOnly)
      }
    }
  })
  return res
}
module.exports = Vocab
