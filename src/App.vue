<script>
// Vendor imports
import Vue from 'vue'
import VueMaterial from 'vue-material'
import {mapActions, mapGetters} from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Gallery from './components/Gallery'
import Project from './components/Project'
import TopicSwatch from './components/TopicSwatch'
import VimeoPlayer from './components/VimeoPlayer'

Vue.use(VueMaterial)
Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('Gallery', Gallery)
Vue.component('Project', Project)
Vue.component('TopicSwatch', TopicSwatch)
Vue.component('VimeoPlayer', VimeoPlayer)

library.add(faCoffee)

export default {
  name: 'JeremyFromEarth',
  computed: {
    ...mapGetters(['gallery_id', 'topics_palette', 'video_id'])
  },
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
  <div>
    <div class='top-bar'>
      <div v-for='(color, i) in topics_palette' :key='i'  class='top-bar-item' :style='{backgroundColor: color}'>
      </div>
    </div>
    <router-view></router-view>
    <Gallery v-if='gallery_id != null' class='gallery'/>
  </div>
</template>

<style scoped>
  .gallery {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
  }

  .top-bar {
    display: flex;
    height: 2px;
  }

  .top-bar-item {
    flex-grow: 1;
    height: 100%;
  }
</style>
