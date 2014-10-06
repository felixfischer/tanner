"use strict"

var fs  = require('fs')
  , _ = require('lodash')


var Dict = function(fileblob){
  this.entries = []
  this.tags = []
  this.classes = []


  function main(dict){
    dict.lines = fileblob.split("\n")
    dict.lines.forEach(analyze, dict)
  }


  function newEntry(dict){
    if (_.contains(Object.keys(dict.currentry), 'values')) {
      dict.currentry.token = dict.currentry.values.split(', ')
      if (dict.subtypes){
        // throw error if number of values doesn't match number of subtypes
        if (dict.currentry.token.length !== dict.subtypes.length)
          throw JSON.stringify(dict.currentry)
        dict.currentry.token.forEach(function(value, i, arr){
          dict.currentry['token:' + dict.subtypes[i]] = value
        })
        dict.currentry.values = _.zipObject(dict.subtypes, dict.currentry.token)
        delete dict.currentry.token
      }
      else {
        dict.currentry.token = dict.currentry.token.join()
      }
      if (dict.currentry.classes){
        dict.classes = _.union(dict.classes, dict.currentry.classes)
        // put classes at the end
        var classes = dict.currentry.classes.slice()
        delete dict.currentry.classes
        dict.currentry.classes = classes
      }
      dict.currentry.tags = dict.tags.slice()
      // push existing entry
      dict.entries.push(dict.currentry)
      // reset
      delete dict.currentry
    }
  }


  function remTag(tag, dict){
    var pos = dict.tags.indexOf(tag)
    if (pos > -1) dict.tags.splice(pos, 1)
  }


  function analyze(str, index, arr){
    this.currentry = this.currentry || {}
    var line = new Line(str)
    if (line.key) {
      if (line.val) {
        // key and val
        if      (line.key === 'name')
          this.name = line.val
        else if (line.key === 'subtypes')
          this.subtypes = line.val.split(' ')
        else if (line.key === 'values'){
          this.currentry.values = line.val
          //this.currentry.token = line.val.split(', ')
        }
        else if (line.key === 'classes')
          this.currentry.classes = line.val.split(', ')
      }
      else {
        // just a key, no val
        if      (line.key === 'entry')
          newEntry(this)
        else if (line.key === 'classes')
          { /* ignore empty classes */ }
        else if (line.key.slice(0,3) === 'end')
          // remove start tag for end tag
          remTag(line.key.slice(3), this)
        else if (this.tags.indexOf(line.key) < 0)
          // save as tag if unknown and not yet a tag
          this.tags.push(line.key)
      }
    }
    if (index === arr.length-1) {
      // last line -- save last entry
      newEntry(this)
      if (this.tags.length > 0){
        var dictTags = this.tags
        this.entries.forEach(function(entry, i, arr){
          entry.tags = _.difference(entry.tags, dictTags)
          if (entry.tags.length === 0) delete entry.tags
        })
      }
      this.count = this.entries.length
    }
  }


  main(this)


}


var Line = function(str){
  this.hashPos = str.indexOf('#')
  if (this.hashPos > -1) {
    str = str.slice(this.hashPos+1)
    var items = str.split(' ')
    this.key = items.shift().trim()
    items = items.join(' ').trim()
    if (items.length > 0) {
      this.val = items
    }
  }
}


Dict.prototype.stats = function(dict){
  var dict = dict || this
  return {
    'name': dict.name,
    'desc': dict.desc,
    'subtypes': dict.subtypes || [],
    'entries': dict.entries.length,
    'lines': dict.lines.length-1,
    'lpe': (dict.lines.length/dict.entries.length).toFixed(1),
  }
}


module.exports = Dict
