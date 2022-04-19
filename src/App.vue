<script>
import {mapActions} from 'vuex'

import Header from './components/Header'

export default {
  components: {
    Header
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
  },
  name: 'App'
}
</script>

<template>
<v-app>
  <Header/>
  <router-view/>
</v-app>
</template>

<style scoped>
  .gallery {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
  }
</style>
