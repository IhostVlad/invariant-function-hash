'use strict'

var invariantFunctionHash = require('../index')
var fs = require('fs')
var expectedHash =
  '6406a5662fd0b80eed58457fc7a6de06cd18e7a48a3ad244ba339c4aaa552de2' +
  '364f3e27ed2621f6217dc5da7747ff17fdaa72725cf573a8a64a1eb2d94eb45c'

var MOCK_SOURCE_KEY = '@@MOCK_SOURCE_KEY'
let originalFunctionToString = Function.prototype.toString
Function.prototype.toString = function functionToStringMock() {
  var source = originalFunctionToString.call(this)
  if (Object.prototype.hasOwnProperty.call(this, MOCK_SOURCE_KEY)) {
    return this[MOCK_SOURCE_KEY]
  } else {
    return source
  }
}

var makeSourceCodeFunction = function(sourceCode) {
  var func = function() {}
  Object.defineProperty(func, MOCK_SOURCE_KEY, {
    value: sourceCode
  })
  return func
}

var gaugeCode = fs.readFileSync('./test/gauge-code.js').toString()
var gaugeFunction = makeSourceCodeFunction(gaugeCode)

var hash = invariantFunctionHash(gaugeFunction)

if (hash === expectedHash) {
  console.log('Test passed')
} else {
  console.log('Test failed')
}
