<script>
import * as _ from 'lodash'

import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'LiveDoc',
  computed: {
    ...mapGetters([
      'blog_posts', 'keywords', 'links', 
      'pagination', 'projects_paged',
      'project_search_results', 'project_sort_keys', 
      'projects_per_page', 'technologies', 'text',
      'topics', 'topics_palette'
    ]),
    down_pagination_arrow_is_visibile() {
      return this.pagination + this.projects_per_page < this.project_search_results.length
    },
    pagination_text() {
      const result_count = this.project_search_results.length
      switch(result_count) {
        case 1:
          return 'Just the one.'
        case this.pagination + 1:
          return 'Last one!'
        default:
          return `${this.pagination + 1} - 
            ${Math.min(this.pagination + this.projects_per_page, result_count)} / ${result_count}` 
      }
    }
  },
  data() {
    return {
      globe_index: 0,
      search_text: '',
      project_transition_name: 'project-group-inner-down',
      globe_icon_class: 'fas fa-globe-europe',
    }
  },
  async mounted() {
    const globe = [
      'fas fa-globe-europe', 'fas fa-globe-africa',
      'fas fa-globe-asia', 'fas fa-globe-americas'
    ]
    
    setInterval(()=> {
      this.globe_icon_class = globe.shift()
      globe.push(this.globe_icon_class)
      this.globe_index++ 
    }, 500)

    await this.get_data()
    this.clear_project_filters()
  }, 
  methods: {
    ...mapActions([
      'add_keywords',
      'clear_project_filters', 
      'dec_pagination', 
      'inc_pagination', 
      'get_data',
      'remove_keyword'
    ]),
    dec() {
      this.project_transition_name = 'project-group-inner-up'
      this.dec_pagination()
    }, 
    inc() {
      this.project_transition_name = 'project-group-inner-down'
      this.inc_pagination()
    },
    on_keyword_enter() {
      this.add_keywords(this.search_text)
      this.search_text = ''
    },
    projects_with_key(k) {
      return _.filter(this.projects_paged, {year: k})
    }, 
    topic_color(i) {
      return this.topics_palette[i % this.topics_palette.length]
    }
  }
}
</script>
<template>
  <md-app>
    <md-app-content class='content'>
      <div class='container'>
        <div class='header-container'>
          <h1>Jeremy from <i id='globe' :class='globe_icon_class'></i></h1>
          <div>
            <a href='https://gitlab.com/jeremyfromearth'><i class='fab fa-gitlab'></i></a>&nbsp;
            <a href='https://stackoverflow.com/users/230561/jeremyfromearth'><i class='fab fa-stack-overflow'></i></a>&nbsp;
            <a href='https://medium.com/@jeremy.from.earth'><i class='fab fa-medium'></i></a>&nbsp;
            <a href='http://twitter.com/jeremyfromearth'><i class='fab fa-twitter'></i></a>&nbsp;
            <a href='https://www.linkedin.com/in/jeremynealbrown/'><i class='fab fa-linkedin'></i></a>&nbsp;
            <a href='mailto:jeremynealbrown@gmail.com'><i class='fas fa-envelope'></i></a>&nbsp; 
          </div>
        </div>
        <h2>Software Engineer</h2>
        <p>{{text['intro']}}</p>
        <div class='projects-toolbar'>
          <h3>Projects</h3>
          <div class='search-container'>
            <div class='keyword-container'>
              <div v-for='kw in keywords' 
                :key='kw.term' class='keyword'>{{ kw.original }} <i @click='remove_keyword(kw.term)' 
                  class="far fa-times-circle remove-keyword-icon"></i></div>
            </div>
            <form novalidate id='search' v-on:submit.prevent='on_keyword_enter'>
              <md-field>
                <label>Search</label> 
                <md-input v-model='search_text'></md-input>
              </md-field>
            </form>
          </div>
        </div>
        <div v-if='projects_paged.length' class='project-container-outer'>
          <div ref='project_container' class='project-container'>
            <div class='topic-legend'>
              <h4>Topics</h4>
                <div class='topic-legend-item' v-for='(t, i) in topics' :key='i'>
                  <div class='topic-legend-color-block' 
                  :style='{ backgroundColor: topic_color(i) }'/><div class='topic-legend-item-text'>{{t}}</div>
                </div>
            </div>
            <div class='project-outer'>
              <transition-group :name='project_transition_name' tag='div' mode='out-in'>
                <div v-for='(k, i) in project_sort_keys' :key='k + "-" + i' class='md-layout project-group-inner'>
                  <div class='md-layout-item-5' :key='"year-"+k'><h4>{{ k }}</h4></div>
                  <div class='md-layout-item' :key='"project-"+k'>
                    <Project v-for='(p, j) in projects_with_key(k)' :data='p' :show_delay='i * 5' :key='j'/>
                  </div>
                </div>
              </transition-group>
            </div>
            <div class='pagination-controller-container'>
              <div class='pagination-controller' @click='dec()'>
                <div class='pagination-arrow pagination-arrow-up'
                  :style="{ opacity: pagination > 0 ? 1 : 0, 
                            marginTop: pagination > 0 ? '4em': '4em',
                            height: pagination > 0 ? '4em' : '2em' }" >
                <h3><i class="fas fa-angle-double-up"></i></h3></div>
              </div>
              <div class='pagination-controller' @click='inc()'>
                <div class='pagination-arrow pagination-arrow-down'
                :style="{ opacity: down_pagination_arrow_is_visibile > 0 ? 1 : 0,
                          marginTop: pagination == 0 ? '2em' : 
                            down_pagination_arrow_is_visibile ? '4em' : '6em',
                          height: down_pagination_arrow_is_visibile ? '4em' : '2em'}">
                  <h3><i class="fas fa-angle-double-down"></i></h3>
                </div>
              </div>
            </div>
          </div>
          <div class='pagination-detail'>{{ pagination_text }}</div>
        </div>

        <div v-else class='no-matching-projects-message'>
          <i class='fa fa-child'></i>
          <p>No projects matched the keywords provided</p>
        </div>

        <h3>Blog</h3>
        <p>Recent Articles</p>
        <div>
          <ul>
            <li v-for='(x, i) in blog_posts' :key='i'><a href='x.url'>{{ x.title }}</a></li>
          </ul>
        </div>
        <h3>Stacks</h3>
        <div class='md-layout'>
          <div v-for='k in Object.keys(technologies).sort()' :key='k' class='md-layout-item'>
            <h4>{{ k }} </h4> 
            <ul class='md-layout-item'>
              <li v-for='t in technologies[k]' :key='t'>{{ t }}</li>
            </ul>
          </div>
        </div>

        <div class='work-history'>
          <h3>Work History</h3>
          <div class='md-layout'>
            <div>
              <h4>Software Engineer (Contract)</h4>
              <h5>January 2010 - Present</h5>
              <ul>
                <li>Developing over twenty-five custom software projects for The San Francisco Museum of Modern Art, The Smithsonian, Nike and many other clients from around the U.S. and Canada</li>
                <li>Generating project roadmaps, estimates of cost, software schematics and end user documentation</li>
                <li>Collaborating with remote teams using Slack, Git, SVN, Atlassian Tools and Target Process</li>
                <li>Studying fields of interest, including deep learning and natural language processing, with end goal of attaining work in new fields</li>
              </ul>
              <h4>Software Engineer, Textwise</h4>
              <h5>August 2016 - September 2017</h5>
              <ul>
                <li>Developing the Semantic Map, an interactive data visualization tool enabling search and exploration of ten million patent document corpus using JavaScript &amp; D3</li>
                <li>Developing domain specific query language based on provided Backus-Nuar form grammar using C++ for server side syntax parsing and JavaScript with D3 for front end and visualization of abstract syntax tree data structures</li>
              </ul>
              <h4>Creative Technologist, Upswell</h4>
              <h5>Jan 2014 - Jan 2015</h5>
              <ul>
                <li>Architecting and engineering user analytics APIs using Python, Flask and InfluxDB for tracking anonymous metrics in immersive installation software</li>
                <li>Prototyping and experimenting with new technologies including Arduino and Heroic Robotics LED strips, fingerprint sensors and image compositing techniques in OSX</li>
                <li>Developing Microsoft Kinect controlled interactive experience for Clemson University using Cinder</li>
                <li>Developing multiple interactive touch screen applications with Swift, iOS and macOS Desktop for The Nevada Discovery Museum</li>
              </ul>

              <h4>Interactive Developer, Second Story Interactive</h4>
              <h5>July 2007 - Jan 2010</h5>
              <ul>
                <li>Developing award winning interactive digital installations for museums and cultural institutions</li>
                <li>Maintaining and extending MVC application framework used by development teams</li>
                <li>Designed performance tests for simulating user input over extended periods for analysis and optimization of CPU/GPU performance and memory consumption</li>
                <li>Leading research and feasibility studies of new technologies for potential company-wide adoption</li>
              </ul>
            </div>
          </div>
        </div>
        <h3>Collaborators</h3>
        <div class='md-layout'>
          <div class='md-layout-item'>
            <p>Britelite Immersive</p>
            <p>Cibo</p>
            <p>C&amp;G Partners</p>
            <p>The History Factory</p>
          </div>
          <div class='md-layout-item'>
            <p>The Makers</p>
            <p>Northern Light</p>
            <p>Potion Design</p>
            <p>Renate</p>
          </div>
          <div class='md-layout-item'>
            <p>Second Story</p>
            <p>Terra Incognita</p>
            <p>Upswell</p>
            <p>Wieden+Kennedy</p>
          </div>
        </div>
        <h3>Ethos</h3>
        <ul>
          <li>Agile FTW.</li>
          <li>Modules over monoliths.</li>
          <li>People, animals and the planet first, then software.</li>
          <li>Rolling your own is fun. Rolling for others requires empathy.</li>
          <li>The terrain between simplicity and complexity is smooth and continuous.</li>
        </ul>
        <!--<p>If you send me a haiku, I'll send you one back.</p>-->
      </div>
    </md-app-content>
  </md-app>
</template>

<style scoped>
  .container {
    min-width: 360px;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    align-self: center;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .header-container {
    align-items: baseline;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .header-container a {
    padding: 0.25em; 
  }

  .keyword {
    border: 1px solid lightgrey;
    border-radius: 0.5em;
    margin-bottom: 0.25em;
    margin-right: 0.25em;
    padding: 0.32em;
    user-select: none;
    white-space: nowrap;
  }

  .keyword-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }

  .md-field label {
    font-size: inherit;
  }

  .md-layout {
    margin: 0 4em 0 4em;
  }

  .md-layout-item-5 {
    padding-right: 2em;
  } 

  .no-matching-projects-message {
    height: 32em;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .no-matching-projects-message i {
    font-size: 2.5em;
  }

  .pagination-arrow {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 0.0em 1.0em 0.0em 1.0em;
    margin-top: 4em;
    user-select: none;
    justify-content: center;
    transition: height 0.32s, margin-top 0.32s, opacity 0.16s;
  }

  .pagination-arrow-up {
    border-bottom: 1px solid lightgrey;
    padding: 0px 1.5em 0 1.5em;
  }

  .pagination-arrow-up:hover {
    color: red;
    border-bottom: 1px solid red;

  }

  .pagination-arrow-down {
    border-top: 1px solid lightgrey;
    padding: 0px 1.5em 0 1.5em;
  }
  
  .pagination-arrow-down:hover {
    color: red;
    border-top: 1px solid red;
  }

  .pagination-controller {
    height: 8em;
    display: flex;
    flex-direction: column;
    transition: opacity 0.16s, height 0.32s;
  }

  .pagination-controller-container {
    display: flex;
    flex-direction: column;
  }

  .pagination-detail {
    border-top: 1px solid lightgrey;
    font-size: 0.8em;
    font-weight: 800;
    margin: 4em 0 0 0;
    padding: 1.0em 6em;;
    user-select: none;
  }

  .projects-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .project-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  .project-group-inner {
    display: flex;
    flex-wrap: nowrap;
  }

  .project-outer {
    overflow: scroll;
    width: 70%;
  }

  .project-scrollbox {
    width: 100%;
    padding: 0 2em 0 2em;
    overflow: hidden;
  }
  .project-container-outer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .project-group-inner-down-enter {
    transform: translate(0, 4px);
  }

  .project-group-inner-down-enter, 
  .project-group-inner-down-leave-to, 
  .project-group-inner-up-enter, 
  .project-group-inner-up-leave-to {
    opacity: 0;
    display: none;
  }

  .project-group-inner-down-leave-to {
    transform: translate(0, -8px);
  }

  .project-group-inner-down-enter-to, 
  .project-group-inner-up-enter-to {
    opacity: 1;
  }

  .project-group-inner-down-enter-active, .project-group-inner-down-leave-active, 
  .project-group-inner-up-enter-active, .project-group-inner-up-leave-active {
    transition: all 0.3s;
    display: flex;
  }

  .project-group-inner-down-enter-active, 
  .project-group-inner-up-enter-active {
    transition-delay: 0.35s;
  }

  .project-group-inner-up-enter {
    transform: translate(0, -4px);
  }

  .project-group-inner-up-leave-to {
    transform: translate(0, 8px);
  }

  .remove-keyword-icon:hover {
    color: red; 
  }

  .search-container {
    display: flex;
  }

  .search-container form {
    margin-left: 1em;
  }

  .tech-list {
    list-style-type: none;
  }

  .topic-legend-color-block {
    background-color: #ffcc00;
    height: .9em;
    width: 1.46em;
    margin-right: 0.8em;
  }

  .topic-legend-item {
    display: flex;
    align-items: center;
    list-style-type: none;
    font-size: 0.80em;
  }

  .work-history h4, h5 {
    line-height: 0em;
  }

  .work-history h4 {
    margin-top: 2.8em;
  }
</style>
