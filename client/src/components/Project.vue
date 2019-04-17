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
        'topics_palette',
        'topics',
      ])
  },
  methods: {
    ...mapActions([
        'set_gallery_id', 
        'set_video_id'
      ]),
    highlight(topic, value) {
      const t = this.data.topics[topic.id]
      const color = this.topics_palette[topic.palette] 
      if(t) {
        Object.keys(t).forEach(lang => {
          t[lang].forEach(tech => {
            // TODO: Consider setting highlighted in an action
            this.technologies[lang].forEach(t => {
              if(t.label == tech) {
                t.highlight = value
                t.color = color
              }
            })
          })
        })
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
  }, 
}
</script>

<template>
  <div class='project'>
    <TopicSwatch :data='data.topics' class='topic-swatch' v-on:highlight='highlight'/> 
    <div class='project-inner'>
      <div class='project-heading'>
        <h4>{{ data.title }}</h4>
        <div class='media-link-container'>
          <i v-if='data.images || data.videos' class='fas fa-search-plus media-link' @click='set_gallery_id(data.id)'></i>
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
