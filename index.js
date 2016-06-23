'use strict'

const map = require('map-values')
const path = require('path')
const parallel = require('run-parallel')
const unary = require('fn-unary')
const partial = require('ap').partial
const fs = require('fs')
const extend = require('xtend')
const format = require('./format')

module.exports = Generator

const defaults = partial(extend, {
  cwd: process.cwd()
})

function Generator (files) {
  return function generate (data, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    options = defaults(options)

    const fileData = map(files, partial(createFile, data))
    parallel(
      map(fileData, function (content, filename) {
        return partial(fs.writeFile, path.resolve(options.cwd, filename), content + '\n')
      }),
      unary(callback)
    )
  }
}

function createFile (data, value, filename) {
  const result = typeof value === 'function'
    ? value(data)
    : Array.isArray(value)
      ? value.join('\n')
      : value
  return format(result, path.extname(filename))
}
