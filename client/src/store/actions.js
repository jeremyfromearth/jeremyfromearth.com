import axios from 'axios'

export default {
  set_window_size({commit}, size) {
    if(size.length >= 2 && size[0] > 0 && size[1] > 0) {
      commit('set_window_size', size)
    }
  }, 
  get_work({commit}) {
    axios.get('/work.json')
      .then(res => {
        console.log(res.data)
        commit('set_worx', res.data)
      })
      .catch(err => {
        console.log(err) 
      })
  }
}
