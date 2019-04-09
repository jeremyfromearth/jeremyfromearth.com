import axios from 'axios'
import * as stemmer from 'stemmer'

export default {
  add_keywords({commit}, keywords) {
    let kws = 
      keywords
        .replace(/,/g, ' ')
        .split(' ')
        .filter(s => s != '' && s.length > 1)
        .map(s => {
          return {original: s.trim(), term: stemmer(s.trim().toLowerCase())}
        })

    commit('add_keywords', kws) 
  },
  clear_project_filters({commit}) {
    commit('clear_project_filters') 
  },
  dec_pagination({commit}) {
    commit('dec_pagination') 
  },
  async get_data({commit}) {
		let promises = [
      axios.get('/site.json'),
      axios.get('/stop.json')
    ]

    Promise.all(promises)
      .then(res => {
        // --------------------------------------------------------
        //
        // Links
        //
        // --------------------------------------------------------
        const links = res[0].data['links']

        // --------------------------------------------------------
        //
        // Project Indexing / Technology Gathering
        //
        // --------------------------------------------------------

        const index = {}
        const lookup = {}
        const projects = res[0].data['projects']
        const stopwords = res[1].data
        const technologies = {}
        const text = res[0].data['text']
        let topics = new Set()

        projects.forEach(proj => {

          if(!proj.published) return
          
          // gather up the tech lists
          if(proj.tech) {
            Object.keys(proj.tech).forEach(k => {
              if(!technologies[k]) technologies[k] = new Set()
              const techs = proj.tech[k]
              techs.forEach(t => technologies[k].add(t))
            })
          }

          // add topics
          if(proj.topics) proj.topics.forEach(topic => topics.add(topic))

          // create a list of keywords from the various fields
          let s = []
          lookup[proj.id] = proj
          if(proj.client) s = s.concat(proj.client.split(' '))
          if(proj.collaborators) s = s.concat(proj.collaborators.join(' ').split(' '))
          if(proj.description) s = s.concat(proj.description.split(' '))
          if(proj.title) s = s.concat(proj.title.split(' '))
          if(proj.tldr) s = s.concat(proj.tldr.split(' '))
          if(proj.keywords) s = s.concat(proj.keywords.join(' ').split(' '))
          if(proj.location) s = s.concat(proj.location.split(' '))
          if(proj.title) s = s.concat(proj.title.split(' '))
          if(proj.year) s.push(''+ proj.year)

          // remove puncuation
          s = s.map(y => y.replace(/[^A-Za-z0-9\s]/g,'').replace(/\s{2,}/g, ' ').toLowerCase())

          // remove words in stop words
          s = s.filter(y => !stopwords.includes(y) && y.length > 2)

          // stem each term and map it to a set of documents
          s.forEach(z => {
            let stemmed = stemmer(z.trim())
            if(!index[stemmed]) index[stemmed] = new Set()
            index[stemmed].add(proj['id'])
          })
        })
        
        // Convert technology sets to sorted arrays
        Object.keys(technologies).forEach(k => {
          technologies[k] = Array.from(technologies[k]).sort()
        })

        // Create an index of id to topic
        const topic_index = {}
        const topic_json = res[0].data['topics']
        topic_json.forEach((x, i) => topic_index[x] = i)
        topics = Array.from(topics).sort((a, b) => {
          return topic_index[a] - topic_index[b] 
        })

        // commit the project and tech data to store
        commit('set_links', links)
        commit('set_new_data', projects)
        commit('set_project_index', index)
        commit('set_project_lookup', lookup)
        commit('set_technologies', technologies)
        commit('set_text', text)
        commit('set_topics', topics)

        // --------------------------------------------------------
        //
        // Blog
        //
        // --------------------------------------------------------
      
        const blog = res[0].data['blog']
        commit('set_blog_posts', blog)
      })
  },
  inc_pagination({commit}) {
    commit('inc_pagination') 
  },
  remove_keyword({commit}, kw) {
    commit('remove_keyword', kw) 
  },
  set_window_size({commit}, size) {
    if(size.length >= 2 && !isNaN(size[0]) > 0 && !isNaN(size[1]) > 0) {
      commit('set_window_size', size)
    }
  }
}