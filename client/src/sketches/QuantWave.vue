<script>
import * as d3 from 'd3'
import SketchBase from './SketchBase'

export default {
  name: 'QuantWave', 
  extends: SketchBase, 
  data() {
    return {
      x:[], 
      theta: 0
    }
  }, 
  methods: {
    update() {
      this.theta += 0.1
    }, 
    draw() {
      const selection = 
        d3.select('#svg-sketch')
          .selectAll('text')
          .data([this.theta])
        selection
          .enter()
            .append('text')
            .attr('transform', 'translate(100 100)')
          .merge(selection)
            .text(d=>Math.floor(d))
            .attr('font-size', this.theta + 32)
      
    }
  }
}
</script>
