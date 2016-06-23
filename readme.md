# 212 [![Build Status](https://travis-ci.org/bendrucker/212.svg?branch=master)](https://travis-ci.org/bendrucker/212)

> Functional/composable boilerplate generator for scaffolding modules


## Install

```
$ npm install --save 212
```


## Usage

```js
var Boilerplate = require('212')
var boilerplate = Boilerplate({
  'package.json': function (data) {
    return {
      name: data.name,
      version: '0.0.0'
    }
  },
  '.travis.yml': function (data) {
    return {
      langugage: 'node_js',
      node_js: ['6']
    }
  }
})

boilerplate({name: 'my-great-package'}, function (err) {
  // Writes package.json, .travis.yml
})
```

## API

#### `Boilerplate(files)` -> `function`

Returns a `boilerplate` function that can be called to write the configured boilerplate output.

##### files

*Required*  
Type: `object`

An object containing key/value pairs of filenames and values. Values can either be:

* A function that returns the file's data
* An array that will be joined with newlines
* Any other plain value type

Files with `.json` or `.yml` extensions will be automatically formatted. All other values will be stringified.

#### `boilerplate(data, [options], callback` -> `undefined`

###### data

*Required*  
Type: `object`

Data to pass to file generator functions.

###### options

###### cwd

Type: `string`  
Default: `process.cwd()`

The working directory to write boilerplate files to.

##### callback

*Required*  
Type: `function`  
Arguments: `err` 


## License

MIT © [Ben Drucker](http://bendrucker.me)
