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
  var hasSubtype = args.indexOf('.')
  var hasClass = args.indexOf('-')
  var options = {}
  if (hasSubtype === -1 && hasClass === -1) {
    // just a type (no subtype or class)
    options.type = args
  }
  else if (hasSubtype > 0 && hasClass === -1) {
    // type and subtype
    options.type = args.slice(0, hasSubtype)
    options.subtypes = args.slice(hasSubtype+1)
  }
  else if (hasSubtype === -1 && hasClass > 0){
    // type and class
    options.type = args.slice(0, hasClass)
    options.classes = args.slice(hasClass+1)
  }
  else if (hasSubtype > 0 && hasClass > 0){
    // type, subtype and class
    options.type = args.slice(0, hasSubtype)
    options.subtypes = args.slice(hasSubtype+1, hasClass)
    options.classes = args.slice(hasClass+1)
  }
  else {
    throw new Error('could not parse: ' + args)
  }
  return options
}


function items(line){
  return line.match(/<[^>]*>/g); // ["<foo>", "<bar>"]
}

exports.parse = parse
exports.items = items

