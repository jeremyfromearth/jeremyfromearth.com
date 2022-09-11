<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import _ from 'lodash'
import Hammer from 'hammerjs'

export default {
  name: 'Gallery',
  computed: {
    ...mapGetters([
      'project_lookup',
      'topic_index',
      'topics_palette',
      'window_size'
    ]),
    gradient: function() {
      const p = this.project_lookup[this.project_id]
      if(p) {
        const topics = Object.values(
          _.pick(this.topic_index, Object.keys(p.topics)))
            .sort((a, b)=> a.palette - b.palette)

        const c = []
        topics.forEach(t => c.push(this.topics_palette[t.palette]))
        if(c.length == 1) c.push('#000')
        return `linear-gradient(${this.radians}rad, ${c.join(',')})`
      }
      return '#ffffff'
    },
    project() {
      return this.project_lookup[this.project_id]
    }
  },
  data() {
    return {
      current_content: null,
      content: [],
      content_idx: 0,
      content_paths: [],
      content_width: null,
      content_height: null,
      interval_id: 0,
      loading: false,
      video: null,
      radians: -0.8,
      visible: false
    }
  },
  destroyed() {
    clearInterval(this.interval_id)
    window.removeEventListener('keydown', this.on_key_down_throttle)
    if(this.swipe) {
      this.swipe.off('swipeleft swiperight', this.on_swipe)
    }
  },
  methods: {
    ...mapActions(['set_project_id']),
    close() {
      this.$router.push({name: 'main'})
    },
    calc_content_size() {
      let r = 1
      const w = this.window_size[0]
      const h = this.window_size[1] -
        this.$refs.controls.clientHeight -
          this.$refs.close_button.clientHeight

      if(this.current_content.width > this.current_content.height) {
        r = this.current_content.height / this.current_content.width
        this.content_width = w * 0.8
        this.content_height = this.content_width * r
        if(this.content_height > h) {
          r = this.current_content.width / this.current_content.height
          this.content_height = h * 0.8
          this.content_width = this.content_height * r
        }
      } else {
        r = this.current_content.width / this.current_content.height
        this.content_height = h * 0.8
        this.content_width = this.content_height * r
        if(this.content_width > w) {
          r = this.current_content.height / this.current_content_width
          this.content_width = w * 0.8
          this.content_height = this.content_width * r
        }
      }
    },
    dec() {
      this.content_idx--
      this.content_idx =
        Math.abs(this.content_paths.length + this.content_idx) %
          this.content_paths.length
      this.load_next()
    },
    inc() {
      this.content_idx++
      this.content_idx %= this.content_paths.length
      this.load_next()
    },
    load_next() {
      this.loading = true
      const current = this.content_paths[this.content_idx]

      switch(current.type) {
        case 'image':
          if(!this.content[this.content_idx]) {
            const image_path = `/images/projects/${current.src}`
            const img = new Image()
            img.src = image_path
            img.addEventListener('load', ()=> {
              this.current_content = this.content[this.content_idx] = img
              this.current_content.type = 'image'
              this.calc_content_size()
              this.loading = false
            })
          } else {
            this.current_content = this.content[this.content_idx]
            this.current_content.type = 'image'
            this.calc_content_size()
            this.loading = false
          }
          break
        case 'video':
          this.loading = true
          this.current_content = {src: current.src, type: 'video'}
          break
      }
    },
    on_key_down(evt) {
      if(this.content_paths.length <= 1) return
      if(evt.key == 'ArrowRight') this.inc()
      if(evt.key == 'ArrowLeft') this.dec()
    },
    on_project_change() {
      if(!this.project) return

      this.loading = true
      this.content_idx = 0

      const proj = this.project_lookup[this.project_id]
      this.content_paths = proj.content

      this.interval_id = setInterval(()=> {
        this.radians += 0.0008
        this.$forceUpdate()
      }, 1/60)

      this.on_key_down_throttle =
        _.throttle(this.on_key_down, 500), {leading: true}
      window.addEventListener('keydown', this.on_key_down_throttle)
      this.content_idx = 0

      if(this.content_paths.length > 1) {
        setTimeout(()=> {
          this.swipe = new Hammer(this.$refs.content_container)
          this.swipe.get('swipe').set({direction: Hammer.DIRECTION_ALL})
          this.swipe.on('swipeleft swiperight', this.on_swipe)
        }, 500)
      }

      this.visible = true
      this.load_next()
    },
    on_vimeo_player_ready(size) {
      this.loading = false
      this.current_content.width = size[0]
      this.current_content.height = size[1]
      this.calc_content_size()

      setTimeout(() => {
        const swipe = new Hammer(this.$refs.video.$el)
        swipe.get('swipe').set({direction: Hammer.DIRECTION_ALL})
        swipe.on('swipeleft swiperight', this.on_swipe)
      }, 500)
    },
    on_swipe(e) {
      if(e && e.type == 'swipeleft') this.inc()
      if(e && e.type == 'swiperight') this.dec()
    },
    set_content_idx(i) {
      this.content_idx = i
      this.load_next()
    }
  },
  mounted() {
    this.on_project_change()
  },
  props: {
    project_id: {type: String, default: () => null}
  },
  watch: {
    project() {
      this.on_project_change()
    },
    window_size: function() {
      this.calc_content_size()
    }
  }
}
</script>

<template>
<div
  v-if='project'
  class='project'>

  <transition
    v-if='visible'
    name='background'
    v-on:after-leave='close'
    appear>

    <div
      v-if='visible'
      :style='{
        backgroundImage: gradient
      }'
      class='background pos-abs'
      />
  </transition>

  <div
    class='content-container-outer d-flex flex-column justify-space-between'>
    <v-btn
      ref='close_button'
      @click='visible=false'
      class='ma-4 align-self-end'
      color='white'
      large
      icon>
      <font-awesome-icon
        icon='fa-regular fa-circle-xmark'
        size='3x'/>
    </v-btn>

    <transition
      name='content-container'>
      <div
        v-if='visible && current_content'
        ref='content_container'
        class='content-container align-self-center justify-self-center pa-4'
        :style='{
          width: `${content_width}px`, height: `${content_height}px`
        }'>
        <div
          class='content'>
          <transition
            name='content'>
            <img
              v-if='current_content && current_content.type == `image`'
              :key='current_content.src'
              :src='current_content.src'
              :style='{
                objectFit: content_paths[content_idx].fit || `cover`
              }'>
            <VimeoPlayer
              v-else-if='current_content && current_content.type == `video`'
              :key='current_content.src'
              ref='video'
              @ready='on_vimeo_player_ready'
              :video_id='current_content.src'/>
          </transition>
          <div class='overlay'></div>
        </div>
      </div>
    </transition>

    <transition
      name='controls'
      appear>
      <div
        ref='controls'
        :style='{
          visibility: content_paths.length > 1 ? "visible" : "hidden"
        }'
        class='
          controls d-flex flex-shrink-0 align-self-center
          justify-space-between mt-8 mb-12 pa-2'>
        <v-btn
          v-for='(img, i) in content_paths'
          :key='i'
          @click='set_content_idx(i)'
          color='white'
          icon
          small>
          <font-awesome-icon
            :icon='i === content_idx ?
              `fa-solid fa-circle` : `fa-regular fa-circle`'/>
        </v-btn>
      </div>
    </transition>
  </div>

  <div
    v-if='loading'
    class='loader-container pos-abs d-flex align-center justify-center'>
    <v-progress-linear
      :style='{width: `256px`}'
      color='white'
      indeterminate/>
  </div>
</div>
</template>

<style lang='sass' scoped>
.project
  height: 100vh
  position: absolute
  width: 100vw
  z-index: 1

.background
  height: 100vh
  opacity: 0.8
  width: 100vw
  z-index: -1

.background-enter,
.background-leave-to
  opacity: 0

.background-enter-active,
.background-leave-active
  transition: opacity 0.4s

.controls
  background-color: rgba(255, 255, 255, 0.5)
  border-radius: 0.2em

.controls-enter
  opacity: 0

.controls-enter-active,
.controls-leave-active
  transition: all 0.4s
  transition-delay: 0.8s

.content
  width: 100%
  height: 100%
  position: relative

.content-enter
  opacity: 0

.content-enter-active,
.content-leave-active
  transition: all 0.4s

.content-container
  background-color: rgba(0, 0, 0, 0.4)
  border-radius: 0.2em
  height: 80%
  transition: all .4s
  width: 80%

.content-container-enter, .content-container-leave
  opacity: 0
  transform: translate(0, 30px)

.content-container-enter-active
  transition-delay: 0.4s

.content-container-outer
  position: absolute
  width: 100%
  height: 100%
  z-index: 1

img
  width: 100%
  height: 100%
  position: absolute

.loader-container
  width: 100%
  height: 100%
</style>
