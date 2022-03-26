<script>
import {mapActions, mapGetters} from 'vuex'

import Header from './components/Header'

export default {
  components: {
    Header
  },
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
  },
  name: 'app'
}
</script>

<template>
<v-app>
  <Header/>

  <v-main>
    <router-view/>
  </v-main>

  <!--
  <Gallery v-if='gallery_id != null' class='gallery'/>


  -->
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
