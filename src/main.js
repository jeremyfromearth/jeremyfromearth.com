import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'


//import './assets/simple-grid.css'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.min.css'
import './assets/font-awesome.css'
import './assets/styles.css'

new Vue({
  router,
	store,
  render: h => h(App),
}).$mount('#app')
