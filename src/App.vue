<script>
import {mapActions, mapGetters} from 'vuex'

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
<v-app>
  <!-- Router -->
  <router-view></router-view>

  <!-- Gallery -->
  <Gallery v-if='gallery_id != null' class='gallery'/>

  <!-- top color bar -->
  <div class='top-bar'>
    <div v-for='(color, i) in topics_palette'
      :key='i'  class='top-bar-item' :style='{backgroundColor: color}'>
    </div>
  </div>
</v-app>
</template>

<style scoped>
  .gallery {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
  }

  .top-bar {
    top: 0;
    width: 100%;
    position: fixed;
    display: flex;
    height: 4px;
  }

  .top-bar-item {
    flex-grow: 1;
    height: 100%;
  }
</style>
