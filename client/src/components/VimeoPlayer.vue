<script>
import Player from '@vimeo/player'

import { mapGetters } from 'vuex'

export default {
  name: 'VimeoPlayer',
  computed: {
    ...mapGetters(['video_id'])
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    this.player = 
      new Player('player', {
        id: this.video_id
      })
    console.log(this.player)
  }
}
</script>

<template>
  <div id='player'></div>
</template>

<style scoped>
</style>
