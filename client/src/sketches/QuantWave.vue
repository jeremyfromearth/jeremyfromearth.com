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
      theta: 0, 
      hz: 16,
      sr: 0
    }
  }, 
  methods: {
    init() {
      this.path = d3.select('#svg-sketch')
        .append('g')
        .append('path')
    },
    update() {
      this.sr = this.window_size[0] / 64
      this.y = [
        ...Array(Math.ceil(this.sr))
      ].map((_, i)=> {
        return Math.sin(TWO_PI * i * (this.hz / this.sr) + this.theta * TWO_PI)
      })
      this.theta += 0.005
    }, 
    draw() {
      let x_scale = d3.scaleLinear().domain([0, this.sr-1]).range([0, this.window_size[0]])
      let y_scale = d3.scaleLinear().domain([-1, 1]).range([this.window_size[1] * 0.5 + 16, this.window_size[1] * 0.5 - 16])

      let l = d3.line()
        .x((d, i) => x_scale(i))
        .y((d, i) => y_scale(this.y[i]))

      this.path
          .data([this.y])
          .attr('d', l)
          .style('fill', 'none')
          .style('stroke', '#333')
          .style('opacity', 0.2)
          .style('stroke-width', '1px')
    }
  }
}
</script>
