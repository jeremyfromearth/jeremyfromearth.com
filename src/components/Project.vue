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
        'set_video_id'
      ]),

    highlight(value) {
      Object.keys(this.data.topics).forEach(t => {
        const topic = this.topic_index[t]
        const color = this.topics_palette[topic.palette]
        if(topic) topic.highlight = value
        const languages = this.data.topics[t]
        Object.keys(languages).forEach(lang=> {
          const project_tech = languages[lang]
          this.technologies[lang].forEach(tech => {
            if(project_tech.includes(tech.label)) {
              tech.highlight = value
              tech.color = color
            }
          })
        })
      })
    },
    on_mouse_enter() {
      this.data.expanded = true
      this.highlight(true)
    },
    on_mouse_leave() {
      this.data.expanded = false
      this.highlight(false)
    },
    on_project_click() {
      if(this.$is_mobile) {
        this.data.expanded = !this.data.expanded
      }
    },
    on_swatch_click() {
      if(this.data.content.length) {
        this.set_gallery_id(this.data.id)
      }
    },
    unhighlight() {
      Object.keys(this.data.topics).forEach(t => {
        if(this.topic_index[t]) {
          this.topic_index[t].highlight = false
        }
      })
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
  @mouseenter='on_mouse_enter'
  @mouseleave='on_mouse_leave'
  class='project d-flex mt-8'>
  <TopicSwatch
    @click.native='on_swatch_click'
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
        @click='
          data.expanded && data.content.length ?
            set_gallery_id(data.id) : null'
        class='body-1 font-weight-bold'>
        {{ data.title }}
      </div>
      <div
        v-if='data.expanded'
        class='d-flex ml-3'>
        <div>
          <font-awesome-icon
            v-if='data.content.length != 0'
            @click='set_gallery_id(data.id)'
            icon='fa-solid fa-photo-film'/>
        </div>
        <div>
          <a
            v-if='data.url'
            :href='data.url'
            target='new'>
          <font-awesome-icon
            :class='data.content.length ? `ml-2` : null'
            icon='fa-solid fa-link'/>
          </a>
        </div>
      </div>
    </div>
    <div
      v-if='data.client'
      class='body-2 mb-2'>
      {{ data.client }}
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
