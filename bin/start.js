var path = require('path')
var fs = require('fs')

require('babel-core/register')({
  presets: ['es2015-node5', 'stage-0']
})

require('../src/server')
