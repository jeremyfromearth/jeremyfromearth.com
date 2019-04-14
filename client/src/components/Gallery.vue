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
      current_image: null,
      images: [],
      image_count: 0,
      image_idx: 0,
      image_paths: [],
      image_width: '80%', 
      image_height: '80%',
      interval_id: 0,
      loading: true,
      open: true,
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
    calc_image_size() {
      let r = 1
      const w = this.window_size[0]
      const h = this.window_size[1] -
        this.$refs.controls.clientHeight - 
          this.$refs.close_button.clientHeight

      if(this.current_image.width >= this.current_image.height) {
        r = this.current_image.height / this.current_image.width
        this.image_width = w * 0.8
        this.image_height = this.image_width * r
        if(this.image_height > h) {
          r = this.current_image.width / this.current_image.height
          this.image_height = h * 0.8
          this.image_width = this.image_height * r
        }
      } else {
        r = this.current_image.width / this.current_image.height
        this.image_height = h * 0.8
        this.image_width = this.image_height * r
        if(this.image_width > w) {
          r = this.current_image.height / this.current_image_width
          this.image_width = w * 0.8
          this.image_height = this.image_width * r
        }
      }
    },
    dec() {
      this.image_idx = this.image_idx - 1 % this.image_paths.length
      this.load_image()
    },
    inc() {
      this.image_idx = (this.image_idx + 1) % this.image_paths.length
      this.load_image()
    },
    load_image() {
      this.loading = true
      const image_path = `/images/projects/${this.image_paths[this.image_idx]}`
      if(!this.images.includes(image_path)) {
        const img = new Image()
        img.src = image_path 
        img.addEventListener('load', ()=> {
          this.current_image = this.images[this.image_idx] = img
          this.calc_image_size() 
          this.loading = false
        })
      }
    }, 
    on_key_down(evt) {
      if(evt.key == 'ArrowRight') {
        this.set_image_idx(
          this.image_idx + 1 > this.image_paths.length - 1 ? 
            0 : this.image_idx + 1)
      }

      if(evt.key == 'ArrowLeft') {
        this.set_image_idx(
          this.image_idx - 1 < 0 ? 
            this.image_paths.length - 1 : 
              this.image_idx - 1)
      }
    },
    set_image_idx(i) {
      this.image_idx = i
      this.load_image()
    }
  },
  mounted() {
    this.image_idx = 0
    this.image_paths = this.project_lookup[this.gallery_id].images

    /*
    this.interval_id = setInterval(()=> {
      this.radians += 0.0004
      this.$forceUpdate()
    }, 1/60)
    */

    this.visible = true
    this.load_image()
    this.on_key_down_throttle = _.throttle(this.on_key_down, 500), {leading: true}
    window.addEventListener('keydown', this.on_key_down_throttle)
  }, 
  watch: {
    window_size: function() {
      this.calc_image_size()
    }
  }
}
</script>

<template>
  <div v-if='open'>
    <transition name='background' v-on:after-leave="close">
      <div v-if='visible' class='background' :style='{backgroundImage: gradient}' @click='visible=false'/>
    </transition>

    <div class='image-container-outer'>
      <transition name='close-button'>
        <div ref='close_button' v-if='visible' class='close-button'  @click='visible=false'>
          <i class="far fa-times-circle"></i>
        </div>
      </transition>

      <transition name='image-container'>
        <div v-if='visible && current_image' class='image-container' 
          :style='{width: `${image_width}px`, height: `${image_height}px`}'>
          <div class='image'>
            <transition name='image'>
              <img v-if='current_image' class='md-image' :src='current_image.src' :key='current_image.src'>
            </transition>
          </div>
          
        </div>
      </transition>

      <transition name='controls' appear>
        <div ref='controls' class='controls'> 
          <div class='button' v-for='(img, i) in image_paths' 
               :key='i' @click='set_image_idx(i)'>
            <i v-if='i == image_idx' class="fas fa-circle"></i>
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

.close-button-enter-to { right: 1em; }

.close-button-enter-active, 
.close-button-leave-active { transition: all 0.4s; }

.close-button-leave-active { transform: rotate(90deg); }

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

.image {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-enter { opacity: 0; }

.image-enter-active, 
.image-leave-active { transition: all 0.4s; }

.image-container {
  align-self: center;
  background-color: white;
  flex-shrink: 1;
  height: 80%;
  justify-self: center;
  padding: 1em;
  transition: all .4s;
  width: 80%;
}

.image-container-enter, .image-container-leave {
  opacity: 0;
  transform: translate(0, 30px);
}

.image-container-enter-active { transition-delay: 0.4s; }

.image-container-outer {
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
