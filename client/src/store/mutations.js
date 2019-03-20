export default {
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
    if(state.pagination + n < state.projects.length) state.pagination += n
  },
  set_new_data(state, value) {
    state.projects = value['projects'].sort((a, b) => b['year'] - a['year'])
  }, 
  set_window_size(state, value) {
    state.window_size = value
  }, 
}
