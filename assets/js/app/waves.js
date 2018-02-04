define(['module', 'lib/pixelspace'], function (module, _pixelspace) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Waves = function (_Renderer) {
    _inherits(Waves, _Renderer);

    function Waves(ctx) {
      _classCallCheck(this, Waves);

      var _this = _possibleConstructorReturn(this, (Waves.__proto__ || Object.getPrototypeOf(Waves)).call(this, ctx));

      _this.t = 0;
      _this.freq_1 = 440;
      _this.amplitude_1 = 1;
      _this.waveshape_1 = 'sqaure';
      _this.freq_2 = 880;
      return _this;
    }

    _createClass(Waves, [{
      key: 'step',
      value: function step() {
        this.t++;
      }
    }, {
      key: 'render',
      value: function render() {}
    }]);

    return Waves;
  }(_pixelspace.Renderer);

  module.exports = Waves;
});