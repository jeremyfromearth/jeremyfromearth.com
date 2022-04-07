<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'

export default {
  name: 'Project',
  computed: {
    ...mapGetters([
        'technologies',
        'topic_index',
        'topics_palette',
        'topics',
      ])
  },
  methods: {
    ...mapActions([
      'set_gallery_id',
      'set_highlights',
      'set_video_id'
    ]),
    on_mouse_enter() {
      this.data.expanded = true
      this.set_highlights({
        project_id: this.data.id,
        do_highlight: true
      })
    },
    on_mouse_leave() {
      this.data.expanded = false
      this.set_highlights({do_highlight: false})
    },
    on_click() {
      this.data.expanded = !this.data.expanded
      if(this.data.content.length) {
        this.set_gallery_id(this.data.id)
      } else if(this.data.url) {
        window.open(this.data.url, '_blank').focus()
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    show_delay: {
      type: Number,
      default: ()=> 0
    }
  }
}
</script>

<template>
<div
  @click='on_click'
  @mouseenter='on_mouse_enter'
  @mouseleave='on_mouse_leave'
  :class='data.expanded ? `expanded` : null'
  class='project d-flex mt-8'>
  <TopicSwatch
    :class='
      data.expanded ?
        `topic-swatch topic-swatch-expanded` : `topic-swatch`'
    :data='data.topics'
    class='topic-swatch'/>
  <div
    :class='
      data.expanded ?
        `project-inner project-inner-expanded` : `project-inner`'>
    <div
      class='d-flex align-center'>
      <div
        class='d-flex flex-column'>
        <div
          class='pl-0 body-1 font-weight-bold'>
          {{data.title}}
        </div>
        <div
          v-if='data.client'
          class='body-2 mb-2'>
          {{ data.client }}
        </div>
      </div>
      <div
        v-if='data.expanded'
        class='ml-8'>
        <v-btn
          color='#44ABD8'
          icon
          large>
          <font-awesome-icon
            icon='fa-solid fa-angles-right'
            size='lg'/>
        </v-btn>
      </div>
    </div>
    <div>
      {{ data.tldr }}
    </div>
  </div>
</div>
</template>

<style lang='sass' scoped>
.project:last-child
  margin-bottom: 2em

.project
  &:hover
    cursor: pointer

.expanded
  color: #44ABD8

.project-inner
  transition: transform 0.2s ease-in-out
  transition-delay: 0.1s

.project-inner-expanded
  transition-delay: 0s
  transform: translate(4em, 0)

.project-inner-expanded i
  transform: scale(1.4, 1.4)

.topic-swatch
  transform: translate(0, -2px)
  align-self: center
  opacity: 0
  position: absolute
  transition: opacity 0.2s, transform 0.4s
  transition-delay: 0.1s
  transform-origin: center

.topic-swatch-expanded
  opacity: 1
  transform: translate(0, 0)
  transform: rotate(-1.57rad) scale(1.4)
  display: block
</style>
