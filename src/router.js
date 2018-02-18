import Vue from 'vue'
import VueHead from 'vue-head'
import Router from 'vue-router'
import Api from '@/api'
import EventBus from '@/event-bus'

import Home from '@/pages/Home'
import HowItWorks from '@/pages/HowItWorks'
import ListingIndex from '@/pages/ListingIndex'
import ListingShow from '@/pages/ListingShow'
import Register from '@/pages/Register'
import UpdateMe from '@/pages/UpdateMe'

Vue.use(VueHead)
Vue.use(Router)

const me = Api.me
const logged = { beforeEnter: (to, _from, next) => {
  console.log('[Router] Checking if logged')
  me.queue(() => me.state.email ? next() : EventBus.$emit('login-modal', { afterLogin: next }))
} }
const notLogged = { beforeEnter: (_, _2, next) => { me.queue(() => !me.loggedIn ? next() : next('/')) } }

const cName = c => c.name || c.__file.replace('src/pages/', '').replace('.vue', '')
function entryToRoute(pr) {
  return { path: pr[0], name: cName(pr[1].component), ...pr[1] }
}
const makeRoutes = routes => Object.entries(routes).map(entryToRoute)

/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
const routes = {
  '/'                 : { component: Home },
  '/cadastro'         : { component: Register,     props: true, ...notLogged },
  '/meu-cadastro'     : { component: UpdateMe,     ...logged },
  '/troca-de-senha'   : { component: UpdateMe,     name: 'UpdatePassword' },
  '/como-funciona'    : { component: HowItWorks },
  '/imoveis'          : { component: ListingIndex, props: { hasMap: false } },
  '/imoveis-no-mapa'  : { component: ListingIndex, name: 'ListingMap', props: { hasMap: true } },
  '/imovel/:uniq_hash': { component: ListingShow,  props: true }
}
export default new Router({
  mode: 'history',
  routes: makeRoutes(routes)
})
