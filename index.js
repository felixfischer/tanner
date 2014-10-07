/*!
 * tanner
 * Copyright(c) 2014 Felix Fischer <kontakt@felixfischer.com>
 * MIT Licensed
 */

"use strict"

// provide a CLI when the script is called directly...
if (require.main === module) require('./lib/CLI')

// ...or export a module when the script is required
else module.exports = require('./lib')
