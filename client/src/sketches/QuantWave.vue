<script>
import * as d3 from 'd3'
import SketchBase from './SketchBase'

const TWO_PI = Math.PI * 2

export default {
  name: 'QuantWave', 
  extends: SketchBase, 
  data() {
    return {
      y:[], 
      phase: 1, 
      hz: 16,
      sr: 0, 
      q: 0,
      i: 0
    }
  }, 
  methods: {
    init() {
      this.path = d3.select('#svg-sketch')
        .append('g')
        .append('path')
      this.bar = d3.select('#svg-sketch')
        .append('g')

    },
    update() {
      this.sr = this.window_size[0] / 64 // (Math.abs(Math.sin(this.q += 0.001)) * 32)
      this.hz = 3 + Math.abs(Math.cos(this.phase) * 4)
      this.y = [
        ...Array(Math.ceil(this.sr))
      ].map((_, i)=> {
        return Math.sin(TWO_PI * i * (this.hz / this.sr) + this.phase * TWO_PI)
      })
      this.phase += 0.005
    }, 
    draw() {
      let x_scale = 
        d3.scaleLinear()
          .domain([0, this.sr-1])
          .range([0, this.window_size[0]])

      let y_scale = 
        d3.scaleLinear()
          .domain([-1, 1])
          .range([this.window_size[1] * 0.5 + 32, this.window_size[1] * 0.5 - 32])

      let l = d3.line()
        .x((d, i) => x_scale(i))
        .y((d, i) => y_scale(this.y[i]))

      this.path
        .data([this.y])
        .attr('d', l)
        .style('fill', 'none')
        .style('stroke', '#333')
        .style('opacity', 1.0)
        .style('stroke-width', '1px')

      this.hist = d3
        .histogram()
        .thresholds(this.window_size[0]/64)

      this.bins = this.hist(this.y)

      if(!this.i++) {
        //console.log(this.bins)
      }
    }
  }
}
</script>
