/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var _ = require('lodash')
  , chalk = require('chalk')

require('console.table')


var CLI = function(tanner){
  this.tanner = tanner
  this.vocab = tanner.vocab
}


CLI.prototype.index = function(vocab){
  vocab = vocab || this.vocab
  var total = { entries: 0, dicts: 0 }
  var out = []
  Object.keys(vocab.dicts).forEach(function(key){
    var dict = vocab.dicts[key]
    total.entries += dict.entries.length
    total.dicts += 1
    out.push({
      'Count': dict.entries.length,
      'Dictionary': dict.desc,
      'Id': dict.name,
      'Subtypes': dict.subtypes
    })
  })
  //table.total('Count')
  out.push({ 'Count': '-----', 'Dictionary': '', 'Id': '', 'Subtypes': '' })
  out.push({
    'Count': total.entries,
    'Dictionary': 'Total',
    'Id': '',
    'Subtypes': ''
  })
  console.log()
  console.table('Vocabulary Index', out)
}


CLI.prototype.classes = function(vocab){
  vocab = vocab || this.vocab
  var noClasses = []
  Object.keys(vocab.dicts).forEach(function(key){
    var dict = vocab.dicts[key]
    if (dict.classes.length > 0) {
      console.log(chalk.green(dict.desc), dict.classes.join(', '))
    }
    else {
      noClasses.push(dict.desc)
    }
  })
  if (noClasses.length > 0) {
    console.log()
    console.log(chalk.red("unclassed"), noClasses.join(', '))
  }
}


CLI.prototype.stats = function(vocab){
  vocab = vocab || this.vocab
  console.table('Stats', _.toArray(vocab.stats))
}


CLI.prototype.list = function(vocab){
  vocab = vocab || this.vocab
  Object.keys(vocab.dicts).forEach(function(key){
    var dict = vocab.dicts[key]
    dict.entries.forEach(function(entry){
      delete entry.values
    })
    var heading = dict.desc + ' (' + dict.name + ')'
    console.table(heading, dict.entries)
  })
}


CLI.prototype.find = function(args){
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
  var res = this.tanner.filter.find(this.tanner.vocab, options)
  console.log(res)
}


module.exports = CLI
