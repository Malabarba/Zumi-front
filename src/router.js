import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
// import ListingIndex from '@/pages/ListingIndex'
// import ListingShow from '@/pages/ListingShow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home},
    // {path: '/imoveis', name: 'ListingIndex', component: ListingIndex, props: true},
    // {path: '/imovel/:uniq_hash', name: 'ListingShow', component: ListingShow, props: true},
  ]
})
