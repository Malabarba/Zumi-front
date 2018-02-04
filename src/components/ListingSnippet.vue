<template>
  <article class="box">
    <image-gallery :height="192" :images="galleryImages" :thumbnails="false"/>
    <router-link :to="'/imovel/' + listing.uniq_hash">
      <h2 class="title">{{ listing.price.toString() }}</h2>
      <h3 class="subtitle">
        {{ nbShort }} · {{ listing.property.type_text }}
      </h3>
      <div class="columns">
        <ul class="column">
          <li>{{ listing.furnished ? '' : 'Não ' }}Mobiliado</li>
          <li v-for="detail in listing.descList.slice(0, 2)" :key="detail.label">
            <f-a :i="detail.icon"></f-a>
            <strong>{{ detail.value }}</strong> <span>{{ detail.label }}</span>
          </li>
        </ul>
        <ul class="column">
          <li v-for="detail in listing.descList.slice(2)" :key="detail.label">
            <f-a :i="detail.icon"></f-a>
            <strong>{{ detail.value }}</strong> <span>{{ detail.label }}</span>
          </li>
        </ul>
      </div>
    </router-link>
  </article>
</template>

<script>
import ImageGallery from './ImageGallery'

export default {
  name: 'ListingSnippet',
  components: {ImageGallery},
  props: ['listing'],
  // data: { galleryImages: [] }
  computed: {
    nbShort() {
      return this.listing.property.address.neighborhood.replace(/ [(].*/, '')
    },
    galleryImages() {
      return this.listing.property.photos
                 .map(p => ({ small: p.file.thumb,
                              medium: p.file.medium,
                              big: p.file.url,
                              url: p.file.url,
                              description: p.description || '' }))
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';

:host {
  max-width: 400px;
}

article {
  margin-bottom: 1em;
}

a {
  color: inherit;
}
</style>
