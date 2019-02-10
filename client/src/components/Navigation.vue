<script>
export default {
  name: 'Navigation',
  data() {
    return {
      input: this.$router.history.current.path.split('/')[1],
      interval_id: -1,
      keyfocus: true,
      chars: 'abcdefghijklmnopqrstuvwxyz0123456789-/',
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
      return '~/' + this.input
    }
  },
  methods: {
    animate_input_text(i) {

      let new_input = i.split('/')[1]
      if(new_input == 'main') new_input = ''
      if(this.input == new_input) return

      let direction = 0
      this.keyfocus = false
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
            this.keyfocus = true
            document.activeElement.blur()
            clearInterval(this.interval_id)
          }
        }
      }, 50)
    }, 
    handle_key_press(e) {
      if(!this.keyfocus) return
      switch(e.keyCode) {
        // Delete
        case 8:
          e.preventDefault();
          e.cancelBubble = true;
          if(this.input.length) {
            this.input = this.input.substring(0, this.input.length - 1);
          }
        break;

        // Enter
        case 13:
          e.preventDefault();
          e.cancelBubble = true
          if(this.input == "main") {
            this.$router.push('/');
          } else {
            let valid = false
            this.paths.forEach(p=> {
              if(p.label == '/' + this.input) {valid = true}
            })
            
            if(valid) {
              this.$router.push('/' + this.input)
            }
          }
        break

        // Valid chars
        default:
          var s = String.fromCharCode(e.keyCode).toLowerCase();
          if(this.chars.indexOf(s) >= 0) {
            this.input += s
          }
        break
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', (e)=> {
      this.handle_key_press(e)
    })
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
    <h1>{{ get_full_input_string }}<span class='blink'>_</span></h1>
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

.blink {
  animation-name: blinker;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@-moz-keyframes blinker {
  0% { opacity: 1.0; }
  100% { opacity: 0.3; }
}

@-webkit-keyframes blinker {
  0% { opacity: 1.0; }
  100% { opacity: 0.3; }
}

@keyframes blinker {
  0% { opacity: 1.0; }
  100% { opacity: 0.3; }
}

</style>
