<script>
export default {
  name: 'Navigation',
  data() {
    return {
      input: this.$router.history.current.path.split('/')[1],
      interval_id: -1,
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
    get_full_input_string() {
      return '~/' + this.input + '_'
    }
  },
  methods: {
    animate_input_text(i) {
      let direction = 0
      let new_input = i.split('/')[1]
      if(new_input == 'main') new_input = ''

      clearInterval(this.interval_id)
      this.interval_id = setInterval(()=> {
        if(direction == 0) {
          if(this.input.length > 0) {
            this.input = this.input.slice(0, this.input.length-1)
          } else { 
            direction = 1
          }
        } else {
          if(this.input.length < new_input.length) {
            this.input += new_input[this.input.length]
          } else {
            clearInterval(this.interval_id)
          }
        }
      }, 50)
    }
  },
  watch: {
    $route(to) {
      this.animate_input_text(to.path) 
    }
  }
}
</script>
<template>
  <div>
    <h1>{{ get_full_input_string }}</h1>
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
