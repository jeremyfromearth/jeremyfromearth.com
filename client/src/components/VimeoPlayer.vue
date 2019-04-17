<script>
import Player from '@vimeo/player'

export default {
  name: 'VimeoPlayer',
  data() {
    return {
      player: null,
      ready: false,
    }
  },
  mounted() {
    this.player = 
      new Player('player', {
        byline: false,
        id: this.video_id,
        dnt: true,
        responsive: true,
        title: false,
      })

    Promise.all([
      this.player.getVideoWidth(),
      this.player.getVideoHeight()
    ]).then(result => {
      this.ready = true
      this.$emit('ready', result)
      this.$refs.player.firstChild.style.position = 'unset'
    })

  }, 
  props: {
    video_id: {
      type: String, 
      default: ()=> ''
    }
  }, 
  destroyed() {
    if(this.player) this.player.destroy()
  }
}
</script>

<template>
  <div ref='player' id='player' class='player' :style='{opacity: ready ? 1 : 0}'></div>
</template>

<style scoped>

.player {
  height: 100%;
  position: absolute;
  transition: opacity 0.4s;
  transition-delay: 0.4s;
  width: 100%;
}
</style>
