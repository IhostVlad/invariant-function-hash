var babelTransform = require('babel-core').transform
var sha512 = require('js-sha512').sha512
var uglify = require('uglifyjs-browser')

// All checks within different function sources forms based on following specification
// http://tc39.github.io/Function-prototype-toString-revision/#proposal-sec-function.prototype.tostring

function makeInvariantFuncSource(func) {
  var functionSource = Function.prototype.toString.call(func)

  if (/function \w*?\(\) { \[native code\] }/i.test(functionSource)) {
    return functionSource
  }

  var exprSource = /^((async )?function(?!\s(get|set))|class|([^{]+?=>))/i.test(
    functionSource
  )
    ? 'F=' + functionSource
    : 'O={' + functionSource.replace(/function/g, '') + '}'

  var exprTranspiled = babelTransform(exprSource, {
    presets: [require('babel-preset-env')]
  }).code

  var uglifyResult = uglify.minify(exprTranspiled)

  if (uglifyResult.code == null) {
    throw new Error('Uglify failed: ' + uglifyResult.error)
  }

  return uglifyResult.code
}

function invariantFunctionHash(func) {
  try {
    var invariant = makeInvariantFuncSource(func)
    return sha512(invariant)
  } catch (err) {
    throw new Error('Invariant failed: ' + err.stack)
  }
}

module.exports = invariantFunctionHash
