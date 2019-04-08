<script>
export default {
  data() {
    return {
      title: '',
      client: '',
      tldr: '',
      interval_id: null,
    }
  },
  destroyed() {
    clearInterval(this.interval_id)
  },
  mounted() {
    const title = this.data.title
    const client = this.data.client
    const delay = this.show_delay
    const tldr = this.data.tldr || this.data.description

    // Set the starting text to a percentage of the actual text
    this.title = title.slice(0, Math.floor(title.length * 1))
    this.client = client.slice(0, Math.floor(client.length * 1))
    this.tldr = tldr.slice(0, Math.floor(tldr.length * 0.2))

    let frame = 0
    let keep_going = true

    this.interval_id = setInterval(()=> {
      keep_going = false 
      if(frame >= delay) {
        if(this.title.length < title.length) {
          keep_going = true
          this.title += title[this.title.length] 
        }
        if(this.client.length < client.length) {
          keep_going = true
          if(this.title == title) {
            this.client += client[this.client.length] 
          }
        }
        if(this.tldr.length < tldr.length) {
          keep_going = true
          if(this.client == client) {
            this.tldr += tldr[this.tldr.length] 
          }
        }
      } else {
        keep_going = true;
      }

      if(!keep_going) clearInterval(this.interval_id)
      frame++
    }, 8)
  },
  name: 'Project',
  props: {
    data: {
      type: Object,
      default: () => {}
    }, 
    show_delay: {
      type: Number, 
      default: () => 0
    }
  }, 
}
</script>

<template>
  <div class='project'>
    <h4>{{ title }}</h4>
    <h5 v-if='client'>{{ client }} </h5>
    <p>{{ tldr }}</p>
  </div>
</template>

<style scoped>
.project:first-child {
  margin-top: 4em;
}

.project {
  margin-top: 2em;
}

.project p {
  margin: 0; 
}

.project:hover h4 {
  text-decoration: underline;
}

.project h5 {
  white-space: nowrap;
}

.project h4, h5 {
  margin: 0.4em 0 0.4em 0;;
}

.project-enter {
  opacity: 0;
}

.project-hover-icon {
  opacity: 0;
  transition: all 0.2s;
  position: relative;
}

.project-heading {
  display: flex;
  align-items: baseline;
  whitespace: no-wrap;
}

.project-heading:hover .project-hover-icon {
  opacity: 1;
  transform: translate(4px);
}


</style>
