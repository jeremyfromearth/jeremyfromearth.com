<template>
  <div>
    <div v-for="a in get_abstracts">
      <h1>{{ a.title }}</h1>
      <p><strong>TLDR;</strong> {{ a.tldr }}</p>
      <div>
        <span>KEYWORDS: {{ a.keywords.join(', ') }}</span>
      </div>
    </div> 
  </div>
</template>
<script>
import {
  mapGetters,
} from 'vuex'

export default {
  name: 'Blog', 
  computed: {
    ...mapGetters([
      'get_abstracts'
    ])
  }
}
</script>
<style scoped>
  h1 {
    font-size:1em;
  }
</style>
