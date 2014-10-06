"use strict"

var fs = require('fs')
  , path = require('path')
  , _ = require('lodash')


var Files = function(conf){
  this.conf = conf
  this.list = find(conf)
  this.data = loadAll(this.list)


  function find(conf, list){
    var files = fs.readdirSync(conf.path)
    list = list || []
    files.forEach(function(file){
      var curPath = path.join(conf.path, '/', file)
      if (fs.statSync(curPath).isDirectory()) {
        conf.path = curPath
        list = find(conf, list)
      }
      else {
        if (path.extname(file) === conf.ext)
          list.push(path.resolve(path.join(conf.path, file)))
      }
    })
    return list
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
