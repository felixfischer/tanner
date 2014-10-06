"use strict"

var fs = require('fs')
  , path = require('path')
  , _ = require('lodash')


var Files = function(conf){
  this.conf = conf
  this.list = find(conf)
  this.data = loadAll(this.list)


  function find(conf){
    var files = fs.readdirSync(conf.path)
    files = _.filter(files, function(filename){
      var ext = filename.slice(filename.lastIndexOf('.'))
      return ext === conf.ext
    })
    files = _.map(files, function(filename){
      return path.resolve(path.join(conf.path, filename))
    })
    if (files.length === 0) throw "no files found in " + conf.path
    return files
  }


  function load(file){
    return {
      'desc': path.basename(file, path.extname(file)),
      'path': path.resolve(file),
      'size': fs.statSync(file).size,
      'stat': fs.statSync(file),
      'content': fs.readFileSync(file).toString(),
    }
  }


  function loadAll(list){
    var files = []
    list.forEach(function(path, i, arr){
      files.push(load(path))
    })
    return files
  }


}


module.exports = Files
