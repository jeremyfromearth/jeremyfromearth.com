import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import MobileDetect from 'mobile-detect'

import Gallery from './components/Gallery'
import Project from './components/Project'
import TopicSwatch from './components/TopicSwatch'
import VimeoPlayer from './components/VimeoPlayer'

import './assets/css/font-awesome.css'
import './assets/css/styles.css'

Vue.config.productionTip = false;
Vue.prototype.$is_mobile = new MobileDetect(window.navigator.userAgent).mobile() ? true : false
library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('Gallery', Gallery)
Vue.component('Project', Project)
Vue.component('TopicSwatch', TopicSwatch)
Vue.component('VimeoPlayer', VimeoPlayer)

new Vue({
  router,
	store,
  render: h => h(App),
}).$mount('#app')
