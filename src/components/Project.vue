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
  <div class='project' @mouseenter='on_mouse_enter' @mouseleave='on_mouse_leave'>
    <TopicSwatch class='topic-swatch' :data='data.topics' @click.native='on_swatch_click'
      :class='data.expanded ? "topic-swatch topic-swatch-expanded" : "topic-swatch"'/> 
    <div :class='data.expanded ? "project-inner project-inner-expanded" : "project-inner"'>
      <div class='project-heading'>
        <h4 @click='data.expanded && data.content.length ? set_gallery_id(data.id) : null'>{{ data.title }}</h4>
        <div :class='data.expanded ? "media-link-container media-link-container-expanded" : "media-link-container"'>
          <h4><i v-if='data.content.length != 0' class='far fa-images media-link' @click='set_gallery_id(data.id)'></i></h4>
          <h4><a v-if='data.url' :href='data.url' target='new'><i  class='fa fa-link media-link'></i></a></h4>
        </div>
      </div>
      <h5 v-if='data.client'>{{ data.client }} </h5>
      <p>{{ data.tldr }}</p>
    </div>
  </div>
</template>

<style scoped>
.media-link-container {
  font-size: 1.0em;
  display: flex;
  opacity: 0;
  display: none;
  margin: 0 0 0 1em;
}

.media-link-container i {
  margin: 0.4em 1.4em 0 0;
  transition: color 0.2s;
}

.media-link-container i:hover {
  color: #5bbcfb;
}

.media-link-container-expanded {
  opacity: 1;
  display: flex;
}

.project:first-child {
  margin-top: 4em;
}

.project {
  display: flex;
  overflow: visible;
  margin-top: 1em;
}

.project p {
  margin: 0 0 1em 0; 
}

.project h5 {
  margin-bottom: 1em;
}

.project h4 {
  cursor: pointer;
  text-transform: uppercase;
}

.project h4:hover {
  color: #5bbcfb;
}

.project h4, h5 {
  margin: 0.4em 0 0.4em 0;;
}

.project-heading {
  display: flex;
  align-items: center;
}

.project-heading i {
  cursor: pointer;
  margin: 0 1.6em 0 0em;
}

.project-inner {
  transition: transform 0.2s ease-in-out;
  transition-delay: 0.1s;
}

.project-inner-expanded {
  transition-delay: 0s;
  transform: translate(4em, 0);
}

.project-inner-expanded i {
  transform: scale(1.4, 1.4)
}

.topic-swatch {
  transform: translate(0, -2px);
  align-self: center;
  opacity: 0;
  position: absolute;
  transition: opacity 0.2s, transform 0.4s;
  transition-delay: 0.1s;
  transform-origin: center;
}

.topic-swatch-expanded {
  opacity: 1;
  transform: translate(0, 0);
  transform: rotate(-1.57rad) scale(1.4);
  display: block;
}
</style>
