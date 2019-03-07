<script>
export default {
  name: 'Navigation',
  data() {
    return {
      chars: 'abcdefghijklmnopqrstuvwxyz0123456789-/',
      input: this.$router.history.current.path.split('/')[1],
      interval_id: -1,
      keyfocus: true,
      top: this.$router.history.current.path == '/' ? '30vh' : '4em',
      paths: [
        {label:'~/', path:'/', exact:true, router:true},
        {label:'/blog', path:'https://medium.com/@jeremy.from.earth', exact:false, router:false},
        {label:'/linx', path:'/linx', exact:true, router:true},
        {label:'/observable', path:'https://observablehq.com/@jeremyfromearth', exact:true, router:false},
        {label:'/projects', path:'/projects', exact:false, router:true,
          subs:[
            {label:'M.O.R.T.O.N.', path:'/projects/morton'}, 
            {label:'Muse', path:'/projects/muse'},
            {label:'Patch', path:'/projects/patch'},
            {label:'UIBot', path:'/projects/uibot'}
          ]
        },
        {label: '/worx', path: '/worx', exact: false, router:true},
      ]
    }
  },
  computed: {
    current_path(){ return this.$router.history.current.path },
    get_full_input_string(){ return '~/' + this.input }
  },
  methods: {
    animate_input_text(i, on_complete) {
      let new_input = i.split('/')[1]

      /*
      if(this.input == new_input) {
        this.top = this.input == '' ? '32vh' : '4em'
        return
      }
      */

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
            this.top = this.input == '' ? '32vh' : '4em'
            clearInterval(this.interval_id)
            if(on_complete) on_complete()
          }
        }
      }, 50)
    },
    get_subnav_class(parent_path) {
      let root = this.$router.history.current.path.split('/')[1]
      console.log(root, parent_path)
      return parent_path == '/'+root ? 'subnav-container visible' : 'subnav-container hidden'
    },
    handle_key(e) {
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

            let path = null
            let valid = false
            this.paths.forEach(p=> {
              if(p.label == '/' + this.input) {
                path = p
                valid = true
              }
            })
            
            if(valid) {
              if(path.router) {
                this.$router.push('/' + path.path)
              } else {
                window.open(path.path, 'jeremyfromearth') 
              }
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
    }, 
    on_nav_link_click(p) {
      this.animate_input_text(p.label, ()=> {
        if(p.router) {
          this.$router.push(p.path)
        } else {  
          window.open(p.path, 'jeremyfromearth')
        }
      }) 
    },
  },
  mounted() {
    window.addEventListener('keydown', (e)=> {
      this.handle_key(e)
    })
  }
}
</script>
<template>
  <div class='nav-container' :style='{top: top}'>
    <h1>{{ get_full_input_string }}<span class='blink'>_</span></h1>
    <div class='nav-links'>
      <div v-for='(path, idx) in paths'>
        <div>
          <a class='nav-link' :key='idx'
            :to='path.path' :exact='path.exact' @click='on_nav_link_click(path)'>{{ path.label }}</a>
          <div class='subnav-container' v-if='path.subs' :class='get_subnav_class(path.path)'>
            <div class='subnav' v-for='(sub, idx) in path.subs' :key='idx'>
              <span class='line-drawing'>{{ idx == path.subs.length-1 ? '&#9495; ' : '&#9507; ' }}</span>
              <router-link :to='sub.path'>{{ sub.label }}</router-link>
            </div>
          </div>
        </div>
        <!--<a v-else class='nav-link' :key='idx' :href='path.path' target='_jfrome' :exact='path.exact'>{{ path.label }}</a>-->
      </div>
    </div> 
  </div>
</template>

<style scoped>
h1 {
  font-family: Terminus;
  font-size: 8em;
  font-weight: bold;
  margin: 0;
}

.line-drawing {
  color: #999;
  font-family: monospace;
}

.nav-container {
  left: 15vw;
  position: absolute;
  transition: top 0.3s;
  top: 30vh;
}

.nav-link {
  margin-right: 0.5em;
  padding: 0.2em 0.2em 0.2em 0.2em;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  margin: 0.5em 0 0 4em;
}

.router-link-active {
  pointer-events: none;
  background-color: transparent;
  color: #EE0033;
}

.subnav {
  margin: 0 0 0 1em;
  padding: 0.5em 0 0 0.0em;
}

.subnav-container {
  position: absolute;
  margin-left: 0.25em;
}

.blink {
  animation-name: blinkframe;
  animation-duration: 0.8s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes blinkframe {
  0% { opacity: 1.0; }
  100% { opacity: 0.3; }
}
</style>
