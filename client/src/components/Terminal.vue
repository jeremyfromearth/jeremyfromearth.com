<template>
  <h1>~/{{ path }}_</h1>
</template>
<script>
export default {
  name: 'Terminal',
  data() {
    return {
      path: 'hello'
    }
  },
  mounted() {
    console.log(this.$router) 
    this.path = this.$router.history.current.path.split('/')[1].toUpperCase()
  }
}
</script>
