"use strict"

if (require.main === module){
  //console.log('called directly')
  require('./lib/CLI')
}

else {
  //console.log('required as a module')
  module.exports = require('./lib')
}
