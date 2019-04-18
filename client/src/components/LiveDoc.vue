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
      'blog_posts', 'employment', 'gallery_id', 'keywords', 
      'links', 'pagination', 'projects_paged',
      'project_search_results', 'project_sort_keys', 
      'projects_per_page', 'technologies', 'text',
      'topics', 'topics_palette', 'window_size'
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
    }, 
    
  },
  data() {
    return {
      globe_index: 0,
      search_text: '',
      project_transition_name: 'project-group-inner-down',
      globe_icon_class: 'fas fa-globe-europe',
      project_container_height: null,
      no_match_class: 'fa fa-ghost no-match-icon',
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

    // Need to run this code at once
    // to set the height of the project_container
    setTimeout(()=> {
      this.on_project_transition()
    }, 1000)
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
      this.no_match_class = Math.random() > 0.5 ? 'fa fa-ghost no-match-icon' : 'fa fa-child no-match-icon'
      this.add_keywords(this.search_text)
      this.search_text = ''
    },
    on_project_transition() {
      if(this.$refs.project_transition) {
        const h1 = this.$refs.project_transition.$el.clientHeight
        const h2 = this.$refs.topic_legend.clientHeight + this.$refs.meta_description.clientHeight
        const h = Math.max(h1, h2)
        this.project_container_height = h
      }
    },
    projects_with_key(k) {
      return _.filter(this.projects_paged, {year: k})
    }, 
    stack_is_highlighted() {
      let highlight = false
      Object.keys(this.technologies).forEach(lang => {
        const tech = this.technologies[lang]
        tech.forEach(tech => {
          if(tech.highlight) highlight = true
        })
      })

      return highlight
    },
    topic_color(i) {
      return this.topics_palette[i % this.topics_palette.length]
    }
  }, 
  watch: {
    window_size: function() {
      this.on_project_transition()
    }
  }
}
</script>
<template>
  <md-app>
    <md-app-content class='content'>
      <div class='container'>
        <!-- Header --> 
        <div class='header-container'>
          <div class='header-title'><h1>J from <i id='globe' :class='globe_icon_class'></i></h1><span><h4>v2.0.0</h4></span></div>
          <div class='header-links'>
            <a v-for='link in links' 
               class='header-link' :title='link.title' 
               :href='link.url' :key='link.url'><i :class='link.icon'></i></a>
          </div>
        </div>

        <!-- Intro -->
        <h2>Software Engineer</h2>
        <p>{{text['intro']}}</p>

        <!-- Blog -->

        <div class='section-title'><h3>Blog</h3><a href='http://medium.com/@jeremy.from.earth'><i class='fa fa-link'></i></a></div>
        <p>Recent Articles</p>
        <div>
          <ul>
            <li v-for='(x, i) in blog_posts' :key='i'><a :href='x.url'>{{ x.title }}</a></li>
          </ul>
        </div>

        <!-- Stacks -->

        <h3>Stacks</h3>
        <div class='md-layout'>
          <div v-for='k in Object.keys(technologies).sort()' :key='k' class='md-layout-item'>
            <h4>{{ k }} </h4> 
            <ul class='md-layout-item'>
              <li v-for='t in technologies[k]' 
                class='tech-list-item' :key='t.label' 
                :style='{textShadow: t.highlight ? `0 0 4px ${t.color}`: null, 
                  opacity: stack_is_highlighted() ? t.highlight ? 1 : 0.4 : 1}'>{{ t.label }}</li>
            </ul>
          </div>
        </div>

        <!-- Projects -->

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
          <div ref='project_container' class='project-container' :style='{height: project_container_height + "px"}'>
            <div class='meta-container'>
              <div ref='meta_description' class='meta-description'><p>This is effectively an archive of every software development project I've worked on over the years. You can search through them using keywords. Hover over a project to learn more.</p></div>
              <div ref='topic_legend' class='topic-legend'>
                <h4>Disciplines</h4>
                  <div class='topic-legend-item' v-for='t in topics' :key='t.id'>
                    <div class='topic-legend-color-block' :style='{ backgroundColor: topics_palette[t.palette] }'/>
                      <div class='topic-legend-item-text' :style='{
                        textShadow: t.highlight ? `0 0 4px ${topics_palette[t.palette]}` : null
                      }'>{{t.title}}</div>
                  </div>
              </div>
            </div>
            <div class='project-outer'>
              <transition-group 
                v-on:afterEnter='on_project_transition' 
                ref='project_transition' 
                :name='project_transition_name' tag='div'>
                <div v-for='(k, i) in project_sort_keys' :key='k + "-" + i + "-" + pagination' class='md-layout'>
                  <div class='md-layout-item-5' :key='"year-"+k'><h4>{{ k }}</h4></div>
                  <div class='md-layout-item' :key='"project-"+k'>
                    <Project v-for='(p, j) in projects_with_key(k)' :data='p' :show_delay='i * 8' :key='j'/>
                  </div>
                </div>
              </transition-group>
            </div>
            <div class='pagination-controller-container'>
              <div class='pagination-controller' @click='dec()'>
                <div class='pagination-arrow pagination-arrow-up'
                  :style="{opacity: pagination > 0 ? 1 : 0, 
                           marginTop: pagination > 0 ? '4em': '4em',
                           height: pagination > 0 ? '4em' : '2em'}" >
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

        <!-- No Matching Projects -->

        <div v-else class='no-matching-projects-message'>
          <i :class='no_match_class'></i>
          <p>No projects matched the keywords provided</p>
        </div>

        <!-- Employment History -->

        <div class='work-history'>
          <h3>Employment History</h3>
          <div class='md-layout'>
            <div v-for='(e, i) in employment' :key='i'> 
              <h4>{{e.role}}</h4>
              <h5>{{e.timespan}}</h5>
              <ul>
                <li v-for='(d, j) in e.descriptions' :key='j'>{{d}}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Collaborators -->

        <h3>Collaborators</h3>
        <div class='md-layout'>
          <div class='md-layout-item'>
            <p>Britelite Immersive</p>
            <p>Cibo Design</p>
            <p>C&amp;G Partners</p>
            <p>The History Factory</p>
            <p>Instrument</p>
          </div>
          <div class='md-layout-item'>
            <p>Made Clear</p>
            <p>The Makers</p>
            <p>Northern Light</p>
            <p>Potion Design</p>
            <p>Renate</p>
          </div>
          <div class='md-layout-item'>
            <p>Second Story</p>
            <p>Textwise</p>
            <p>Terra Incognita</p>
            <p>Upswell</p>
            <p>Wieden+Kennedy</p>
          </div>
        </div>

        <!-- Ethos -->

        <h3>Ethos</h3>
        <ul>
          <li>Agile FTW.</li>
          <li>Modules over monoliths.</li>
          <li>People, animals and the planet first, then software.</li>
          <li>Rolling your own is fun. Rolling for others requires empathy.</li>
          <li>The terrain between simplicity and complexity is smooth and continuous.</li>
        </ul>
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
    padding: 16px;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 0;
    transition: 0.5s -webkit-filter linear;
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

  .header-links i {
    margin-left: 1.2em; 
  }

  .header-title {
    display: flex;
    align-items: baseline;
  }

  .header-title h4 {
    margin-left: 0.4em;
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

  .meta-container {
    display: flex;
    flex-grow: 0;
    flex-shrink: 3;
    flex-direction: column;
    justify-content: space-between;
  }

  .meta-description {
    font-size: 0.8em;
    font-style: italic;
    flex-grow: 0;
    padding:  0 1em;
    border-left: 1px solid #ccc;
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

  @keyframes jump {
    0% {
      transform: translate(0, 0);
    }
    30% {
      transform: translate(0, -10px);
    }
    100% {
      transform: translate(0, 0px);
    }
  }

  .no-match-icon {
     animation: jump .8s infinite;
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
    justify-content: space-between;
    padding: 0 1.4em 0 1.4em;
    overflow: hidden;
    transition: height 0.8s;
  }

  .project-outer {
    flex-grow: 1;
    width: 100%;
  }

  .project-container-outer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .project-group-inner-down-enter,
  .project-group-inner-up-enter {
    display: none;
  }
  
  .project-group-inner-down-enter,
  .project-group-inner-down-leave-to,
  .project-group-inner-up-enter,
  .project-group-inner-up-leave-to {
    opacity: 0;
  }

  .project-group-inner-down-enter {
    transform: translate(0, 4px);
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
    transition: all .3s;
    display: flex;
  }

  .project-group-inner-down-enter-active, 
  .project-group-inner-up-enter-active {
    transition-delay: .35s;
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

  .section-title {
    display: flex;
    align-items: baseline;
  }

  .section-title i {
    margin-left: 0.8em;
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

  .tech-list-item {
    white-space: nowrap;
    transition: text-shadow 1.0s, opacity 0.2s;
  }

  .topic-legend {
    align-self: flex-end;
    background-color: #f8f8f8;
    padding: 0 1em 1em;
    border-radius: 0.4em;
  }

  .topic-legend-color-block {
    background-color: #ffcc00;
    height: .9em;
    width: 1.46em;
    margin-right: 0.8em;
    border-radius: 0.2em;
  }

  .topic-legend-item {
    display: flex;
    align-items: center;
    list-style-type: none;
    font-size: 0.80em;
    white-space: nowrap;
  }

  .topic-legend-item-text {
    transition: text-shadow .4s;
    text-shadow: 0;
  }

  /*
  .topic-legend-item-text.highlight {
    text-decoration: underline;
    text-shadow: 0 0 8px #ffffff;
  }
  */

  .work-history h4, h5 {
    line-height: 0em;
  }

  .work-history h4 {
    margin-top: 2.8em;
  }
</style>
