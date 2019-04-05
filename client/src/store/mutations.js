import _ from 'lodash'

const search = state => {
  if(state.keywords.length) {
    let terms = state.keywords.reduce((acc, obj) => {
      acc.push(obj.term); 
      return acc
    }, [])
    let results = _.values(_.pick(state.index, terms))
    results = results.map(x => Array.from(x))
    results = _.intersection(...results)
    results = _.values(_.pick(state.lookup, results)).sort((a, b) => a.year - b.year).reverse()
    return results
  }
  return state.projects
}

export default {
  add_keywords(state, value) {
    state.pagination = 0
    state.keywords = _.uniqBy(state.keywords.concat(value), 'term')    
    state.project_search_results = search(state)
  },
  clear_project_filters(state) {
    state.pagination = 0
  },
  dec_pagination(state) {
    const n = state.projects_per_page
    if(state.pagination - n >= 0) {
      state.pagination -= n
    } else {
      state.pagination = 0
    }
  },
  inc_pagination(state) {
    const n = state.projects_per_page
    if(state.pagination + n < state.project_search_results.length) state.pagination += n
  },
  remove_keyword(state, value) {
    state.pagination = 0
    state.keywords = state.keywords.filter(kw => kw.term != value)
    state.project_search_results = search(state)
  },
  set_blog_posts(state, value) {
    state.blog_posts = value
  },
  set_links(state, value) {
    state.links = value
  },
  set_new_data(state, value) {
    state.projects = value.sort((a, b) => b['year'] - a['year'])
    state.project_search_results = state.projects
  },
  set_project_index(state, value) {
    state.index = value
  },
  set_project_lookup(state, value) {
    state.lookup = value
  },
  set_technologies(state, value) {
    state.technologies = value
  },
  set_text(state, value) {
    state.text = value
  },
  set_topics(state, value) {
    state.topics = value
  },
  set_window_size(state, value) {
    state.window_size = value
  }, 
}
