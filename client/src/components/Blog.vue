<template>
  <div class='container'>
    <div class='content'>
      <div v-for="a in get_abstracts">
        <h1>{{ a.title }}</h1>
        <p><strong>TLDR;</strong> {{ a.tldr }}</p>
        <div>
          <span>KEYWORDS: {{ a.keywords.join(', ') }}</span>
        </div>
        <h6>{{ a.timestamp }}</h6>
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
  font-size: 1.6em;
}

.container {
  min-width: 256px;
  max-width: 1024px;
  left: 15vw;
  top: 16em;
  width: 70vw;
  position: absolute;
  margin-left: 4em;
}

.content {
  display: flex;
  flex-direction: column;
}
</style>
