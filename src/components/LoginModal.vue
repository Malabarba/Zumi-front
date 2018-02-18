<template>
  <div v-if="active && !loggedIn" id="LoginForm" @keyup.esc.exact="close"
       class="modal" style="display: initial">
    <div class="modal-background" @click="close"></div>
    <formed class="modal-card" @submit="submit">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <form-field label="Email" v-model="me.email"
                    name="email" type="email"
                    @error="e => errors.email = e"
                    :spec="validations.email"/>
        <form-field label="Senha" v-model="me.password"
                    name="password" type="password"
                    @error="e => errors.password = e"
                    :spec="validations.password"/>
      </section>
      <footer class="modal-card-foot">
        <btn l="Enviar" type="submit" :disabled="running"
             :class="{ 'is-loading': running }"/>
        <btn as="text" l="Cancelar" @click="close"
             aria-label="close" style="margin: 0 auto" />
        <btn l="Não tenho login" @click="register" />
      </footer>
    </formed>
  </div>
</template>

<script>
import Api from '@/api'
import EventBus from '@/event-bus'
import FormField from '@/components/FormField.vue'
import Formed from '@/components/Formed'

export default {
  components: {Formed, FormField},
  mixins: [Api.me.mixin],
  data() {
    return {
      active: false,
      afterLogin: null,
      formQuery: {},
      me: { email: null, password: null },
      errors: { email: true, password: null },
      validations: {
        email: { required: null, email: null },
        password: { required: null, minLength: [2] }
      }
    }
  },
  created() { EventBus.$on('login-modal', this.open) },

  computed: { loggedIn: () => Api.me.loggedIn },
  methods: {
    close() { this.active = false },
    open({afterLogin, route} = {}) {
      this.active = true
      this.afterLogin = afterLogin
      this.formQuery = route ? { redirect: route } : {}
    },
    register() {
      this.active = false
      this.$router.push({name: 'Register', query: this.formQuery})
    },
    submit() {
      Api.me.login(this.me)
         .then(this.close)
         .then(this.afterLogin)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/_variables.scss';
#LoginForm .modal-card {
  max-width: 400px;
}
</style>
