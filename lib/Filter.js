/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var _ = require('lodash')


function matches(entry, filter){
  var retVal = true
  Object.keys(filter).forEach(function(key){
    var intersect = _.intersection(filter[key], entry[key])
    var fullinter = intersect.length === filter[key].length
    if (!fullinter) retVal = false
  })
  return retVal
}


function find(vocab, options){
  var dict = vocab.dicts[options.type]
  delete options.type
  return findInDict(dict, options)
}


function findInDict(dict, options){
  Object.keys(options).forEach(function(key){
    if (typeof options[key] === 'string') options[key] = [options[key]]
  })
  var res = _.filter(dict.entries, function(entry){
    if (_.isPlainObject(entry.values)){
      entry.subtypes = Object.keys(entry.values)
    }
    return matches(entry, options)
  })
  return pick(res, options)
}


function pick(list, options){
  var res = []
  list.forEach(function(item){
    if (options.subtypes) {
      Object.keys(options.subtypes).forEach(function(key, i){
        var subtype = options.subtypes[i]
        res.push(item.values[subtype])
      })
    }
    else {
      res.push(item.values)
    }
  })
  return res
}


function parse(args) {
  var options = {}
  options.type = args
  if (args.indexOf('.')){
    args = args.split('.')
    options.type = args[0]
    options.subtypes = args[1]
  }
  if (args[1].indexOf('-')){
    args = args[1].split('-')
    options.subtypes = args[0]
    options.classes = args[1]
  }
  return options
}


exports.find = find
exports.findInDict = findInDict
exports.matches = matches
exports.pick = pick
exports.parse = parse
