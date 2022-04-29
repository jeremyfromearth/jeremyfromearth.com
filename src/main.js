import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'

import MobileDetect from 'mobile-detect'

import Project from './components/Project'
import TopicSwatch from './components/TopicSwatch'
import VimeoPlayer from './components/VimeoPlayer'

import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'

import '@/styles/main.sass'

const mobile_detect = new MobileDetect(window.navigator.userAgent)
Vue.prototype.$mobile_detect = mobile_detect
Vue.prototype.$is_mobile = mobile_detect.mobile() ? true : false
Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas, far, fab)

Vue.component('Project', Project)
Vue.component('TopicSwatch', TopicSwatch)
Vue.component('VimeoPlayer', VimeoPlayer)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
