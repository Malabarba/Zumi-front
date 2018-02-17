<template>
  <div class="box" id="FilterBox">
    <content></content>

    <div class="columns is-multiline">
      <div class="is-hidden-mobile column"></div>

      <div class="is-flex-mobile column is-narrow field has-addons">
        <div class="control"><a class="button is-static">Quartos</a></div>
        <div class="control">
          <div class="select">
            <select v-model="q.bedroom_count_gteq">
              <option></option>
              <option v-for="i in [1, 2, 3, 4]" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="is-flex-mobile column is-narrow field has-addons">
        <div class="control"><a class="button is-static">Banheiros</a></div>
        <div class="control">
          <div class="select">
            <select v-model="q.bathroom_count_gteq">
              <option></option>
              <option v-for="i in [1, 2, 3, 4]" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="is-flex-mobile column is-narrow field has-addons">
        <div class="control"><a class="button is-static">Área útil</a></div>
        <div class="control">
          <input type="number" class="input count" placeholder="10" min="11" max="200"
                 v-model="q.usable_size_gteq"/>
        </div>
        <div class="control"><a class="button is-static">m² ou +</a></div>
      </div>

      <div class="is-hidden-mobile column"></div>

      <div class="is-hidden-mobile column is-12 is-marginless is-paddingless"></div>

      <div class="is-hidden-mobile column"></div>

      <div class="field is-flex-mobile column is-narrow neighborhoods">
        <div class="control">
          <div class="select" :ngClass="{ 'is-loading': !nbOptions.length }">
            <select v-model="q.neighborhood_eq" :disabled="!nbOptions.length">
              <option :value="undefined">Bairro</option>
              <option v-for="o in nbOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="is-flex-mobile column is-narrow field">
        <div class="control">
          <div class="select">
            <select v-model="q.s">
              <option :value="undefined">Ordem</option>
              <option v-for="o in sortingOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="is-flex-mobile column field">
        <div class="control">
          <router-link class="button is-primary" :to="{path: '/imoveis', query: q}">Buscar</router-link>
        </div>
      </div>

      <div class="is-hidden-mobile column"></div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'

export default {
  data() {
    return {
      neighborhoods: [],
      sortingOptions: [{ value: 'price_cents desc', label: 'Preço, maior ao menor' },
                       { value: 'price_cents asc', label: 'Preço, menor ao maior' },
                       { value: 'usable_size desc', label: 'Área, maior ao menor' },
                       { value: 'usable_size asc', label: 'Área, menor ao maior' },
                       { value: 'price_per_area desc', label: 'Preço/m², maior ao menor' },
                       { value: 'price_per_area asc', label: 'Preço/m², menor ao maior' }],
      q: {...this.$route.query}
    }
  },
  computed: {
    nbOptions() {
      return this.neighborhoods.map(
        (n) => ({ value: n.name, label: `${n.name} (${n.count})` }))
    }
  },
  methods: {
    setQ() { this.q = {...this.$route.query} }
  },
  watch: { '$route': 'setQ' },
  created() {
    Api.listing.neighborhoods()
       .then(data => { this.neighborhoods = data.neighborhoods })
  }
}
</script>

<style lang="scss">
@import '../assets/_variables.scss';

#FilterBox {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.7);

  > div:not(:first-child) {
    margin-top: 1em;
  }

  .neighborhoods select {
    min-width: 11em !important;
    max-width: 11em !important;
    width: 11em !important;
  }

  input[type=number].count {
    max-width: 4em;
  }

  .column {
    justify-content: center;
  }
}
</style>
