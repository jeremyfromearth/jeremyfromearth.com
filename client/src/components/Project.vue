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
    this.title = title.slice(0, Math.floor(title.length * 0.4))
    this.client = client.slice(0, Math.floor(client.length * 0.2))
    this.tldr = tldr.slice(0, Math.floor(tldr.length * 0.8))

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
          this.client += client[this.client.length] 
        }
        if(this.tldr.length < tldr.length) {
          keep_going = true
          this.tldr += tldr[this.tldr.length] 
        }
      } else {
        keep_going = true;
      }

      if(!keep_going) clearInterval(this.interval_id)
      frame++
    }, 32)
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
  <transition name='project'>
    <div class='project'>
      <div class='project-heading'>
        <h4>{{ title }} </h4>
        <h5 v-if='client'>,&nbsp;{{ client }}</h5>
        <i class='fa fa-angle-double-right project-hover-icon'></i>
      </div>
      <p>{{ tldr }}</p>
    </div>
  </transition>
</template>

<style scoped>
.project p {
  margin: 0; 
}

.project-enter {
  opacity: 0;
}

.project-hover-icon {
  opacity: 0;
  transition: all 0.2s;
  position: relative;
}

.project h4 {
  white-space: nowrap;
}

.project h5 {
  white-space: nowrap;
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

.project-heading h4, h5 {
  margin-bottom: 0.25em;
}
</style>
