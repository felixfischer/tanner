"use strict"

console.log(__dirname)
var findit = require('findit')
  , fs = require('fs')
  , path = require('path')
  , _ = require('lodash')


function find(conf, callback){
  var finder = findit(conf.path)
  console.log(path.resolve(conf.path))
  var list = []
  finder.on('directory', function(dir, stat, stop){
    var base = path.basename(dir);
    if (base === '.git' || base === 'node_modules') stop()
    else console.log(dir + '/')
  })
  finder.on('file', function(file, stat){
    console.log(path.resolve(conf.path))
    if (path.extname(file) === conf.ext){
      list.push(file)
    }
  })
  finder.on('end', function(){
    console.log(list)
    //callback(list)
  })
  finder.on('error', function(error){
    throw error
    console.log(error)
  })
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


exports.find = find
exports.load = load
exports.loadAll = loadAll
