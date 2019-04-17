<script>
import {mapGetters} from 'vuex'

export default {
  name: 'TopicSwatch',
  computed: {
    ...mapGetters([
      'topic_index', 
      'topics_palette'
    ]),
    topic_count(){ return Object.keys(this.data).length }
  },
  methods: {
    get_topics() {
      const result = []
      Object.keys(this.data).forEach(t => {
        result.push(this.topic_index[t])
      })
      return result.sort((a, b) => a.palette - b.palette)
    },
    get_chart_class() {
      const count = this.topic_count
      const classes = ['mono', 'duo', 'trio', 'quad']
      if(count < 1 || count > classes.length) return ''
      return `${classes[count-1]}-topic`
    }, 
    get_chart_item_class() {
      if(this.topic_count == 0) return ''
      return `${this.get_chart_class()}-item`
    }
  },
  props: {
    data: {
      type: Object,
      default: ()=> {}
    }
  }
}
</script>

<template>
  <div class='topic-swatch'>
    <div class='topic-swatch-inner'>
      <div :class='get_chart_class()'>
        <div v-for='(t, i) in get_topics()' 
          :class='get_chart_item_class()' 
          :key='i' :style='{backgroundColor: topics_palette[t.palette]}'>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .highlighter {
    position: absolute;
    align-self: center;
    justify-self: center;
  }
  
  .mono-topic,
  .duo-topic, 
  .trio-topic, 
  .quad-topic {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .mono-topic-item, 
  .duo-topic-item,
  .trio-topic-item, 
  .quad-topic-item {
    width: 100%;
    height: 100%;
  }

  .quad-topic {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
  }

  .topic-swatch-inner {
    height: 2em;
    width: 2em;
    align-self: center;
    overflow: hidden;
    border-radius: 0.2em;
  }

  .trio-topic {
    flex-direction: column;
  }
</style>
