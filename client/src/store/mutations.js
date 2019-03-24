import _ from 'lodash'

export default {
  add_keywords(state, value) {
    state.pagination = 0
    state.keywords = _.uniqBy(state.keywords.concat(value), 'term')    
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
  inc_pagination(state, value) {
    // TODO: Need to pass in the new value here, rather than calculate it
    const n = state.projects_per_page
    if(state.pagination + n < state.projects.length) state.pagination += n
  },
  remove_keyword(state, value) {
    state.keywords = state.keywords.filter(kw => kw.term != value)
  },
  set_new_data(state, value) {
    state.projects = value.sort((a, b) => b['year'] - a['year'])
  },
  set_project_index(state, value) {
    state.index = value
  },
  set_project_lookup(state, value) {
    state.lookup = value
  },
  set_window_size(state, value) {
    state.window_size = value
  }, 
}
