'use strict';

module.exports = function (effectHandler) {
  return function (store) {
    return function (next) {
      return function (action) {
        effectHandler(store, action);
        next(action);
      };
    };
  };
};

module.exports.createEffectHandler = module.exports;