<template>
  <form id="form">
    <form-field label="Email" v-model="me.email" type="email"
                @error="e => errors.email = e"
                :spec="validations.email"/>
    <form-field label="Senha" v-model="me.password" type="password"
                @error="e => errors.password = e"
                :spec="validations.password"/>

    <form-field label="Nome" v-model="me.first_name" type="text"
                id="name"
                @error="e => errors.first_name = e"
                :spec="validations.first_name"/>
    <form-field label="Sobrenome" v-model="me.surname" type="text"
                @error="e => errors.surname = e"
                :spec="validations.surname"/>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" required>
          Marque esta caixa se você concorda com os <a href="#">termos de uso e privacidade</a>.
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control" :title="firstError">
        <btn l="Enviar" @click="create()" :disabled="firstError"/>
      </div>
      <div class="control">
        <btn l="Cancelar" as="text" type="reset" @click="$router.go(-1)"/>
      </div>
    </div>
  </form>
</template>

<script>
import { User } from '@/models'
import Api from '@/api'
import FormField from '@/components/FormField.vue'

export default {
  components: {FormField},
  props: [],
  data() {
    const nameVal = { required: null, minLength: [2] }
    return {
      me: new User({}),
      errors: { first_name: true, surname: true, email: true, password: true },
      validations: {
        first_name: nameVal,
        surname: nameVal,
        email: { required: null, email: null },
        password: { required: null, minLength: [7] }
      }
    }
  },

  create() {
    Api.me.show().then(this.setMe)
  },

  computed: {
    firstError() { return Object.values(this.errors).find(x => x) }
  },

  methods: {
    create() {
      console.log(this.me)
      // Api.me.create(this.uniq_hash).then(this.setMe)
    },

    setMe(me) { this.me = me }
  }
}
</script>
