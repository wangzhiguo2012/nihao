import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/index.less'
import { relativeTime } from '@/utils/date-time.js'
import {
  Button,
  Tabbar,
  TabbarItem,
  Form,
  Field,
  NavBar,
  Toast,
  Tabs,
  Tab,
  List,
  Lazyload,
  CellGroup,
  Cell,
  Icon,
  Grid,
  GridItem,
  Popup,
  Row,
  Col,
  Tag,
  Image,
  Divider,
  PullRefresh,
  ActionSheet,
  Loading,
  Search
} from 'vant'
// import Vant from 'vant'
Vue.filter('relativeTime', relativeTime)
// Vue.use(Vant)
// Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()
// Vue.use(Lazyload)

// Vue.use(Vant)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(List)
Vue.use(Lazyload)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Icon)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Popup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tag)
Vue.use(Image)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Divider)
Vue.use(Loading)
Vue.use(Search)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
