<script>
import * as d3 from 'd3'
import * as _ from 'lodash'

import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'LiveDoc',
  computed: {
    ...mapGetters([
      'keywords',
      'pagination', 'project_count', 
      'project_results', 'project_sort_keys', 
      'projects_per_page'
    ]),
    right_pagination_arrow_is_visibile() {
      return this.pagination + this.projects_per_page <= this.project_count 
    }
  },
  data() {
    return {
      text: ''
    }
  },
  async mounted() {
    const icons = [
      'globe-europe', 'globe-africa',
      'globe-asia', 'globe-americas'
    ]
    
    setInterval(()=> {
      d3.selectAll('#globe')
        .attr('class', '')
        .classed(`fas fa-${icons[0]}`, true)
      icons.push(icons.shift())
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
      this.dec_pagination()
    }, 
    inc() {
      this.inc_pagination()
    },
    on_keyword_enter() {
      this.add_keywords(this.text)
      this.text = ''
    },
    projects_with_key(k) {
      return _.filter(this.project_results, {year: k})
    }
  }
}
</script>
<template>
  <md-app>
    <md-app-content class='content'>
      <div class='container'>
        <div class='header-container'>
          <h1>Jeremy von <i id='globe' class='fas fa-globe-europe'></i></h1>
            <div>
            <span> 
              <a href='https://gitlab.com/jeremyfromearth'><i class='fab fa-gitlab'></i></a>&nbsp;
              <a href='https://stackoverflow.com/users/230561/jeremyfromearth'><i class='fab fa-stack-overflow'></i></a>&nbsp;
              <a href='https://medium.com/@jeremy.from.earth'><i class='fab fa-medium'></i></a>&nbsp;
              <a href='http://twitter.com/jeremyfromearth'><i class='fab fa-twitter'></i></a>&nbsp;
              <a href='https://www.linkedin.com/in/jeremynealbrown/'><i class='fab fa-linkedin'></i></a>&nbsp;
              <a href='mailto:jeremynealbrown@gmail.com'><i class='fas fa-envelope'></i></a>&nbsp; 
            </span>
            </div>
        </div>
        <h2>Software Engineer</h2>
        <p>Hello, my name is Jeremy Brown. I am a Software Engineer living in Portland, Oregon U.S.A. and working remotely with collaborators from around the globe. I build applications with C++, Java, JavaScript and Python. I work on a wide array of software projects including data visualizations tools, chatbots and interactive experiences in immersive spaces. I'm currently most interested in working on projects that involve Deep Learning, Natural Langauge Processing and related fields.</p>
        <h3>Blog</h3>
        <p>Recent Articles</p>
        <div>
          <ul>
            <li>
              <a href='https://medium.com/@jeremy.from.earth/multiple-python-kernels-for-jupyter-lab-with-conda-c67e50de3aa3'>Multiple Python kernels for Jupyter Lab with Conda</a>
            </li>
            <li>
              <a href='https://medium.com/@jeremy.from.earth/using-dataclasses-firestore-to-replace-ndb-datastore-on-python-3-7-app-engine-e21199b58ef2'>Py3.7 Dataclasses + Cloud Firestore</a>
            </li>
            <li>
              <a href='https://medium.com/@jeremy.from.earth/google-cloud-storage-file-upload-with-flask-javascript-64ec5bc5c42d'>Google Cloud Storage File Upload with Flask & JavaScript</a>
            </li>
          </ul>
        </div>
        <h3>Stacks</h3>
        <div class='md-layout'>
          <div class='md-layout-item'>
            <h4>Python</h4>
            <ul class='tech-list'>
              <li>Flask</li><li>Keras</li><li>NumPy</li>
              <li>Pandas</li><li>Rasa</li><li>SpaCy</li><li>Tensorflow</li>
            </ul>
          </div>
          <div class='md-layout-item'>
            <h4>JavaScript</h4>
            <ul class='tech-list'>
              <li>D3</li><li>Electron</li><li>Express</li>
              <li>Node</li><li>NPM</li><li>SocketIO</li><li>Vue</li>
            </ul>
          </div>
          <div class='md-layout-item'>
            <h4>C++</h4>
            <ul class='tech-list'>
              <li>Box2D</li><li>Cinder</li><li>Kinect</li>
              <li>OSC</li><li>OpenGL</li><li>TUIO</li>
            </ul>
          </div>
          <div class='md-layout-item'>
            <h4>Misc</h4>
            <ul class='tech-list'>
              <li>Android</li><li>App Engine</li><li>Firebase</li>
              <li>Google Cloud</li><li>MongoDB</li><li>Processing</li><li>MySQL</li>
            </ul>
          </div>
        </div>
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
                <label>Keywords</label> 
                <md-input v-model='text'></md-input>
              </md-field>
            </form>
          </div>
        </div>
        <div class='project-container'>
          <div 
            class='pagination-controller' 
            @click='dec()'>
            <div class='pagination-arrow pagination-arrow-left'
              :style="{ opacity: pagination > 0 ? 1 : 0, 
                        marginTop: pagination > 0 ? '4rem': '2rem',
                        height: pagination > 0 ? '4rem' : 0 }" ><h4>&laquo;</h4></div>
          </div>
          <div>
            <div v-for='k in project_sort_keys' :key='k'>
              <div class='md-layout'>
                <div class='md-layout-item-5'><h4>{{ k }}</h4></div>
                <div class='md-layout-item'>
                  <div v-for='(p, i) in projects_with_key(k)' :key=i>
                    <h4>{{ p.title }}</h4>
                    <h5>{{ p.client }}</h5>
                    <p>{{ p.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div 
            class='pagination-controller' 
             @click='inc()'>
            <div class='pagination-arrow pagination-arrow-right'
            :style="{ opacity: right_pagination_arrow_is_visibile > 0 ? 1 : 0,
                      marginTop: right_pagination_arrow_is_visibile ? '4rem' : '2rem',
                      height: right_pagination_arrow_is_visibile ? '4em' : 0}"><h4>&raquo;</h4></div>
          </div>
        </div>
        <div class='work-history'>
          <h3>Work History</h3>
          <div class='md-layout'>
            <div>
              <h4>Software Engineer (Contract)</h4>
              <h5>January 2010 - Present</h5>
              <p>Aliquam at ornare nisi, venenatis lacinia mi. Nullam viverra ornare mauris. Curabitur sit amet tincidunt lectus. Etiam eu tortor blandit, rhoncus ante eget, suscipit elit. Proin viverra leo vel sem pellentesque egestas. Sed at mattis ipsum. Suspendisse ultrices sem nisi, pellentesque laoreet augue vestibulum et.</p>
              <h4>Software Engineer, Textwise</h4>
              <h5>August 2016 - September 2017</h5>
              <p>Aliquam at ornare nisi, venenatis lacinia mi. Nullam viverra ornare mauris. Curabitur sit amet tincidunt lectus. Etiam eu tortor blandit, rhoncus ante eget, suscipit elit. Proin viverra leo vel sem pellentesque egestas. Sed at mattis ipsum. Suspendisse ultrices sem nisi, pellentesque laoreet augue vestibulum et.</p>
              <h4>Creative Technologist, Upswell</h4>
              <h5>Jan 2014 - Jan 2015</h5>
              <p>Aliquam at ornare nisi, venenatis lacinia mi. Nullam viverra ornare mauris. Curabitur sit amet tincidunt lectus. Etiam eu tortor blandit, rhoncus ante eget, suscipit elit. Proin viverra leo vel sem pellentesque egestas. Sed at mattis ipsum. Suspendisse ultrices sem nisi, pellentesque laoreet augue vestibulum et.</p>
              <h4>Interactive Developer, Second Story Interactive</h4>
              <h5>July 2007 - Jan 2010</h5>
              <p>Aliquam at ornare nisi, venenatis lacinia mi. Nullam viverra ornare mauris. Curabitur sit amet tincidunt lectus. Etiam eu tortor blandit, rhoncus ante eget, suscipit elit. Proin viverra leo vel sem pellentesque egestas. Sed at mattis ipsum. Suspendisse ultrices sem nisi, pellentesque laoreet augue vestibulum et.</p>
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

  .keyword {
    border: 1px solid lightgrey;
    border-radius: 0.5em;
    margin-bottom: 0.25rem;
    margin-right: 0.25rem;
    padding: 0.32rem;
    user-select: none;
    white-space: nowrap;
  }

  .keyword-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }

  

  .md-layout {
    margin: 0 4em 0 4rem;
  }

  .md-layout-item-5 {
    padding-right: 2em;
  } 

  .remove-keyword-icon:hover {
    color: red; 
  }

  .pagination-arrow {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 0 2px 0 2px;
    margin-top: 4em;
    user-select: none;
    justify-content: center;
    transition: height 0.32s, margin-top 0.32s, opacity 0.16s;
  }

  .pagination-arrow-left:hover {
    color: red;
    border-right: 1px solid red;
  }

  .pagination-arrow-left {
    border-right: 1px solid lightgrey;
  }

  .pagination-arrow-right:hover {
    color: red;
    border-left: 1px solid red;
  }

  .pagination-arrow-right {
    border-left: 1px solid lightgrey;
  }

  .pagination-controller {
    height: 8rem;
    display: flex;
    flex-direction: column;
    transition: opacity 0.16s, height 0.32s;
  }

  .projects-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .project-container {
    display: flex;
    height: 32rem;
  }

  .search-container {
    display: flex;
  }

  .search-container form {
    margin-left: 1rem;
  }

  .tech-list {
    list-style-type: none;
  }

  .work-history h4, h5 {
    line-height: 0rem;
  }

  .work-history h4 {
    margin-top: 2.8rem;
  }
</style>
