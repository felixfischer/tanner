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


CLI.prototype.overview = function(vocab){
  vocab = vocab || this.vocab
  Object.keys(vocab.dicts).forEach(function(key){
    var dict = vocab.dicts[key]
    console.log(chalk.red(dict.name), dict.desc)
    if (dict.subtypes) console.log(chalk.green(dict.subtypes.join(', ')))
    if (dict.classes.length) console.log(chalk.yellow(dict.classes.join(', ')))
    console.log()
  })
}


CLI.prototype.classes = function(vocab){
  vocab = vocab || this.vocab
  var noClasses = []
  Object.keys(vocab.dicts).forEach(function(key){
    var dict = vocab.dicts[key]
    if (dict.classes.length > 0) {
      console.log(
        chalk.green(dict.desc + ' (' + dict.name +'):'),
        dict.classes.join(', ')
      )
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


CLI.prototype.combi = function(){
  console.table(this.vocab.combiList())
}


CLI.prototype.random = function(count){
  if (typeof count !== 'string') count = null
  count = count || 5
  var items = this.vocab.combiList()
  for (var i = 0; i < count; i++) {
    var item = items[Math.floor(Math.random()*items.length)]
    var options = this.tanner.engine.interpreter.parse(item)
    var res = this.tanner.engine.filter.find(this.tanner.vocab, options)
    console.log(chalk.green(item), res.join(', '), "\n")
  }
}


CLI.prototype.all = function(){
  var items = this.vocab.combiList()
  items.forEach(function(item){
    var options = this.tanner.engine.interpreter.parse(item)
    var res = this.tanner.engine.filter.find(this.tanner.vocab, options)
    console.log(chalk.green(item), res.join(', '), "\n")
  }, this)
}


CLI.prototype.find = function(args){
  var options = this.tanner.engine.interpreter.parse(args)
  var res = this.tanner.engine.filter.find(this.tanner.vocab, options)
  console.log(res.join('\n'))
}


CLI.prototype.findOne = function(args){
  var options = this.tanner.engine.interpreter.parse(args)
  var res = this.tanner.engine.filter.findOne(this.tanner.vocab, options)
  console.log(res)
}


CLI.prototype.generate = function(input){
  var output = this.tanner.engine.generate(input, this.tanner.vocab)
  console.log(output)
}


CLI.prototype.calculate = function(input){
  var output = this.tanner.engine.calculate(input, this.tanner.vocab)
  console.log('= ' + output + ' possible combinations')
}


module.exports = CLI
