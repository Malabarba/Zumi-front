import Vue from 'vue'
import VueHead from 'vue-head'
import Router from 'vue-router'
import Home from '@/pages/Home'
import HowItWorks from '@/pages/HowItWorks'
import ListingIndex from '@/pages/ListingIndex'
import ListingShow from '@/pages/ListingShow'
import Register from '@/pages/Register'

Vue.use(VueHead)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/cadastro', name: 'Register', component: Register},
    {path: '/como-funciona', name: 'HowItWorks', component: HowItWorks},
    {path: '/imoveis', props: {hasMap: false}, name: 'ListingIndex', component: ListingIndex},
    {path: '/imoveis-no-mapa', props: {hasMap: true}, name: 'ListingMap', component: ListingIndex},
    {path: '/imovel/:uniq_hash', props: true, name: 'ListingShow', component: ListingShow}
  ]
})
