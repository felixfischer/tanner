/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var _ = require('lodash')


function randItem(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}


function matches(entry, filter, all){
  var retVal = true
  Object.keys(filter).forEach(function(key){
    var intersect = _.intersection(filter[key], entry[key])
    if (all) {
      var fullinter = intersect.length === filter[key].length
      if (!fullinter) retVal = false
    } else {
      var someinter = intersect.length > 0
      if (!someinter) retVal = false
    }
  })
  return retVal
}


function find(vocab, options){
  var dict = vocab.dicts[options.type]
  delete options.type
  return findInDict(dict, options)
}


function findOne(vocab, options){
  var resAll = find(vocab, options)
  return randItem(resAll)
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


function getReadableNumber(num) {
  var i = -1
  var units = ['k', 'm', 'bn',
                  ' trillion (10e12)',
                  ' quadrillion (10e15)',
                  ' quintillion (10e18)',
                  ' sextillion (10e21)',
                  ' septillion (10e24)']
  do { num = num/1000; i++ } while (num > 1000)
  return Math.max(num, 0.1).toFixed(1) + units[i]
};

exports.find = find
exports.findOne = findOne
exports.findInDict = findInDict
exports.matches = matches
exports.pick = pick
exports.getReadableNumber = getReadableNumber
