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
    ...mapGetters(['pagination', 'project_results', 'project_sort_keys']),
    
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
    ...mapActions(['clear_project_filters', 'dec_pagination', 'inc_pagination', 'get_data']),
    projects_with_key(k) {
      return _.filter(this.project_results, {year: k})
    },
    some_method() {
      console.log('some_method()')
    }
  }, 
  props: {
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
            <ul>
              <li>Flask</li><li>Keras</li><li>NumPy</li>
              <li>Pandas</li><li>Rasa</li><li>SpaCy</li><li>Tensorflow</li>
            </ul>
          </div>
          <div class='md-layout-item'>
            <h4>JavaScript</h4>
            <ul>
              <li>D3</li><li>Electron</li><li>Express</li>
              <li>Node</li><li>NPM</li><li>SocketIO</li><li>Vue</li>
            </ul>
          </div>
          <div class='md-layout-item'>
            <h4>C++</h4>
            <ul>
              <li>Box2D</li><li>Cinder</li><li>Kinect</li>
              <li>OSC</li><li>OpenGL</li><li>TUIO</li>
            </ul>
          </div>
          <div class='md-layout-item'>
            <h4>Misc</h4>
            <ul>
              <li>Android</li><li>App Engine</li><li>Firebase</li>
              <li>Google Cloud</li><li>MongoDB</li><li>Processing</li><li>MySQL</li>
            </ul>
          </div>
        </div>

        <!--<p>&raquo; Also, I seriously enjoy writing code with <a href="https://twitter.com/search?q=%23weekenddesktop&src=typd">VIM</a></p>-->
        
        <div class='projects-toolbar'>
          <h3>Projects</h3>
          <form>
            <md-field>
              <label>Keywords</label> 
              <md-input name='keywordsh' id='keywords-input'></md-input>
            </md-field>
          </form>
        </div>
        <!-- Iterate through currently filtered projects -->
        <!-- container with project | paginiation arrow -->
        <div class='project-container'>
          <div class='pagination-controller' v-if='pagination > 0'>
            <div class='pagination-arrow pagination-arrow-left'><h4>&laquo;</h4></div>
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
            <!--
            <div>
              <div class='md-layout'>
                <h4 class='md-layout-item-5'>2018</h4>
                <div class='md-layout-item'>
                    <div>
                      <h4>Storycrafter Canvas</h4>
                      <h5>Terra Incognita</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit eros, dapibus vitae odio sit amet, tincidunt cursus turpis. Phasellus vitae suscipit lorem, ut gravida ligula. Duis at dui facilisis, gravida purus ac, maximus nibh. Etiam justo velit, pharetra eu urna sed, molestie tincidunt sapien. Donec maximus est et tristique lobortis. Vivamus sit amet sapien eu sapien eleifend maximus eu in odio.</p>
                    </div>
                    <div>
                      <h4>World of A.E.P.</h4>
                      <h5>American Electric Power</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit eros, dapibus vitae odio sit amet, tincidunt cursus turpis. Phasellus vitae suscipit lorem, ut gravida ligula. Duis at dui facilisis, gravida purus ac, maximus nibh. Etiam justo velit, pharetra eu urna sed, molestie tincidunt sapien. Donec maximus est et tristique lobortis. Vivamus sit amet sapien eu sapien eleifend maximus eu in odio.</p>
                    </div>
                </div>
              </div>
            </div>
            <div>
              <div class='md-layout'>
                <h4 class='md-layout-item-5'>2016</h4>
                <div class='md-layout-item'>
                  <div>
                    <h4>Story Screens Render Engine</h4>
                    <h5>San Fransisco Museum of Modern Art</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit eros, dapibus vitae odio sit amet, tincidunt cursus turpis. Phasellus vitae suscipit lorem, ut gravida ligula. Duis at dui facilisis, gravida purus ac, maximus nibh. Etiam justo velit, pharetra eu urna sed, molestie tincidunt sapien. Donec maximus est et tristique lobortis. Vivamus sit amet sapien eu sapien eleifend maximus eu in odio.</p>
                  </div>
                </div>
              </div>
            </div>
            -->
          </div>
          <div class='pagination-controller' :click='some_method()'>
            <div class='pagination-arrow pagination-arrow-right'><h4>&raquo;</h4></div>
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
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .md-layout {
    margin: 0 4em 0 4rem;
  }

  .md-layout-item-5 {
    padding-right: 2em;
  } 

  .pagination-arrow {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 15%;
    justify-content: center;
    padding: 0 2px 0 2px;
    user-select: none;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  

  .projects-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .project-container {
    display: flex;
  }
</style>
