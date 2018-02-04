import {Renderer} from 'lib/pixelspace';

class Waves extends Renderer {
  constructor(ctx) {
    super(ctx);
    this.t = 0;
    this.freq_1 = 440;
    this.amplitude_1 = 1;
    this.waveshape_1 = 'sqaure';
    this.freq_2 = 880;
  }

  step() {
    this.t ++; 
  }

  render() {

  }
}

module.exports = Waves
