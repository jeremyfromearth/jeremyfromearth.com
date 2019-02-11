<script>
import {
  mapState
} from 'vuex'
import * as d3 from 'd3'

export default {
  name: 'Sketches',
  computed: {
    ...mapState([
      'window_size'
    ])
  },
  data() {
    return {
      x: [0, 0]
    }
  },
  watch: {
    $route(to) {
      if(to.path == '/main') {
        d3.select('svg')
          .select
      }
    }
  }
}
</script>

<template>
  <div id='svg-container'>
    <svg id='svg-sketch' v-bind:viewBox="'0 0 ' + window_size[0] + ' ' + window_size[1]"></svg>
  </div>
</template>

<style scoped>
#svg-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
}
</style>
