<template>
  <div>
    <section class="section container">
      <div class="columns">
        <article class="column is-6">
          <user-form/>
        </article>
        <article class="column is-6">
          <p>Criando esse cadastro, você...</p>
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
  components: {UserForm},
  props: [],
  data() {
    return {}
  }
}
</script>
