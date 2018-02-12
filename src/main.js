import Vue from 'vue'
import App from './App'
import router from './router.js'
import AppIcon from './components/AppIcon'
import AppFooter from './components/AppFooter'
import Btn from './components/Btn'

Vue.config.productionTip = false

Vue.component('f-a', AppIcon)
Vue.component('app-footer', AppFooter)
Vue.component('btn', Btn)

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
