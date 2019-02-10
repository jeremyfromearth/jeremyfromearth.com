<template>
  <div id="app">
    <Navigation/>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigation from './components/Navigation'

Vue.use(VueRouter)
Vue.config.productionTip = false;
Vue.component('Navigation', Navigation)

export default {
  name: 'JeremyFromEarth',
}
</script>
<style>
#app {
  height: 100vh;
}
</style>
