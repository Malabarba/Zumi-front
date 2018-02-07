<template>
  <section v-if="listing" id="show" class="container section">
    <nav class="level"><router-link class="level-start" to="/imoveis">Voltar à busca</router-link></nav>

    <div class="columns">
      <div class="column is-8">
        <image-gallery :height="449" :thumbnails="true" :images="galleryImages"/>
      </div>

      <div class="column">
        <aside class="card" v-if="listing">
          <header class="card-header">
            <div class="card-header-title">
              <div>
                <h1 class="title">{{ listing.price.toString() }}</h1>
                <h2 class="subtitle">{{ listing.property.type_text }} · {{ listing.property.address.neighborhood }}</h2>
              </div>
            </div>
          </header>
          <div class="card-content">
            <div v-for="detail in listing.descList" :key="detail.label" class="card-details">
              <f-a :i="detail.icon"></f-a> <strong>{{ detail.value }}</strong> {{ detail.label }}
            </div>
            <button class="button is-large">Quero Visitar</button>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Quero Informações</a>
            <a href="#" class="card-footer-item">Salvar Favorito</a>
          </footer>
        </aside>
      </div>
    </div>
  </section>
</template>

<script>
import ImageGallery from '@/components/ImageGallery'
import { buildMeta } from './meta.service'
import { Listing } from '@/models'
import Api from '@/api'

export default {
  name: 'ListingShow',
  head: buildMeta({
    title: 'Compre e venda imóveis, sem terceiros',
    description: 'Imóveis Imóveis Imóveis'
  }),
  components: {ImageGallery},
  props: ['uniq_hash'],
  data() {
    return { listing: null }
  },
  created() { this.getListing() },

  computed: {
    galleryImages() {
      if (!this.listing) return []
      return this.listing.property.photos
                 .map(p => ({ thumbnail: p.file.small,
                              medium: p.file.url,
                              big: p.file.url,
                              url: p.file.url,
                              description: p.description || '' }))
    }
  },

  methods: {
    getListing() {
      Api.listing.show(this.uniq_hash).then(this.setListing)
    },

    setListing(data) {
      this.listing = Listing.from(data.listing)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';

section {
  padding-top: 1em;
}

.card-header-title {
  background-color: #f5f5f5;
}

.card-content {
  .card-details {
    margin-bottom: .5em;
    // background-color: #f5f5f5;
    // border-radius: 3px;
  }
  button {
    margin-top: .5em;
  }
}
</style>
