<template>
  <div id="index">
    <section id="filtros" class="hero is-primary is-small">
      <div class="hero-body is-paddingless">
        <header class="section has-text-centered">
          <listing-filter-box/>
        </header>
      </div>
    </section>

    <section v-if="!hasMap" id="lista" class="section">
      <div v-if="!listings" class="loader">
      </div>
      <div class="columns is-multiline">
        <listing-snippet v-for="listing in listings" :listing="listing" :key="listing.uniq_hash"
                         class="column is-4"/>
      </div>
    </section>

    <section v-if="hasMap" id="search-map" style="height: calc(90vh);">
      <div style="height: 100%; overflow: scroll; width: 30%;">
        <div>
          <listing-snippet v-for="listing in displayedListings" :listing="listing" :key="listing.uniq_hash"/>
        </div>
      </div>
      <div style="height: 100%; width: 70%;" class="is-pulled-right">
        <!-- <agm-map style="height: 100%;" :zoom="11" :latitude="mapCenter?.lat" :longitude="mapCenter?.lng">
             <agm-marker v-for="marker in markers; let i = index" :latitude="marker.geo.lat" :longitude="marker.geo.lng" @markerClick="displayedListings = marker.group" :label="marker.group.length.toString()">
             </agm-marker>
             </agm-map> -->
      </div>
    </section>
  </div>
</template>

<script>
import ListingFilterBox from '@/components/ListingFilterBox'
import ListingSnippet from '@/components/ListingSnippet'
import { buildMeta } from './meta.service'
import { Listing } from '@/models'
import Api from '@/api'

function averageGeo(gs) {
  if (!gs.length) return null
  const add = (x, y) => x + y
  return { lat: gs.map(g => g.lat).reduce(add, 0) / gs.length,
           lng: gs.map(g => g.lng).reduce(add, 0) / gs.length }
}

function groupBy(xs, f) {
  const hash = xs.reduce(function(acc, x) {
    const val = f.call(x);
    (acc[val] = acc[val] || []).push(x)
    return acc
  }, {})
  return Object.keys(hash).map(k => ({ key: k, group: hash[k] }))
}

export default {
  name: 'ListingIndex',
  head: buildMeta({
    title: 'Busca de Imóveis',
    description: 'Escolha seus filtros e busque um imóvel para comprar em São Paulo.'
  }),
  components: {ListingFilterBox, ListingSnippet},

  props: {hasMap: {type: Boolean, required: true}},
  data() {
    return {
      listings: [],
      displayedListings: [],
      markers: [],
      mapCenter: null,
      filters: [{ label: 'filtro-1' }, { label: 'filtro-2' }],
      q: {}
    }
  },
  created() { this.doSearch(this.$route.query) },
  beforeRouteUpdate(to, _from, next) { this.doSearch(to.query); next() },

  methods: {
    doSearch(q) {
      this.q = {...q}
      this.setListings(null)
      const query = {}
      for (const key of Object.keys(this.q)) {
        if (key !== 'mode') query[`q[${key}]`] = this.q[key]
      }
      console.log('query', query)
      Api.listing.index(query)
             .then(data => this.setListings(data.listings.map(Listing.from)))
    },

    removeFilter(label) {
      this.filters = this.filters.filter(f => f.label !== label)
    },

    setListings(listings) {
      if (!listings) {
        this.listings = this.markers = this.mapCenter = null
        return
      }
      this.listings = listings
      this.markers = groupBy(listings, l => l.property.address.zip_code)
        .map(g => ({ geo: averageGeo(g.group.map(l => l.property.address)),
                     group: g.group }))
      this.mapCenter = averageGeo(this.markers.map(m => m.geo))
      console.log(this.displayedListings, this.listings, this.markers, this.mapCenter)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';

h1 {
  color: $title-color !important;
}

section.hero {
  background-image: url('../assets/images/pages/home/home-tv-v5.jpg') !important;
}

#search-map {
  // height: 100%;
  width: 100%;
  // display: inline-block;

  > div {
    display: inline-block;
  }
}

.loader {
  width: 100px;
  height: 100px;
  margin: auto;
}
</style>
