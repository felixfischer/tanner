/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict";

var _ = require('lodash')


/**
 * parse a single expression
 * @param {String} args - command line args
 * @return {Object} keys: type (obligatory), subtypes, classes (optional)
 */
function parse(args) {
  var beginSubtypes = args.indexOf('.')
  var beginClasses = args.indexOf('-')
  var options = {}
  if (beginClasses > 0) {
    options.classes = args.slice(beginClasses+1).split('|')
    args = args.slice(0, beginClasses)
  }
  if (beginSubtypes > 0) {
    options.subtypes = args.slice(beginSubtypes+1).split('|')
    args = args.slice(0, beginSubtypes)
  }
  options.type = args
  return options
}


function items(line){
  return line.match(/<[^>]*>/g); // ["<foo>", "<bar>"]
}

exports.parse = parse
exports.items = items

