<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import TerminalNav from './components/TerminalNav'

Vue.use(VueRouter)
Vue.config.productionTip = false;
Vue.component('TerminalNav', TerminalNav)

export default {
  name: 'JeremyFromEarth',
}
</script>
