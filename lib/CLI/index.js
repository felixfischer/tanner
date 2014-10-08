/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var program = require('commander')
  , Tanner = require('../index')
  , CLI = require('./CLI')
  , cli = new CLI(Tanner)


program
  .version(require('../../package.json').version)
  //.option('-l, --limit [num]', 'output no more than [num] results')
  //.option('-n, --nsfw', 'include content that\'s not safe for work')

program
  .command('index')
  .description('show vocabulary index')
  .action(function(){ cli.index() })

program
  .command('stats')
  .description('show statistics about dictionaries')
  .action(function(){ cli.stats() })

program
  .command('overview')
  .description('show vocabulary subtypes and classes')
  .action(function(){ cli.overview() })

program
  .command('classes')
  .description('show vocabulary classes')
  .action(function(){ cli.classes() })

program
  .command('combi')
  .description('show available combinations of type.subtype-class')
  .action(function(args){ cli.combi() })

program
  .command('list')
  .description('show full vocabulary list')
  .action(function(){ cli.list() })

program
  .command('all')
  .description('show all vocabulary items by type.subtype-class')
  .action(function(args){ cli.all() })

program
  .command('random')
  .description('find random vocabulary items')
  .action(function(args){ cli.random(args) })

program
  .command('find')
  .description('find vocabulary items')
  .action(function(args){ cli.find(args) })

program
  .command('one')
  .description('get a single vocabulary item')
  .action(function(args){ cli.findOne(args) })

program
  .command('generate')
  .description('generate sentences based on arguments')
  .action(function(args){ cli.generate(args) })

program
  .command('*')
  .description('unmatched command')
  .action(function(){ console.log('unmatched command') })

if (process.argv.length === 2) process.argv.push('--help')
program.parse(process.argv)
