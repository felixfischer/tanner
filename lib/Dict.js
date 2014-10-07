/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var _ = require('lodash')

function DictParser(fileblob){

  this.lines = fileblob.split("\n")
  this.currentry = {}
  this.dict = {
    entries: [],
    classes: [],
    tags: []
  }

  return this.parseDict()
}

DictParser.prototype.parseDict = function(){
  this.lines.forEach(
    function(line, i, arr){this.parseLine(line, i, arr)}
  , this
  )
  this.dict.stats = this.dictStats(this)
  return this.dict
}


DictParser.prototype.parseLine = function(str, index, arr){
  this.currentry = this.currentry || {}
  var line = this.segmentLine(str)

  if (line.key) {
    //
    //  this seems to be a valid line, with a `key`, marked by a hash sign
    //
    if (line.val) {
      //
      //  we have both `key` and `val` in this line
      //
      //  cases:
      //  1. `key`=== `name`:           set dict.name to `val`
      //  2. `key === `subtypes`:       set dict.subtypes to `val`'s
      //  3. `key === `values`:         set current entry values to `val`
      //  4. `key === `classes`:        set current entry classes to `val`'s
      //  5. `key === `weight`:         set current entry weight to `val`
      //  6. any other `key`:           that's unexpected! throw an error
      //
      if      (line.key === 'name')     this.dict.name = line.val
      else if (line.key === 'subtypes') this.dict.subtypes = line.val.split(' ')
      else if (line.key === 'values')   this.currentry.values = line.val
      else if (line.key === 'classes')  this.currentry.classes = line.val.split(', ')
      else if (line.key === 'weight')   this.currentry.weight = line.val
      else throw "unexpected key @ " + JSON.stringify(line)
    }
    else {
      //
      //  just a `key` (no `val`)
      //
      //  cases:
      //  1. `key` === `entry`:                 start a new entry
      //  2. `key` === `classes`:               ignore line (cause it's empty)
      //  3. `key` starts with `end`:           remove matching start tag
      //  4. any other `key` (default case):    treat as tag and add to stack
      //
      if      (line.key === 'entry')            this.newEntry()
      else if (line.key === 'classes')          {}
      else if (line.key.slice(0,3) === 'end')   this.remDictTag(line.key.slice(3), this.dict)
      else if (this.dict.tags.indexOf(line.key) < 0) this.dict.tags.push(line.key)
    }
  }
  else {
    //
    //  a line without a hash sign and hence without a `key` is simply ignored
    //
  }

  if (index === arr.length-1) {
    //
    //  we have reached the last line in this dict file, so let's
    //    - save the current entry
    //    - remove dict global tags from every single entry
    //
    this.newEntry()
    this.remGlobalTagsFromEntries(this.dict)
  }
}


DictParser.prototype.segmentLine = function(str){
  var res = {}
  var hashPos = str.indexOf('#')
  if (hashPos > -1) {
    str = str.slice(hashPos+1)
    var items = str.split(' ')
    res.key = items.shift().trim()
    items = items.join(' ').trim()
    if (items.length > 0) {
      res.val = items
    }
  }
  return res
}


DictParser.prototype.newEntry = function(){
  if (_.contains(Object.keys(this.currentry), 'values')) {
    this.currentry.token = this.currentry.values.split(', ')
    if (this.dict.subtypes){
      // throw error if number of values doesn't match number of subtypes
      if (this.currentry.token.length !== this.dict.subtypes.length)
        throw JSON.stringify(this.currentry)
      this.currentry.token.forEach(function(value, i){
        this.currentry['token:' + this.dict.subtypes[i]] = value
      }, this)
      this.currentry.values = _.zipObject(this.dict.subtypes, this.currentry.token)
      delete this.currentry.token
    }
    else {
      this.currentry.token = this.currentry.token.join()
    }
    if (this.currentry.classes){
      this.dict.classes = _.union(this.dict.classes, this.currentry.classes)
      // put classes at the end
      var classes = this.currentry.classes.slice()
      delete this.currentry.classes
      this.currentry.classes = this.classes
    }
    this.currentry.tags = this.dict.tags.slice()
    // push existing entry
    this.dict.entries.push(this.currentry)
    // reset
    this.currentry = {}
  }
}


DictParser.prototype.remDictTag = function(tag, dict){
  var pos = dict.tags.indexOf(tag)
  if (pos > -1) dict.tags.splice(pos, 1)
}


DictParser.prototype.remGlobalTagsFromEntries = function(dict){
  if (dict.tags.length > 0){
    var dictTags = dict.tags
    dict.entries.forEach(function(entry){
      entry.tags = _.difference(entry.tags, dictTags)
      if (entry.tags.length === 0) delete entry.tags
    })
  }
}

DictParser.prototype.dictStats = function(parser){
  return {
    'name': parser.dict.name,
    'desc': parser.dict.desc,
    'subtypes': parser.dict.subtypes || [],
    'entries': parser.dict.entries.length,
    'lines': parser.lines.length-1,
    'lpe': (parser.lines.length/parser.dict.entries.length).toFixed(1),
  }
}

module.exports = DictParser


