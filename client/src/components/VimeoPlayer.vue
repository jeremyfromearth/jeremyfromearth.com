<script>
//import Player from '@vimeo/player'

export default {
  name: 'VimeoPlayer', 
  props: {
    src: {
      type: String, 
      default: ()=> ''
    }
  }
}
</script>

<template>
  <div/>
<!--
<div>
  <div style='padding:56.25% 0 0 0;position:relative;'>
    <iframe :src='src'
      style="position:absolute;top:0;left:0;width:100%;height:100%;" 
      frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
    </iframe>
  </div>
</div>
-->
</template>

<style scoped>
</style>
