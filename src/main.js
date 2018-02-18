import Vue from 'vue'
import Api from './api'
import App from './App'
import router from './router.js'
import AppIcon from './components/AppIcon'
import AppFooter from './components/AppFooter'
import Btn from './components/Btn'

Api.me.show()

Vue.component('f-a', AppIcon)
Vue.component('app-footer', AppFooter)
Vue.component('btn', Btn)

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

if (Vue.config.devtools) {
  window.api = Api
  window.app = app
  window.Vue = Vue
  window.process = process
} else {
  if (!window.console) window.console = {}
  for (const method in ['log', 'debug', 'warn', 'info']) {
    console[method] = function() {}
  }
}
