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

  console.log(Math.PI_2);

  var Waves = function (_Renderer) {
    _inherits(Waves, _Renderer);

    function Waves(ctx) {
      _classCallCheck(this, Waves);

      var _this = _possibleConstructorReturn(this, (Waves.__proto__ || Object.getPrototypeOf(Waves)).call(this, ctx));

      _this.freq = 2;
      _this.phase = 0;
      _this.points = [];
      _this.amplitude = 0.25;
      _this.animating = true;
      _this.bg = '#222';
      _this.waveform = 'Triangle';
      _this.prev = _this.waveform;
      return _this;
    }

    _createClass(Waves, [{
      key: 'step',
      value: function step() {
        if (this.prev != this.waveform) this.phase = 0;
        this.prev = this.waveform;
        this.points = [];
        var half_w = this.width * 0.5;
        var half_h = this.height * 0.5;
        var sample_rate = this.width;
        for (var i = 0; i < sample_rate; i++) {
          var y = 0;
          var x = i * this.freq / sample_rate % 1.0;
          switch (this.waveform) {
            case 'Sine':
              y = Math.sin(Math.TWO_PI * x + this.phase * Math.TWO_PI);
              break;
            case 'Triangle':
              var n = x + this.phase;
              n %= 1.0;
              if (n < 0.5) {
                y = n * 4.0 - 1.0;
              } else {
                y = 3.0 - n * 4.0;
              }
              break;
            case 'Square':
              var n = x + this.phase;
              n %= 1.0;
              y = n < 0.5 ? 1.0 : -1.0;
              break;
          }

          this.points.push([i / sample_rate * this.width, half_h + y * this.amplitude * half_h]);
        }

        if (this.animating) {
          this.phase += 0.01;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        this.color('#333');
        this.grid(0, 0, this.height / 10, this.width / 10, this.width, this.height);
        this.color('#eee');
        this.shape(this.points, false, false);
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.phase = 0;
      }
    }]);

    return Waves;
  }(_pixelspace.Renderer);

  module.exports = Waves;
});