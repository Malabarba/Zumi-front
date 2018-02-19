<template>
  <div>
    <section class="section container" id="update-me">
      <div class="columns">
        <article class="column is-4">
          <p>Olá {{me.first_name}}, aqui você pode atualizar os seus
            dados.</p>
          <p>Se quiser trocar sua senha,
            <router-link to="/troca-de-senha">clique aqui</router-link></p>
          <p>Qualquer dúvida, entre em contato conosco em
            <a href="mailto:contato@zumi.com.br">contato@zumi.com.br</a>.</p>
        </article>
        <article class="column is-8">
          <user-form mode="update"/>
        </article>
      </div>
    </section>

    <app-footer/>
  </div>
</template>

<script>
import Api from '@/api'
import { buildMeta } from './meta.service'
import UserForm from '@/components/UserForm'

export default {
  head: buildMeta({title: 'Atualizar Cadastro',
                   description: 'Atualize seu dados cadastrais na Zumi.'}),
  components: {UserForm},
  data() {
    return {
      me: Api.me.state
    }
  }
}
</script>
