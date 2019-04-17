<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import _ from 'lodash'

export default {
  name: 'Gallery',
  computed: {
    ...mapGetters([
      'gallery_id',
      'project_lookup',
      'topic_index', 
      'topics_palette', 
      'window_size'
    ]), 
    gradient: function() {
      const p = this.project_lookup[this.gallery_id]
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
    }
  },
  data() {
    return {
      current_content: null,
      content: [],
      content_idx: 0,
      content_paths: [],
      content_width: '80%', 
      content_height: '80%',
      interval_id: 0,
      loading: true,
      open: true,
      video: null,
      radians: -0.8,
      visible: false
    }
  },
  destroyed() {
    clearInterval(this.interval_id)
    window.removeEventListener('keydown', this.on_key_down_throttle)
  },
  methods: {
    ...mapActions(['set_gallery_id']), 
    close() {
      this.set_gallery_id(null)
    },
    calc_content_size() {
      let r = 1
      const w = this.window_size[0]
      const h = this.window_size[1] -
        this.$refs.controls.clientHeight - 
          this.$refs.close_button.clientHeight

      if(this.current_content.width >= this.current_content.height) {
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
      this.content_idx = this.content_idx - 1 % this.content_paths.length
      this.load_next()
    },
    inc() {
      this.content_idx = (this.content_idx + 1) % this.content_paths.length
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
      if(evt.key == 'ArrowRight') {
        this.set_content_idx(
          this.content_idx + 1 > this.content_paths.length - 1 ? 
            0 : this.content_idx + 1)
      }

      if(evt.key == 'ArrowLeft') {
        this.set_content_idx(
          this.content_idx - 1 < 0 ? 
            this.content_paths.length - 1 : 
              this.content_idx - 1)
      }
    },
    on_vimeo_player_ready(size) {
      this.loading = false
      this.current_content.width = size[0]
      this.current_content.height = size[1]
      this.calc_content_size()
    },
    set_content_idx(i) {
      this.content_idx = i
      this.load_next()
    }
  },
  mounted() {
    this.content_idx = 0
    const proj = this.project_lookup[this.gallery_id]
    this.content_paths = 
      [].concat(proj.videos ? proj.videos : [])
        .map(x => {
          return {type: 'video', src: x}
        })
      .concat(proj.images ? proj.images.map(x => {
          return {type: 'image', src: x} 
        }) : [])
  
    this.interval_id = setInterval(()=> {
      this.radians += 0.0008
      this.$forceUpdate()
    }, 1/60)

    this.on_key_down_throttle = 
      _.throttle(this.on_key_down, 500), {leading: true}
    window.addEventListener('keydown', this.on_key_down_throttle)
    this.visible = true
    this.set_content_idx(0)
  }, 
  watch: {
    window_size: function() {
      this.calc_content_size()
    }
  }
}
</script>

<template>
  <div v-if='open'>
    <transition name='background' v-on:after-leave="close">
      <div v-if='visible' class='background' :style='{backgroundImage: gradient}' @click='visible=false'/>
    </transition>

    <div class='content-container-outer'>
      <transition name='close-button'>
        <div ref='close_button' v-if='visible' class='close-button'  @click='visible=false'>
          <i class="far fa-times-circle"></i>
        </div>
      </transition>

      <transition name='content-container'>
        <div v-if='visible && current_content' class='content-container' 
          :style='{width: `${content_width}px`, height: `${content_height}px`, 
            backgroundColor: current_content.type == "image" ? "white" : "transparent"}'>
          <div class='content'>
            <transition name='content'>
              <img v-if='current_content && current_content.type == "image"' 
                class='md-image' :src='current_content.src' :key='current_content.src'>
              <VimeoPlayer v-else-if='current_content && current_content.type == "video"' 
                v-on:ready='on_vimeo_player_ready' :video_id='current_content.src' 
                :key='current_content.src'/>
            </transition>
          </div>
        </div>
      </transition>

      <transition name='controls' appear>
        <div :style='{visibility: content_paths.length > 1 ? "visible" : "hidden"}' ref='controls' class='controls'> 
          <div class='button' v-for='(img, i) in content_paths' 
               :key='i' @click='set_content_idx(i)'>
            <i v-if='i == content_idx' class="fas fa-circle"></i>
            <i v-else class="far fa-circle"></i>
          </div>
        </div>
      </transition>
    </div>
    <transition name='spinner'>
      <div v-if='loading' class='spinner'>
        <i class="fas fa-spinner"></i>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.background {
  opacity: 0.8;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
}

.background-enter, 
.background-leave-to { opacity: 0; }

.background-enter-active, 
.background-leave-active { transition: opacity 0.4s; }

.close-button {
  padding: 0.5em;
  align-self: flex-end;
  color: white;
  font-size: 3em;
  opacity: 0.8;
  transition: all 0.8s;;
  z-index: 1;
}

.close-button:hover {
  color: white;
  cursor: pointer;
  opacity: 1;
}

.close-button-enter, .close-button-leave-to {
  color: #ccc;
  opacity: 0;
  transform: rotate(90deg);
}

.close-button-enter-active, 
.close-button-leave-active { transition: all 0.4s; }

.controls {
  align-self: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.2em;
  color: white;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  margin: 2em 0 4em 0;
  padding: 0.4em;
}

.controls .button {
  padding: 0 0.2em; 
  transition: all 0.2s;
}

.controls .button:hover {
  color: #eee; 
  cursor: pointer;
}

.controls-enter { opacity: 0; }

.controls-enter-active, 
.controls-leave-active { 
  transition: all 0.4s; 
  transition-delay: 0.8s;
}

.content {
  width: 100%;
  height: 100%;
  position: relative;
}

.content-enter { opacity: 0; }

.content-enter-active, 
.content-leave-active { transition: all 0.4s; }

.content-container {
  align-self: center;
  flex-shrink: 1;
  height: 80%;
  justify-self: center;
  padding: 1em;
  transition: all .4s;
  width: 80%;
}

.content-container-enter, .content-container-leave {
  opacity: 0;
  transform: translate(0, 30px);
}

.content-container-enter-active { transition-delay: 0.4s; }

.content-container-outer {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.spinner {
  animation: spinner-rotation 1s linear infinite;
  color: white;
  font-size: 3em;
  left: 48%;
  position: absolute;
  top: 45%;
  transform-origin: center;
  z-index: 1;
}

.spinner-enter {
  opacity: 0;
}

.spinner-leave-to {
  opacity: 0;
}

.spinner-enter-active, .spinner-leave-active {
  transition: opacity 0.2s;
}

@keyframes spinner-rotation {
  from {
    transform: rotate(0deg); 
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
