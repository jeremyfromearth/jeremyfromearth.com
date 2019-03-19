import axios from 'axios'

export default {
  clear_project_filters(obj) {
    obj.commit('clear_project_filters') 
  },
  dec_pagination({commit}) {
    commit('dec_pagination') 
  },
  async get_data({commit}) {
    await axios.get('/work.json')
      .then(res => {
        let data = res.data
        commit('set_new_data', data)
      })
      .catch(err => {
        console.log(err) 
      })
  },
  inc_pagination({commit}) {
    commit('inc_pagination') 
  },
  set_window_size({commit}, size) {
    if(size.length >= 2 && size[0] > 0 && size[1] > 0) {
      commit('set_window_size', size)
    }
  }
}
