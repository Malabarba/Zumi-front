<template>
  <div v-if="active" id="LoginForm"
       class="modal" style="display: initial">
    <div class="modal-background" @click="close"></div>
    <form class="modal-card" @keyup.enter="submit">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <form-field v-model="me.email"
                    label="Email" name="email" type="email"
                    @error="e => errors.email = e"
                    :spec="validations.email"/>
        <form-field v-model="me.password"
                    label="Senha" name="password" type="password"
                    @error="e => errors.password = e"
                    :spec="validations.password"/>
      </section>
      <footer class="modal-card-foot">
        <btn l="Enviar" @click="submit" :disabled="running()"
             :class="{ 'is-loading': running() }"/>
        <btn as="text" l="Cancelar" @click="close" aria-label="close"/>
      </footer>
    </form>
  </div>
</template>

<script>
import Api from '@/api'
import EventBus from '@/event-bus'
import FormField from '@/components/FormField.vue'

export default {
  components: {FormField},
  data() {
    return {
      active: false,
      me: { email: null, password: null },
      errors: { email: true, password: null },
      validations: {
        email: { required: null, email: null },
        password: { required: null, minLength: [2] }
      }
    }
  },
  created() { EventBus.$on('login-modal', this.open) },
  methods: {
    running: Api.me.pending,
    close() { this.active = false },
    open() { this.active = true },
    submit() { Api.me.login(this.me).then(this.close) }
  }
}
</script>

<style lang="scss">
@import '../assets/_variables.scss';
#LoginForm .modal-card {
  max-width: 400px;
}
</style>
