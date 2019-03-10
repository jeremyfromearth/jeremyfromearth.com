<script>
import {
  mapState
} from 'vuex'
import * as d3 from 'd3'

export default {
  name: 'SketchBase',
  computed: {
    ...mapState([
      'window_size'
    ])
  },
  beforeDestroy() {
    if(this.frame) this.frame.stop()
  },
  data() {
    return {
      frame: null
    }
  },
  methods: {
    draw() { 
      /* Override w/ sub-class*/ 
    }, 
    init() { 
      /* Override w/ sub-class */ 
    }, 
    update() { 
      /* Override w/ sub-class */
    }, 
    pause() {
      /* Override w/ sub-class */
    }, 
    resize() {
      /* Override w/ sub-class */
    },
    resume() {
      /* Override w/ sub-class */
    }, 
  }, 
  mounted() {
    this.init() 
    this.frame = d3.timer(elapsed => {
      this.update(elapsed)
      this.draw(elapsed)
    })
  },
  watch: {
    $route(to) {
      if(to.path == '/') {
        this.resume()
      } else {
        this.pause()
      }
    }, 
    window_size(to, from) {
      this.resize(to, from)
    }
  }
}
</script>

<template>
  <svg 
    id='svg-sketch'
    :width='window_size[0]' 
    :height='window_size[1]'
    :viewBox="'0 0 ' + window_size[0] + ' ' + window_size[1]">
  </svg>
</template>

<style scoped>
#svg-sketch {
  display: inline-block;
  left: 0;
  position: absolute;
  z-index: -1;
}
</style>
