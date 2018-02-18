<template>
  <div>
    <section class="section container">
      <div class="columns">
        <article class="column is-4">
          <p>Preenchendo este cadastro você poderá comprar e vender
            imóveis na Zumi. Qualquer dúvida, entre em contato conosco
            em <a href="mailto:contato@zumi.com.br">contato@zumi.com.br</a>.</p>
          <div>Já tem um cadastro? <a href="#login" @click.prevent="openLogin">Faça Login.</a></div>
        </article>
        <article class="column is-8">
          <user-form mode="create"/>
        </article>
      </div>
    </section>

    <app-footer/>
  </div>
</template>

<script>
import { buildMeta } from './meta.service'
import UserForm from '@/components/UserForm'
import EventBus from '@/event-bus'
// import { User } from '@/models'
// import Api from '@/api'

export default {
  head: buildMeta({title: 'Cadastro',
                   description: 'Crie seu cadastro de comprador ou vendedor na Zumi'}),
  components: {UserForm},
  methods: {
    openLogin() { EventBus.$emit('login-modal') }
  }
}
</script>

<style lang="scss" scoped>
article > div {
  margin-top: 1rem;
}
</style>
