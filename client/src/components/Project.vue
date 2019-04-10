<script>
export default {
  name: 'Project',
  props: {
    data: {
      type: Object,
      default: () => {}
    }, 
    show_delay: {
      type: Number, 
      default: ()=> 0
    }
  }, 
}
</script>

<template>
  <div class='project'>
    <TopicSwatch :data='data.topics' class='project-pin'/> 
    <div class='project-inner'>
      <div class='project-heading'>
        <h4>{{ data.title }}</h4>
        <div class='media-link-container'>
          <i v-if='data.images' class='fa fa-images media-link'></i>
          <i v-if='data.video' class='fa fa-video media-link'></i>
          <i v-if='data.url' class='fa fa-link media-link'></i>
        </div>
      </div>
      <h5 v-if='data.client'>{{ data.client }} </h5>
      <p>{{ data.tldr }}</p>
    </div>
  </div>
</template>

<style scoped>
.media-link-container {
  font-size: 1.0em;
  display: flex;
  opacity: 0;
  display: none;
  margin: 0 0 0 1em;
}

.media-link-container i {
  margin: 0.4em 1.4em 0 0;
  transition: color 0.2s;
}

.media-link-container i:hover {
  color:red;
}

.project:hover .media-link-container {
  opacity: 1;
  display: flex;
}

.project:first-child {
  margin-top: 4em;
}

.project {
  display: flex;
  margin-top: 2em;
}

.project p {
  margin: 0; 
}

.project h5 {
  white-space: nowrap;
}

.project h4, h5 {
  margin: 0.4em 0 0.4em 0;;
}

.project-heading {
  display: flex;
  align-items: baseline;
  whitespace: no-wrap;
}

.project-inner {
  transition: transform 0.2s;
}

.project:hover .project-inner {
  transform: translate(3em, 0);
}

.project-pin {
  transform: translate(0, -2px);
  align-self: center;
  opacity: 0;
  position: absolute;
  transition: opacity 0.2s, transform 0.4s;
  transition-delay: 0.1s;
}

.project-pin:hover {
  color: red;
}

.project:hover .project-pin {
  opacity: 1;
  transform: translate(0, 0);
  display: block;
}
</style>
