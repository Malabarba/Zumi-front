<template>
  <div>
    <section class="section container">
      <div class="columns">
        <article class="column is-4 form-description">
          <p>Olá {{me.first_name}}, aqui você começa a cadastrar o seu imóvel.</p>
          <p>Anunciar seu imóvel na Zumi é completamente gratuito, nós só recebemos se você conseguir vender.</p>
        </article>
        <article class="column is-8">
          <!-- <property-form mode="update"/> -->
        </article>
      </div>
    </section>

    <app-footer/>
  </div>
</template>

<script>
import Api from '@/api'
import { buildMeta } from './meta.service'
import PropertyForm from '@/components/PropertyForm'

export default {
  head: buildMeta({title: 'Anunciar Imóvel',
                   description: 'Anuncie seu apartamento, casa, ou imóvel gratuitamente na Zumi'}),
  components: {PropertyForm},
  data() {
    return {
      me: Api.me.state
    }
  }
}
</script>
