<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'links',
      'topics_palette'
    ]),
    globe_colors() {
      return [...this.topics_palette].concat([...this.topics_palette].reverse())

    }
  },
  data() {
    return {
      frame_count: 0,
      globe_icon: 'fas fa-globe-europe',
      globe_idx: 0,
      globe_color_idx: 0,
      hidden: false
    }
  },
  destroy() {

  },
  methods: {
    on_route_change() {
      this.hidden = this.$route.name === 'projects'
    }
  },
  mounted() {
    const globe = [
      'fa-solid fa-earth-europe',
      'fa-solid fa-earth-africa',
      'fa-solid fa-earth-asia',
      'fa-solid fa-earth-americas',
      'fa-solid fa-earth-oceania'
    ]

    setInterval(()=> {
      this.globe_icon = globe[this.globe_idx]
      this.frame_count++
      this.globe_idx = this.frame_count % globe.length
      this.globe_color_idx = this.frame_count % this.globe_colors.length
    }, 1000)

    this.on_route_change()
  },
  name: null,
  watch: {
    $route() {
      this.on_route_change()
    }
  }
}
</script>

<template>
<v-app-bar
  :style='{
    transform: `translateY(${hidden ? "-64px" : 0})`,
    transition: `transform 0.4s`,
    transitionDelay: `0.4s`
  }'
  color='white'
  class='px-0'
  elevation='1'
  app
  fixed>
  <div
    class='top-bar'>
    <div
      v-for='(color, i) in topics_palette'
      :key='i'
      :style='{backgroundColor: color}'
      class='top-bar-item'>
    </div>
  </div>
  <v-container
    class='header-container'>
    <v-row>
      <v-col
        class='d-flex align-center'
        cols='12'>
        <div class='d-flex align-center'>
          <h1>J from</h1>
          <font-awesome-icon
            :icon='globe_icon'
            :style='{
              color: globe_colors[globe_color_idx]
            }'
            class='globe ml-2 mr-2'
            size='2x'/>
          <h4>v3.0.1</h4>
        </div>
        <v-spacer/>
        <div>
          <a
            v-for='(link, i) in links'
            :key='i'
            :href='link.url'
            target='blank'>
            <font-awesome-icon
              :icon='link.icon'
              class='external-header-link ml-4'
              size='1x'/>
          </a>
        </div>
      </v-col>
    </v-row>
  </v-container>
</v-app-bar>
</template>

<style lang='sass' scoped>
.external-header-link
  font-size: 1.2em !important
  transform-origin: center
  transition: transform 0.2s

  &:hover
    transform: scale(1.5)

.globe
  transform: color 0.5s

.header-container
  max-width: 1024px

.top-bar
  display: flex
  height: 4px
  left: 0
  position: fixed
  top: 0
  width: 100%

  .top-bar-item
    flex-grow: 1
    height: 100%
</style>
