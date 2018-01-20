define(['module'], function (module) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BlogApp = function BlogApp() {
    _classCallCheck(this, BlogApp);

    console.log('App()');
    console.log('App2()');
  };

  module.exports = BlogApp;
});
