import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/index.less'
import { relativeTime } from '@/utils/date-time.js'
import Vant, { Lazyload } from 'vant'
Vue.filter('relativeTime', relativeTime)
Vue.use(Vant)
Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
