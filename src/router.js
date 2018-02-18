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
const logged = { beforeEnter: (_, _2, next) => { me.queue(() => me.loggedIn ? next() : next('/')) } }
const notLogged = { beforeEnter: (_, _2, next) => { me.queue(() => !me.loggedIn ? next() : next('/')) } }

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/cadastro', name: 'Register', component: Register, ...notLogged},
    {path: '/meu-cadastro', name: 'UpdateMe', component: UpdateMe, ...logged},
    {path: '/troca-de-senha', name: 'UpdatePassword', component: UpdateMe},
    {path: '/como-funciona', name: 'HowItWorks', component: HowItWorks},
    {path: '/imoveis', props: {hasMap: false}, name: 'ListingIndex', component: ListingIndex},
    {path: '/imoveis-no-mapa', props: {hasMap: true}, name: 'ListingMap', component: ListingIndex},
    {path: '/imovel/:uniq_hash', props: true, name: 'ListingShow', component: ListingShow}
  ]
})
