<script>
import {
  mapState
} from 'vuex'

import QuantWave from '../sketches/QuantWave'
import Test from '../sketches/Test'

let sketches = [QuantWave]

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
      }
    }
  }
}
</script>

<template>
  <div id='svg-container'>
    <component v-bind:is="sketch"></component>
  </div>
</template>

<style scoped>
#svg-container {
 display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* aspect ratio */
    vertical-align: top;
    overflow: hidden; 
}
</style>
