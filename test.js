'use strict'

const test = require('tape')
const proxyquire = require('proxyquire')
const path = require('path')
const redent = require('redent')
const trimNewlines = require('trim-newlines')
const call = require('call-method')
const pipe = require('value-pipe')

const clean = pipe(redent, trimNewlines, call('trim'))

test(function (t) {
  t.plan(1)

  const files = []
  const Generator = proxyquire('./', {
    fs: {
      writeFile: function (file, content, callback) {
        files.push({ path: file, content: content })
        callback(null)
      }
    }
  })

  const generate = Generator({
    'package.json': function (data) {
      return {
        name: data.name,
        version: '0.0.0'
      }
    },
    '.travis.yml': function (data) {
      return {
        language: 'node_js',
        node_js: ['6']
      }
    },
    '.gitignore': [
      'node_modules'
    ],
    '.gitattributes': '* text=auto'
  })

  generate({ name: 'my-pkg' }, { cwd: path.resolve(__dirname, 'foo') }, function (err) {
    if (err) return t.end(err)
    t.deepEqual(files, [
      {
        path: path.resolve(__dirname, 'foo/package.json'),
        content: clean(`
          {
            "name": "my-pkg",
            "version": "0.0.0"
          }
        `) + '\n'
      },
      {
        path: path.resolve(__dirname, 'foo/.travis.yml'),
        content: clean(`
          language: node_js
          node_js:
            - '6'

        `) + '\n'
      },
      {
        path: path.resolve(__dirname, 'foo/.gitignore'),
        content: 'node_modules\n'
      },
      {
        path: path.resolve(__dirname, 'foo/.gitattributes'),
        content: '* text=auto\n'
      }
    ], 'outputs files to disk')
  })
})
