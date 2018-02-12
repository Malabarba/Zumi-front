<template>
  <div>
    <section class="hero is-medium is-bold">
      <div class="hero-body">
        <header class="section container">
          <listing-filter-box>
            <div class="has-text-centered"><h1 class="title">Encontre sua casa dos sonhos em São Paulo</h1></div>
          </listing-filter-box>
        </header>
      </div>
    </section>

    <section class="section container">
      <div class="columns">
        <article id="comprador" class="column is-6">
          <div>
            <h2 class="title is-4">Porque comprar conosco?</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
              est et expedita distinctio. Nam libero tempore, cum soluta nobis est
              eligendi optio cumque nihil impedit quo minus id quod maxime placeat
              facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus.</p>
          </div>
          <div class="has-text-centered">
            <router-link class="button is-primary" to="/imoveis">Ver Imóveis</router-link>
          </div>
        </article>

        <article id="vendedor" class="column is-6">
          <div>
            <h2 class="title is-4">Seja um Vendedor</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
              est et expedita distinctio. Nam libero tempore, cum soluta nobis est
              eligendi optio cumque nihil impedit quo minus id quod maxime placeat
              facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus.</p>
          </div>
          <div class="has-text-centered">
            <router-link class="button is-primary" to="/imoveis">Quero Vender</router-link>
          </div>
        </article>
      </div>
    </section>

    <app-footer/>
  </div>
</template>

<script>
import { buildMeta } from './meta.service'
import ListingFilterBox from '@/components/ListingFilterBox.vue'

export default {
  name: 'Home',
  head: buildMeta({
    title: 'Zumi - Compre e venda imóveis, sem terceiros',
    description: 'Imóveis Imóveis Imóveis'
  }),
  components: { ListingFilterBox }
}
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';

@media only screen and (max-width: $largestMobileScreen) {
  section.hero { background-image: url('../assets/images/pages/home/home-tv-v5.jpg') !important; }
}

@media only screen and (min-width: $tabletBreakpoint) {
  section.hero { background-image: url('../assets/images/pages/home/home-tv-v5.jpg') !important; }
}
</style>
