(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['spectrum/Renderer'], function(Renderer) {
    var SynthesisVisualization;
    return SynthesisVisualization = (function(superClass) {
      extend(SynthesisVisualization, superClass);

      function SynthesisVisualization() {
        return SynthesisVisualization.__super__.constructor.apply(this, arguments);
      }

      SynthesisVisualization.prototype.init = function() {
        var AudioContext;
        console.log(this.addListener);
        AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext != null) {
          this.audioCtx = new AudioContext();
          this.oscillator = this.audioCtx.createOscillator();
          this.gain = this.audioCtx.createGain();
          this.analyzer = this.audioCtx.createAnalyser();
          this.oscillator.connect(this.analyzer);
          this.analyzer.connect(this.gain);
          this.gain.connect(this.audioCtx.destination);
          this.freqData = new Uint8Array(this.analyzer.frequencyBinCount);
          this.stepInterval = 5;
          this.gain.gain.value = 0;
          this.oscillator.start(0);
          this.playing = false;
        }
        return this.bg = "#222222";
      };

      SynthesisVisualization.prototype.step = function() {
        if ((this.audioCtx != null) && this.stepCount % this.stepInterval === 0 && this.playing) {
          this.gain.gain.value = Math.clamp(Math.transpose(this.mouseY, 0, this.height, .5, 0), 0, .5);
          this.oscillator.frequency.value = Math.clamp(Math.transpose(this.mouseX, 0, this.width, 20, 2000), 20, 2000);
          return this.analyzer.getByteFrequencyData(this.freqData);
        }
      };

      SynthesisVisualization.prototype.render = function() {
        var i, ref, results, value, x;
        this.color("#dddddd");
        if (this.audioCtx != null) {
          this.text(10, 20, "x: frequency " + Math.roundTo(this.oscillator.frequency.value, 2));
          this.text(10, 35, "y: amplitude " + Math.roundTo(this.gain.gain.value, 2));
          this.text(10, 50, "Click anywhere to toggle playback");
          if (this.playing) {
            results = [];
            for (x = i = 0, ref = this.freqData.length * .5; 0 <= ref ? i <= ref : i >= ref; x = 0 <= ref ? ++i : --i) {
              value = this.freqData[x] * 1.55555;
              results.push(this.rectangle(x * 10, this.height - value, 3, value));
            }
            return results;
          }
        } else {
          this.color("#ff0000");
          return this.text(20, 20, "AudioContext not available in this browser");
        }
      };

      SynthesisVisualization.prototype.onMouseDown = function(x, y) {
        if (this.playing) {
          this.gain.gain.value = 0;
        } else {
          this.gain.gain.value = .5;
        }
        return this.playing = !this.playing;
      };

      return SynthesisVisualization;

    })(Renderer);
  });

}).call(this);
