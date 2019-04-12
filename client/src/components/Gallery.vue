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
        if(c.length == 1) c.push('#ffffff')
        return `linear-gradient(${this.radians}rad, ${c.join(',')})`
      }
      return '#ffffff'
    }
  },
  data() {
    return {
      radians: -0.8,
      open: true,
      visible: false,
      interval_id: 0
    }
  },
  destroyed() {
    console.log('destroyed')
    clearInterval(this.interval_id)
  },
  methods: {
    ...mapActions(['set_gallery_id']), 
    close() {
      this.set_gallery_id(null)
    }
  },
  mounted() {
    this.visible = true
    this.interval_id = setInterval(()=> {
      this.radians += 0.001
      this.$forceUpdate()
    }, 1/60)
  }
}
</script>

<template>
  <div v-if='open'>
    <transition name='background' v-on:after-leave="close">
      <div v-if='visible' class='background' :style='{backgroundImage: gradient}' @click='visible=false'/>
    </transition>
    <transition name='close-button'>
    <div v-if='visible' class='close-button'  @click='visible=false'>
        <i class="far fa-window-close"></i>
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
  opacity: 0.5;
  position: absolute;
  right: 1em;
  top: 1em;
  transition: color 0.4s;
}

.close-button:hover {
  opacity: 0.9;
  cursor: pointer;
}

.close-button-enter, .close-button-leave-to {
  opacity: 0;
  right: 0;
}

.close-button-enter-to {
  opacity: 0.5;
  right: 1em;
}

.close-button-enter-active, .close-button-leave-active {
  transition: opacity 0.2s, right 0.4s;
}
</style>
