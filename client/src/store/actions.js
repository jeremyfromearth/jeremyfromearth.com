import axios from 'axios'

export default {
  set_window_size({commit}, size) {
    if(size.length >= 2 && size[0] > 0 && size[1] > 0) {
      commit('set_window_size', size)
    }
  }, 
  get_worx({commit}) {
    axios.get('/worx.json')
      .then(res => {
        let worx = res.data
        worx = worx.sort((a,b)=> a.year - b.year)
        commit('set_worx', worx)
      })
      .catch(err => {
        console.log(err) 
      })
  }
}
