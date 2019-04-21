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
    unhighlight() {
      //console.log('unhighlight()')
      Object.keys(this.data.topics).forEach(t => {
        if(this.topic_index[t]) {
          this.topic_index[t].highlight = false
          //console.log(this.topic_index[t])    
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
  <div class='project' @mouseenter='on_mouse_enter' @mouseleave='on_mouse_leave' @click='on_project_click'>
    <TopicSwatch :data='data.topics' :class='data.expanded ? "topic-swatch topic-swatch-expanded" : "topic-swatch"'/> 
    <div :class='data.expanded ? "project-inner project-inner-expanded" : "project-inner"'>
      <div class='project-heading'>
        <h4>{{ data.title }}</h4>
        <div :class='data.expanded ? "media-link-container media-link-container-expanded" : "media-link-container"'>
          <i v-if='data.content.length != 0' class='fas fa-search-plus media-link' @click='set_gallery_id(data.id)'></i>
          <a v-if='data.url' :href='data.url' target='new'><i  class='fa fa-link media-link'></i></a>
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
  color:#5bbcfb;
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
  text-transform: uppercase;
}

.project h4, h5 {
  margin: 0.4em 0 0.4em 0;;
}

.project-heading {
  display: flex;
}

.project-inner {
  transition: transform 0.2s ease-in-out;
  transition-delay: 0.1s;
}

.project-inner-expanded {
  transition-delay: 0s;
  transform: translate(3em, 0);
}

/*
.project:hover .project-inner,
.project:active .project-inner {
  transition-delay: 0s;
  transform: translate(3em, 0);
}
*/

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

/*
.project:hover .topic-swatch, 
.project:active .topic-swatch {
  opacity: 1;
  transform: translate(0, 0);
  transform: rotate(-1.57rad) scale(1.4);
  display: block;
}
*/
</style>
