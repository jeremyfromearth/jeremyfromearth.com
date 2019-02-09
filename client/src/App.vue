<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Terminal from './components/Terminal'

Vue.use(VueRouter)
Vue.config.productionTip = false;
Vue.component('Terminal', Terminal)

export default {
  name: 'JeremyFromEarth',
}
</script>
