<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import {mapActions} from 'vuex'

import Navigation from './components/Navigation'
import Sketch from './components/Sketch'

Vue.use(VueRouter)
Vue.config.productionTip = false;
Vue.component('Navigation', Navigation)
Vue.component('Sketch', Sketch)

export default {
  name: 'JeremyFromEarth',
  methods: {
    ...mapActions([
        'set_window_size'
      ]),
    on_resize() {
      let h = document.documentElement.clientHeight
      let w = document.documentElement.clientWidth     
      this.set_window_size([w, h])
    }
  },
  mounted() {
    this.on_resize()
    window.addEventListener('resize', this.on_resize)
  }
}
</script>

<template>
  <div id="app">
    <Sketch/>
    <Navigation/>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>
