import Vue from 'vue'
import App from './App'
import router from './router.js'

Vue.config.productionTip = false

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
