<script>
import * as d3 from 'd3'

export default {
  name: 'Sketches',
  methods: {
    on_resize(){
      let h = document.documentElement.clientHeight
      let w = document.documentElement.clientWidth
      d3.select('#svg-sketch')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${w} ${h}`)
    }
  },
  mounted() {
    this.on_resize()
    window.addEventListener('resize', this.on_resize)
  }, 
  
}
</script>

<template>
  <div id='svg-container'>
    <svg id='svg-sketch'></svg>
  </div>
</template>

<style scoped>
#svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  vertical-align: top;
  overflow: hidden;
}

#svg-sketch {
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0;
}
</style>
