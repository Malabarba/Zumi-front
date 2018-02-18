import Vue from 'vue'
import Api from './api'
import App from './App'
import router from './router.js'
import AppIcon from './components/AppIcon'
import AppFooter from './components/AppFooter'
import Btn from './components/Btn'

Api.me.show()

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

if (Vue.config.devtools) {
  window.api = Api
  window.app = app
  window.Vue = Vue
  window.process = process
} else {
  if(!window.console) window.console = {};
  var methods = ["log", "debug", "warn", "info"];
  for(var i=0;i<methods.length;i++){
    console[methods[i]] = function(){};
  }
}
