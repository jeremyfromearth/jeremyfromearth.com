<script>
import * as _ from 'lodash'
import {init_firebase} from '@/utils/firebase'

import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'LiveDoc',
  computed: {
    ...mapGetters([
      'blog_posts',
      'education',
      'employment',
      'gallery_id',
      'keywords',
      'links',
      'pagination',
      'projects_paged',
      'project_search_results',
      'project_sort_keys',
      'projects_per_page',
      'tech_ordering',
      'technologies',
      'text',
      'topics',
      'topics_palette',
      'window_size'
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
      no_match_class: 'fa fa-ghost no-match-icon',
      project_container_height: null,
      project_transition_name: 'project-group-inner-down',
      search_text: ''
    }
  },
  async mounted() {


    init_firebase()
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
      'get_data',
      'inc_pagination',
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
      this.no_match_class =
        Math.random() > 0.5 ?
          'fa-solid fa-ghost' : 'fa-solid fa-child-reaching'
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
<v-container
  class='main-container'>

  <!-- Intro -->
  <v-row
    class='mt-4'>
    <v-col
      cols='12'>
      <div>
        {{text['intro']}}
      </div>
    </v-col>
  </v-row>

  <!-- Blog -->
  <v-row>
    <v-col>
      <div
        class='title font-weight-bold'>
        Blog
      </div>
      <div
        class='subtitle'>
        Recent Articles
      </div>
      <div>
        <ul>
          <li
            v-for='(x, i) in blog_posts'
            :key='i'>
            <a :href='x.url'>{{ x.title }}</a>
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>

  <!-- Projects -->
  <v-row>
    <v-col>
      <div
        class='title font-weight-bold'>
        Projects
      </div>
    </v-col>
    <v-col
      class='d-flex align-center justify-end'
      cols='6'>
      <v-chip
        v-for='kw in keywords'
        :key='kw.term'
        @click:close='remove_keyword(kw.term)'
        class='mr-1'
        close
        outlined>
        {{kw.original}}
      </v-chip>
    </v-col>
    <v-col
      cols='3'>
      <v-form
        id='search'
        v-on:submit.prevent='on_keyword_enter'
        >
        <v-text-field
          label='Search'
          v-model='search_text'
          dense
          hide-details
          outlined/>
      </v-form>
    </v-col>
  </v-row>

  <div
    v-if='projects_paged.length'
    class='d-flex flex-column align-center'>
    <div
      :style='{
        height: project_container_height + `px`
      }'
      class='project-container d-flex justify-space-around flex-nowrap px-6'>
      <div
        class='meta-container d-flex flex-grow-0 flex-column justify-space-between'>
        <i
          ref='meta_description'
          class='meta-description px-2'>
          {{text['project_sidebar']}}
        </i>
        <div ref='topic_legend'
          class='topic-legend pa-4'>
          <div
            v-for='t in topics'
            :key='t.id'
            @click='add_keywords(t.title); on_project_transition()'
            class='topic-legend-item d-flex align-center overline'>
            <div
              :style='{backgroundColor: topics_palette[t.palette]}'
              class='topic-legend-color-block'/>
              <div
                :style='{
                  textShadow: t.highlight ? `0 0 4px ${topics_palette[t.palette]}` : null
                }'
                class='topic-legend-item-text' >
                {{t.title}}
              </div>
          </div>
        </div>
      </div>
      <div
        class='flex-grow-1'>
        <transition-group
          ref='project_transition'
          v-on:afterEnter='on_project_transition'
          :name='project_transition_name'
          tag='div'>
          <div
            v-for='(k, i) in project_sort_keys'
            :key='k + "-" + i + "-" + pagination'
            class='d-flex ma-0 px-2'>
            <div
              class='font-weight-bold'>
              {{k}}
            </div>
            <div>
              <Project
                v-for='(p, j) in projects_with_key(k)'
                :key='j'
                :data='p'
                :show_delay='i * 8'/>
            </div>
          </div>
        </transition-group>
      </div>
      <div
        class='d-flex flex-column flex-grow-0'>
        <div
          @click='dec()'
          class='pagination-controller'>
          <div
            class='pagination-arrow pagination-arrow-up d-flex flex-column justify-center mt-8'
            :style='{
                opacity: pagination > 0 ? 1 : 0,
                marginTop: pagination > 0 ? `4em`: `4em`,
                height: pagination > 0 ? `4em` : `2em`
              }'>
            <font-awesome-icon
              icon='fa-solid fa-angles-up'/>
          </div>
        </div>
        <div
          @click='inc()'
          class='pagination-controller'>
          <div
            class='pagination-arrow pagination-arrow-down d-flex flex-column justify-center mb-8'
            :style='{
              opacity: down_pagination_arrow_is_visibile > 0 ? 1 : 0,
              marginTop: pagination == 0 ? `2em` :
              down_pagination_arrow_is_visibile ? `4em` : `6em`,
              height: down_pagination_arrow_is_visibile ? `4em` : `2em`
            }'>
            <font-awesome-icon
              icon='fa-solid fa-angles-down'/>
          </div>
        </div>
      </div>
    </div>
    <div
      class='pagination-detail mt-12 mb-4'>
      {{pagination_text}}
    </div>
  </div>

  <!-- No Matching Projects -->
  <div
    v-else
    class='
      d-flex flex-grow-1 flex-column align-center
      justify-center no-matching-projects-message'>
    <font-awesome-icon
      :icon='no_match_class'
      class='no-match-icon'/>
    <p>No projects matched the keywords provided</p>
  </div>

  <!-- Stacks -->
  <v-row>
    <v-col>
      <div
        class='title font-weight-bold'>
        Stacks
      </div>
    </v-col>
  </v-row>

  <v-row>
    <v-col
      v-for='k in tech_ordering'
      :key='k'>
      <div
        class='d-flex flex-column'>
        <div
          class='subtitle font-weight-bold'>
          {{k}}
        </div>
        <ul>
          <li
            v-for='t in technologies[k]'
            class='tech-list-item'
            :key='t.label'
            :style='{
              textShadow: t.highlight ? `0 0 4px ${t.color}`: null,
              opacity: stack_is_highlighted() ? t.highlight ? 1 : 0.2 : 1
            }'>
            {{ t.label }}
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>

  <!-- Employment -->
  <v-row>
    <v-col>
      <div
        class='title font-weight-bold'>
        Employment History
      </div>
    </v-col>
  </v-row>

  <v-row
    v-for='(e, i) in employment'
    :key='i'
    class='mb-8'>
    <v-col>
      <h4>{{e.title}}</h4>
      <h5>{{e.timespan}}</h5>
      <div class='overline'>{{e.location}}</div>
      <ul>
        <li v-for='(d, j) in e.descriptions' :key='j'>{{d}}</li>
      </ul>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <div
        class='title font-weight-bold'>
        Collaborators
      </div>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <p>Britelite Immersive</p>
      <p>Cibo Design</p>
      <p>C&amp;G Partners</p>
      <p>The History Factory</p>
      <p>Instrument</p>
    </v-col>
    <v-col>
      <p>Made Clear</p>
      <p>The Makers</p>
      <p>Northern Light</p>
      <p>Potion Design</p>
      <p>Renate</p>
    </v-col>
    <v-col>
      <p>Second Story</p>
      <p>Textwise</p>
      <p>Terra Incognita</p>
      <p>Upswell</p>
      <p>Wieden+Kennedy</p>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <div
        class='title font-weight-bold'>
        Education
      </div>
    </v-col>
  </v-row>

  <v-row
    v-for='(e, i) in education'
    :key='`education-${i}`'>
    <v-col>
      <h4>{{e.title}} &mdash; {{e.school}}</h4>
      <h5>{{e.date}}</h5>
      <p>{{e.description ? e.description : "No description"}}</p>
      <a :href='e.url'>{{e.url_text}}</a>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <div
        class='title font-weight-bold'>
        Ethos
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <ul>
        <li>Agile FTW</li>
        <li>Modules over monoliths</li>
        <li>People, animals and the planet first, then software</li>
      </ul>
    </v-col>
  </v-row>
</v-container>
</template>

<style lang='sass' scoped>
.main-container
  max-width: 1024px

.meta-container
  flex: 0 1 0

.meta-description
  border-left: 1px solid #ccc

.no-match-icon
  animation: jump .8s infinite
  transform-origin: bottom

.no-matching-projects-message
  height: 32em

.pagination-arrow
  cursor: pointer
  padding: 0.0em 1.0em 0.0em 1.0em
  user-select: none
  transition: height 0.32s, margin-top 0.32s, opacity 0.16s, color 0.32s

.pagination-arrow-up
  border-bottom: 1px solid lightgrey
  padding: 0px 1.5em 0 1.5em

  &:hover
    border-bottom: 1px solid #5bbcfb
    color: #5bbcfb

.pagination-arrow-down
  border-top: 1px solid lightgrey
  padding: 0px 1.5em 0 1.5em

  &:hover
    border-top: 1px solid #5bbcfb
    color: #5bbcfb

.pagination-controller
  transition: opacity 0.16s, height 0.32s

.pagination-detail
  border-top: 1px solid lightgrey
  font-size: 0.8em
  font-weight: 800
  padding: 1.0em 6em
  user-select: none

.project-container
  overflow: hidden
  transition: height 0.4s

.project-group-inner-down-enter, .project-group-inner-up-enter
  display: none

.project-group-inner-down-enter,
.project-group-inner-down-leave-to,
.project-group-inner-up-enter,
.project-group-inner-up-leave-to
  opacity: 0

.project-group-inner-down-enter
  transform: translate(0, 4px)

.project-group-inner-down-leave-to
  transform: translate(0, -8px)

.project-group-inner-down-enter-to,
.project-group-inner-up-enter-to
  opacity: 1

.project-group-inner-down-enter-active,
.project-group-inner-down-leave-active,
.project-group-inner-up-enter-active,
.project-group-inner-up-leave-active
  transition: all .2s
  display: flex

.project-group-inner-down-enter-active,
.project-group-inner-up-enter-active
  transition-delay: .2s

.project-group-inner-up-enter
  transform: translate(0, -4px)

.project-group-inner-up-leave-to
  transform: translate(0, 8px)

.remove-keyword-icon
  &:hover
    color: #5bbcfb

.tech-list-item
  transition: text-shadow 1.0s, opacity 0.8s ease-in
  white-space: nowrap

.topic-legend-color-block
  background-color: #ffcc00
  border-radius: 0.2em
  height: 1em
  margin-right: 0.8em
  width: 1.46em

.topic-legend-item
  cursor: pointer
  font-size: 0.75em !important
  letter-spacing: 0.1em !important
  line-height: 1.7em
  list-style-type: none
  white-space: nowrap

  &:hover
    text-decoration: underline

.topic-legend-item-text
  text-shadow: 0
  transition: text-shadow .4s

@keyframes jump
  0%
    transform: translate(0, 0)
  30%
    transform: translate(0, -10px) scale(1.2)
  100%
    transform: translate(0, 0px)
</style>
