export default {
  set_window_size({commit}, size) {
    if(size.length >= 2 && size[0] > 0 && size[1] > 0) {
      commit('set_window_size', size)
    }
  }
}
