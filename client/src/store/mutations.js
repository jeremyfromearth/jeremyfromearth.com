export default {
  clear_project_filters(state) {
    state.pagination = 0
  },
  dec_pagination(state) {
    if(state.pagination - 1 >= 0) state.pagination -= 1
  },
  inc_pagination(state) {
    if(state.pagination + 1 < state.projects.length - 3) state.pagination += 1
  },
  set_new_data(state, value) {
    state.projects = value['projects'].sort((a, b) => b['year'] - a['year'])
  }, 
  set_window_size(state, value) {
    state.window_size = value
  }, 
}
