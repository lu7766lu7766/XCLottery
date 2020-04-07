import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import MyPlugin from './plugin'
import { JacPlugin } from 'jactools'
import './css/my.styl'

sync(store, router)

Vue.use(JacPlugin, {
  _, moment,
})
Vue.use(MyPlugin, {})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
