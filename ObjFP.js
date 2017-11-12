// ObjFP Library by Joey Buczek

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      module.exports = factory();
  } else {
      root.ObjFP = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // return object for chaining methods
  const returnObject = function (obj) {
    let objCopy = Object.assign({}, obj);
    let api = {
      map: function (fn) {
        return objectMap(objCopy, fn);
      },
      filter: function (fn) {
        return objectFilter(objCopy, fn);
      },
      reduce: function (fn, initVal) {
        return objectReduce(objCopy, fn, initVal);
      },
      clean: function () {
        let cleanObj = Object.assign({}, objCopy);
        delete cleanObj.map;
        delete cleanObj.filter;
        delete cleanObj.reduce;
        return cleanObj;
      }
    };
    let returnObj = Object.assign({}, objCopy, api);
    return returnObj;
  };
  
  // map method
  const objectMap = function (obj, fn) {
    let returnObj = {};
    if (arguments.length > 1) {
      Object.keys(obj).forEach(function (key, index) {
        if (typeof fn === 'function') {
          returnObj[key] = fn(obj[key], key, index, obj);
        } else {
          throw new TypeError('Function expected. Received ' + typeof fn);
        }
      });
    } else {
      throw new Error('Callback function was not provided');
    }
    return returnObject(returnObj);
  };
  
  // filter method
  const objectFilter = function (obj, fn) {
    let returnObj = {};
    if (arguments.length > 1) {
      Object.keys(obj).forEach(function (key, index) {
        if (typeof fn === 'function') {
          if (fn(obj[key], key, index, obj)) {
            returnObj[key] = obj[key];
          }
        } else {
          throw new TypeError('Function expected. Received ' + typeof fn);
        }
      });
    } else {
      throw new Error('Callback function was not provided');
    }
    return returnObject(returnObj);
  };
  
  // reduce method
  const objectReduce = function (obj, fn, initVal) {
    let returnVal = {};
    if (arguments.length > 1) {
      let keys = Object.keys(obj);
      returnVal = initVal || obj[keys.splice(0, 1)];
      keys.forEach(function (key, index) {
        if (typeof fn === 'function') {
          returnVal = fn(returnVal, obj[key], index, obj);
        } else {
          throw new TypeError('Function expected. Received ' + typeof fn);
        }
      });
    } else {
      throw new Error('Callback function was not provided');
    }
    return (typeof returnVal === 'object' && !Array.isArray(returnVal))
    ? returnObject(returnVal)
    : returnVal;
  };
  
  // return api
  const publicApi = {
    map: objectMap,
    filter: objectFilter,
    reduce: objectReduce
  };
  
  return publicApi;
}));