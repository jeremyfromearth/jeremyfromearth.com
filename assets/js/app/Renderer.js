define(['module'], function (module) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Renderer = function Renderer() {
    _classCallCheck(this, Renderer);

    console.log('Renderer()');
  };

  module.exports = Renderer;
});
