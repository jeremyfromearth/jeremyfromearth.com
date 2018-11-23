import {Renderer} from 'lib/pixelspace';

class Waves extends Renderer {
  constructor(ctx) {
    super(ctx);
    this.freq = 2;
    this.phase = 0;
    this.points = [];
    this.amplitude = 0.25;
    this.animating = true;
    this.bg = '#222';
    this.waveform = 'Triangle';
    this.prev = this.waveform;
  }

  step() {
    if(this.prev != this.waveform) this.phase = 0;
    this.prev = this.waveform;
    this.points = [];
    var half_w = this.width * 0.5;
    var half_h = this.height * 0.5;
    var sample_rate = this.width;
    for(var i = 0; i < sample_rate; i++) {
      var y = 0;
      var x = (i * this.freq / sample_rate) % 1.0;
      switch(this.waveform) {
        case 'Sine':
          y = Math.sin(Math.TWO_PI * x + (this.phase * Math.TWO_PI));
          break;
        case 'Triangle':
          var n = x + this.phase;
          n %= 1.0;
          if(n < 0.5) {
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

      this.points.push([i/sample_rate * this.width, half_h + y * this.amplitude * half_h]); 
    }

    if(this.animating) {
      this.phase += 0.01;
    }
  }

  render() {
    this.color('#333');
    this.grid(0, 0, this.height / 10, this.width / 10, this.width, this.height);
    this.color('#eee');
    this.shape(this.points, false, false);
  }

  reset() {
    this.phase = 0;
  }
}

module.exports = Waves
