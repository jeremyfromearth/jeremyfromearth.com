<script>
import {
  mapState
} from 'vuex'

import * as d3 from 'd3'
import QuantWave from '../sketches/QuantWave'
import Test from '../sketches/Test'

let sketches = [QuantWave, Test]

export default {
  name: 'Sketch',
  computed: {
    ...mapState([
      'window_size'
    ])
  },
  data() {
    return {
      x: [0, 0],
      sketch: this.random_sketch()
    }
  },
  methods: {
    random_sketch() {
      return sketches[Math.floor(Math.random() * sketches.length)]
    },
    update() {
      // Update the sketch
      //if(this.sketch) this.sketch.update()
    }
  },
  watch: {
    $route(to) {
      if(to.path == '/') {
        this.sketch = this.random_sketch() 
        //this.frame = d3.timer(this.update)
      } else if(this.frame) {
        // this.sketch = null // this works to remove the sketch right away
        //this.frame.stop() 
        //this.frame = null
      }
    }
  }
}
</script>

<template>
  <div id='svg-container'>
    <component v-bind:is="sketch"></component>
    <!--
    <svg 
      id='svg-sketch' 
      v-bind:viewBox="'0 0 ' + window_size[0] + ' ' + window_size[1]">
    </svg>
    -->
  </div>
</template>

<style scoped>
#svg-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
}
</style>
