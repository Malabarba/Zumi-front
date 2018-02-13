<template>
  <div>
    <section class="section container">
      <div class="columns">
        <article class="column is-4">
          <p>Preenchendo este cadastro você poderá comprar e vender
            imóveis na Zumi.</p>
          <p>Qualquer dúvida, entre em contato conosco em
            <a href="mailto:contato@zumi.com.br">contato@zumi.com.br</a>.</p>
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
// import { User } from '@/models'
// import Api from '@/api'

export default {
  name: 'Register',
  head: buildMeta({title: 'Cadastro',
                   description: 'Crie seu cadastro de comprador ou vendedor na Zumi'}),
  components: {UserForm}
}
</script>
