'use strict'

const partialRight = require('ap').partialRight
const yaml = require('js-yaml')

const formatters = {
  json: partialRight(JSON.stringify, null, 2),
  yml: yaml.safeDump
}

module.exports = format

function format (content, extension) {
  const toString = formatters[extension.replace(/^\./, '')] || String
  return toString(content).trim()
}
