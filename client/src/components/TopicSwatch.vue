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
    get_topic_colors() {
      const result = []
      Object.keys(this.data).forEach(t => {
        result.push(this.topics_palette[this.topic_index[t].palette])
      })
      return result.sort((a, b) => this.topics_palette.indexOf(a) - this.topics_palette.indexOf(b))
    },
    get_chart_class() {
      if(this.topic_count == 0) return ''
      return ['one-topic', 'two-topic', 'three-topic', 'four-topic'][this.topic_count-1]
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
  <div class='topic-chart'>
    <div class='topic-chart-inner'>
      <div :class='get_chart_class()'>
        <div v-for='(c, i) in get_topic_colors()' 
          :class='get_chart_item_class()' :key='i' :style='{backgroundColor: c}'>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .topic-chart-inner {
    height: 2em;
    width: 2em;
    align-self: center;
    overflow: hidden;
    border-radius: 0.2em;
    transition: all 0.2s;
    transform-origin: center;
  }

  .topic-chart-inner:hover {
    transform: rotate(180deg) scale(1.4);
    cursor: pointer;
  }

  .one-topic,
  .two-topic, 
  .three-topic, 
  .four-topic {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .one-topic-item, 
  .two-topic-item,
  .three-topic-item, 
  .four-topic-item {
    width: 100%;
    height: 100%;
  }

  .three-topic,
  .four-topic {
    flex-direction: column;
  }

  .four-topic-item {
    flex-grow: 2;
  }
</style>
