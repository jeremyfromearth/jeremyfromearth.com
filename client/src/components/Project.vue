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
  <div class='project' @mouseenter='highlight' @mouseleave='highlight(false)'>
    <TopicSwatch :data='data.topics' class='topic-swatch' v-on:highlight='highlight(true)'/> 
    <div class='project-inner'>
      <div class='project-heading'>
        <h4>{{ data.title }}</h4>
        <div class='media-link-container'>
          <i v-if='data.content.length != 0' class='fas fa-search-plus media-link' @click='set_gallery_id(data.id)'></i>
          <i v-if='data.url' class='fa fa-link media-link'></i>
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
  color:red;
}

.project:hover .media-link-container {
  opacity: 1;
  display: flex;
}

.project:first-child {
  margin-top: 4em;
}

.project {
  display: flex;
  margin-top: 2em;
  overflow: visible;
}

.project p {
  margin: 0; 
}

.project h5 {
  white-space: nowrap;
}

.project h4, h5 {
  margin: 0.4em 0 0.4em 0;;
}

.project-heading {
  display: flex;
  align-items: baseline;
  whitespace: no-wrap;
}

.project-inner {
  transition: transform 0.2s ease-in-out;
  transition-delay: 0.1s;
}

.project:hover .project-inner {
  transition-delay: 0s;
  transform: translate(3em, 0);
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

.topic-swatch:hover {
  color: red;
}

.project:hover .topic-swatch {
  opacity: 1;
  transform: translate(0, 0);
  transform: rotate(-1.57rad) scale(1.4);
  display: block;
}
</style>
