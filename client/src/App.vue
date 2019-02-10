<template>
  <div id="app">
    <Sketch/>
    <Navigation/>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigation from './components/Navigation'
import Sketch from './components/Sketch'

Vue.use(VueRouter)
Vue.config.productionTip = false;
Vue.component('Navigation', Navigation)
Vue.component('Sketch', Sketch)

export default {
  name: 'JeremyFromEarth',
}
</script>
<style>
#app {
  height: 100vh;
}
</style>
