import Vue from 'vue'
import VueHead from 'vue-head'
import Router from 'vue-router'
import Api from '@/api'

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
  console.log('[Router] Checking if logged');
  const failRoute = { path: '/cadastro', query: { redirect: to.fullPath } }
  me.queue(() => me.state.email ? next() : next(failRoute))
} }
const notLogged = { beforeEnter: (_, _2, next) => { me.queue(() => !me.loggedIn ? next() : next('/')) } }

/* eslint-disable no-multi-spaces */
export default new Router({
  mode: 'history',
  routes: [
    {path: '/',                  component: Home,         name: 'Home'},
    {path: '/cadastro',          component: Register,     name: 'Register',        ...notLogged},
    {path: '/meu-cadastro',      component: UpdateMe,     name: 'UpdateMe',        ...logged},
    {path: '/troca-de-senha',    component: UpdateMe,     name: 'UpdatePassword'},
    {path: '/como-funciona',     component: HowItWorks,   name: 'HowItWorks'},
    {path: '/imoveis',           component: ListingIndex, name: 'ListingIndex',    props: {hasMap: false}},
    {path: '/imoveis-no-mapa',   component: ListingIndex, name: 'ListingMap',      props: {hasMap: true}},
    {path: '/imovel/:uniq_hash', component: ListingShow,  name: 'ListingShow',     props: true}
  ]
})
