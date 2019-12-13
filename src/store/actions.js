import axios from 'axios'
import _ from 'lodash'
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
        const projects =
          res[0].data['projects'].filter(p => p.published)
        const stopwords = res[1].data
        const technologies = {}
        const text = res[0].data['text']

        // map topics to their ids and init  props
        const topic_idx = {}
        const topics = res[0].data['topics']

        topics.forEach(t => {
          t.highlight = false
          t.selected = false
          topic_idx[t.id] = t
        })

        // map each project to a list of keywords derived from various fields
        projects.forEach(proj => {

          // gather up the tech lists
          let tech = new Set()
          let languages = new Set()

          // map each project to it's text id
          lookup[proj.id] = proj

          // set some state vars
          proj.expanded = false

          // a list of keywords
          let s = Array.from(tech).concat(Array.from(languages))

          if(proj.topics) {
            Object.keys(proj.topics).forEach(topic => {
              const topic_kw = topic_idx[topic].title.toLowerCase().split(' ')
              s = s.concat(topic_kw)
              _.forIn(proj.topics[topic], (lang, key) => {
                s.push(topic)
                s.push(key)
                s = s.concat(lang)
                if(!technologies[key]) technologies[key] = new Set()
                lang.forEach(x => {
                  s.push(x)
                  tech.add(x)
                  technologies[key].add(x)
                })
              })
            })
          }

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
          s = s.map(y => y.replace(/[^A-Za-z0-9+\s]/g,'').replace(/\s{2,}/g, ' ').toLowerCase())

          // remove words in stop words
          s = s.filter(y => !stopwords.includes(y) && y.length >= 2)

          // console.log(proj['id'], s)

          // stem each term and map it to a set of documents
          s.forEach(z => {
            let stemmed = stemmer(z.trim())
            if(!index[stemmed]) index[stemmed] = new Set()
            index[stemmed].add(proj['id'])
          })
        })

        // Convert technology sets to sorted arrays
        Object.keys(technologies).forEach(k => {
          technologies[k] = Array.from(technologies[k]).map(x => {
            return {label: x, highlight: false, color: null}
          }).sort((a, b)=> {
            return a.label < b.label ? -1 : 1
          })
        })

        // commit the project and tech data to store
        commit('set_links', links)
        commit('set_new_data', projects)
        commit('set_project_index', index)
        commit('set_project_lookup', lookup)
        commit('set_tech_ordering', res[0].data['tech_ordering'])
        commit('set_technologies', technologies)
        commit('set_text', text)
        commit('set_topics', topics)
        commit('set_topic_index', topic_idx)

        // --------------------------------------------------------
        //
        // Blog
        //
        // --------------------------------------------------------

        const blog = res[0].data['blog']
        commit('set_blog_posts', blog)

        // --------------------------------------------------------
        //
        // Employment
        //
        // --------------------------------------------------------

        const employment = res[0].data['employment']
        commit('set_employment', employment)

        // --------------------------------------------------------
        //
        // Education
        //
        // --------------------------------------------------------

        const education = res[0].data['education']
        commit('set_education', education)

        // --------------------------------------------------------
        //
        // Initialize display of only featured projects
        //
        // --------------------------------------------------------
        // dispatch('add_keywords', 'featured')
      })
  },
  inc_pagination({commit}) {
    commit('inc_pagination')
  },
  remove_keyword({commit}, kw) {
    commit('remove_keyword', kw)
  },
  set_gallery_id({commit}, id) {
    commit('set_gallery_id', id)
  },
  set_video_id({commit}, id) {
    commit('set_video_id', id)
  },
  set_window_size({commit}, size) {
    if(size.length >= 2 && !isNaN(size[0]) > 0 && !isNaN(size[1]) > 0) {
      commit('set_window_size', size)
    }
  }
}
