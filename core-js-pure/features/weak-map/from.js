'use strict';
require('../../modules/es.array.iterator');
require('../../modules/es.string.iterator');
require('../../modules/es.weak-map');
require('../../modules/esnext.weak-map.from');
require('../../modules/web.dom-collections.iterator');
var isCallable = require('../../internals/is-callable');
var path = require('../../internals/path');

var WeakMap = path.WeakMap;
var weakMapFrom = WeakMap.from;

module.exports = function from(source, mapFn, thisArg) {
  return weakMapFrom.call(isCallable(this) ? this : WeakMap, source, mapFn, thisArg);
};
