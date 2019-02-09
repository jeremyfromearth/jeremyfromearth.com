<template>
  <div>
    <h1>~/{{ path }}_</h1>
    <div class='nav-links'>
      <router-link v-for='(path, idx) in paths' class='nav-link' v-bind:key='idx' v-bind:to='path'>/{{ path }}</router-link>
    </div> 
  </div>
</template>
<script>
export default {
  name: 'TerminalNav',
  data() {
    return {
      path: ''
    }
  },
  mounted() {
    this.path = this.$router.history.current.path.split('/')[1]
  },
  computed: {
    paths() {
      return [
        'about', 
        'blog',
        'contact',
        'projekte',
        'work'
      ].filter(x=>x != this.path)
    }
  }
}
</script>
<style scoped>
.nav-link {
  margin-right: 0.5em;
  padding: 0.2em 0.2em 0.2em 0.2em;
  text-transform: uppercase;
}

.nav-links {
  margin-left: 4em;
}
</style>
