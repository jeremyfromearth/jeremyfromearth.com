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
      'topics_palette'
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
      interval_id: 0,
      open: true,
      radians: -0.8,
      visible: false
    }
  },
  destroyed() {
    clearInterval(this.interval_id)
  },
  methods: {
    ...mapActions(['set_gallery_id']), 
    close() {
      this.set_gallery_id(null)
    },
    load_image() {
      const image_path = `/images/projects/${this.image_paths[this.image_idx]}`
      if(!this.images.includes(image_path)) {
        const img = new Image()
        img.src = image_path 
        img.addEventListener('load', ()=> {
          this.images[this.image_idx] = img.src 
          this.$forceUpdate()
        })
      }
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
  }
}
</script>

<template>
  <div v-if='open'>
    <transition name='background' v-on:after-leave="close">
      <div v-if='visible' class='background' :style='{backgroundImage: gradient}' @click='visible=false'/>
    </transition>
    
    <div class='image-container-outer'>
      <transition name='image-container'>
        <div v-if='visible' class='image-container'>
          <div v-for='(img, i) in images' :key='i' class='image'>
            <transition name='image'>
              <img v-if='i == image_idx && images[image_idx]' class='md-image image' :src='img'>
            </transition>
          </div>
        </div>
      </transition>
    </div>

    <transition name='close-button'>
      <div v-if='visible' class='close-button'  @click='visible=false'>
        <i class="far fa-times-circle"></i>
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

.background-enter, .background-leave-to {
  opacity: 0;
}

.background-enter-active, .background-leave-active {
  transition: opacity 0.4s;
}

.close-button {
  color: white;
  font-size: 3em;
  opacity: 0.8;
  position: absolute;
  right: 1em;
  top: 1em;
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
  right: 0;
  transform: rotate(90deg);
}

.close-button-enter-to {
  right: 1em;
}

.close-button-enter-active, .close-button-leave-active {
  transition: all 0.4s;
}

.close-button-leave-active {
  transform: rotate(90deg);
}

.image {
  width: 100%;
  height: 100%;
}

.image-enter {
  opacity: 0;
}

.image-enter-active {
  transition: all 2.0s;
  transition-delay: 6.4s;
}

.image-container {
  background-color: white;
  padding: 1em;
  width: 80%;
  height: 80%;
}

.image-container-enter {
  opacity: 0;
  transform: translate(0, 30px);
}

.image-container-enter-active {
  transition: all .4s;
  transition-delay: 0.4s;
}

.image-container-outer {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
