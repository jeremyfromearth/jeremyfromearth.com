<template>
  <div>
    <!--
    <div v-for='(work, idx) in get_worx' :key='idx'>
      <router-link :to='"/worx/"+work.slug'>{{ work.title }}</router-link>
    </div>
    <router-view></router-view>
    -->
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'Work',
  computed: {
    ...mapGetters(['get_worx'])
  }
}
</script>
