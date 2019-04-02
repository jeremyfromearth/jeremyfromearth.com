<script>
export default {
  name: 'Project',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<template>
  <div class='project'>
    <div class='project-heading'>
      <h4>{{ data.title }} </h4>
      <h5 v-if='data.client'>,&nbsp;{{ data.client }}</h5>&nbsp;
      <i class='fa fa-angle-double-right project-hover-icon'></i>
    </div>
    <p>{{ data.tldr || data.description }}</p>
  </div>
</template>
<style scoped>
.project-hover-icon {
  opacity: 0;
  transition: opacity 0.2s;
}

.project:hover .project-hover-icon {
  opacity: 1;
}

.project p {
  margin: 0; 
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

.project-heading h4, h5 {
  margin-bottom: 0.25em;
}
</style>
