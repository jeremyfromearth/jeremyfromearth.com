import axios from 'axios'
// import _ from 'lodash'
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

    return Promise.all(promises)
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

        // map topics to their ids and init props
        const topic_idx = {}
        const topics = res[0].data['topics']

        topics.forEach(t => {
          t.highlight = false
          t.selected = false
          topic_idx[t.id] = t
        })

        // map each project to a list of keywords derived from various fields
        projects.forEach(proj => {

          // map each project to it's text id
          lookup[proj.id] = proj

          // set some state vars
          proj.expanded = false

          // a list of keywords
          let kws = []
          if(proj.topics) {
            Object.entries(proj.topics).forEach(([topic, techs]) => {
              const topic_kw = topic_idx[topic].title.toLowerCase().split(' ')
              kws = kws.concat(topic_kw)
              kws = kws.concat(techs)
              techs.forEach(t => {
                technologies[t] = {label: t, highlight: false, color: null}
              })
            })
          }

          if(proj.client) kws = kws.concat(proj.client.split(' '))
          if(proj.collaborators) kws = kws.concat(proj.collaborators.join(' ').split(' '))
          if(proj.description) kws = kws.concat(proj.description.split(' '))
          if(proj.title) kws = kws.concat(proj.title.split(' '))
          if(proj.tldr) kws = kws.concat(proj.tldr.split(' '))
          if(proj.keywords) kws = kws.concat(proj.keywords.join(' ').split(' '))
          if(proj.location) kws = kws.concat(proj.location.split(' '))
          if(proj.title) kws = kws.concat(proj.title.split(' '))
          if(proj.year) kws.push(''+ proj.year)

          // remove puncuation
          kws = kws.map(y => y.replace(/[^A-Za-z0-9+\s]/g,'').replace(/\s{2,}/g, ' ').toLowerCase())

          // remove words in stop words
          kws = kws.filter(y => !stopwords.includes(y) && y.length >= 2)

          // stem each term and map it to a set of documents
          kws.forEach(z => {
            let stemmed = stemmer(z.trim())
            if(!index[stemmed]) index[stemmed] = new Set()
            index[stemmed].add(proj['id'])
          })
        })

        // commit the project and tech data to store
        commit('set_links', links)
        commit('set_new_data', projects)
        commit('set_project_index', index)
        commit('set_project_lookup', lookup)
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
  set_highlights({commit}, {project_id, do_highlight}) {
    commit('set_highlights', {project_id, do_highlight})
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
