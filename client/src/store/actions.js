import axios from 'axios'
import * as stemmer from 'stemmer'

export default {
  add_keywords({commit}, keywords) {
    let kws = 
      keywords
        .replace(/,/g, ' ')
        .split(' ')
        .filter(s => s != '' && s.length > 2)
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
      axios.get('/work.json'),
      axios.get('/stop.json')
    ]

    Promise.all(promises)
      .then(res => {
        const index = {}
        const lookup = {}
        const technologies = {}
        const projects = res[0].data['projects']
        const stopwords = res[1].data
        projects.forEach(x => {

          if(!x.published) return
          
          // gather up the tech lists
          if(x.tech) {
            Object.keys(x.tech).forEach(k => {
              if(!technologies[k]) technologies[k] = new Set()
              const techs = x.tech[k]
              techs.forEach(t => technologies[k].add(t))
            })
          }

          // create a list of keywords from the various fields
          let s = []
          lookup[x.id] = x
          if(x.client) s = s.concat(x.client.split(' '))
          if(x.collaborators) s = s.concat(x.collaborators.join(' ').split(' '))
          if(x.description) s = s.concat(x.description.split(' '))
          if(x.keywords) s = s.concat(x.keywords.join(' ').split(' '))
          if(x.location) s = s.concat(x.location.split(' '))
          if(x.title) s = s.concat(x.title.split(' '))
          if(x.year) s.push(''+x.year)

          // remove puncuation
          s = s.map(y => y.replace(/[^A-Za-z0-9\s]/g,'').replace(/\s{2,}/g, ' ').toLowerCase())

          // remove words in stop words
          s = s.filter(y => !stopwords.includes(y) && y.length > 2)

          // stem each term and map it to a set of documents
          s.forEach(z => {
            let stemmed = stemmer(z.trim())
            if(!index[stemmed]) index[stemmed] = new Set()
            index[stemmed].add(x['id'])
          })
        })

        Object.keys(technologies).forEach(k => {
          technologies[k] = Array.from(technologies[k]).sort()
        })

        commit('set_new_data', projects)
        commit('set_project_index', index)
        commit('set_project_lookup', lookup)
        commit('set_technologies', technologies)
      })
  },
  inc_pagination({commit}) {
    commit('inc_pagination') 
  },
  remove_keyword({commit}, kw) {
    commit('remove_keyword', kw) 
  },
  set_window_size({commit}, size) {
    if(size.length >= 2 && size[0] > 0 && size[1] > 0) {
      commit('set_window_size', size)
    }
  }
}
