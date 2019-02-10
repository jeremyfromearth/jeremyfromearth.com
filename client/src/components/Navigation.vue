<script>
export default {
  name: 'Navigation',
  data() {
    const init = this.$router.history.current.path.split('/')[1]
    return {
      input: init,
      current_path: init,
      paths: [
        {label: '/main', path: '/', exact: true},
        {label: '/about', path: '/about', exact: true},
        {label: '/blog', path: '/blog', exact: false},
        {label: '/contact', path: '/contact', exact: true},
        {label: '/projekte', path: '/projekte', exact: false},
        {label: '/work', path: '/work', exact: false}
      ]
    }
  },
  computed: {
    get_input_string() {
      return '~/' + this.input + '_'
    }
  },
  watch: {
    $route(to) {
      this.current_path = to.path.split('/')[1]
      this.input = this.current_path == 'main' ? '' : `${this.current_path}`
    }
  }
}
</script>
<template>
  <div>
    <h1>{{ get_input_string }}</h1>
    <div class='nav-links'>
      <router-link 
        v-for='(path, idx) in paths' 
          class='nav-link' v-bind:key='idx'
          v-bind:to='path' v-bind:exact='path.exact'>
        {{ path.label }}
      </router-link>
    </div> 
  </div>
</template>
<style scoped>
.nav-link {
  margin-right: 0.5em;
  padding: 0.2em 0.2em 0.2em 0.2em;
  text-transform: uppercase;
}

.nav-links {
  margin-left: 4em;
}

.router-link-active {
  pointer-events: none;
  color: #999;
}
</style>
