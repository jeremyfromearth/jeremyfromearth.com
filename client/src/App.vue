<script>
// Vendor imports
import Vue from 'vue'
import VueRouter from 'vue-router'
import {mapActions} from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  MdApp, 
  MdContent,
  MdField,
  MdInput,
  MdLabel,
  MdLayout
} from 'vue-material/dist/components'

// Site imports
import Project from './components/Project'

Vue.use(VueRouter)
Vue.use(MdApp)
Vue.use(MdContent)
Vue.use(MdField)
Vue.use(MdLayout)
Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Project', Project)

library.add(faCoffee)

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
  <router-view></router-view>
</template>
