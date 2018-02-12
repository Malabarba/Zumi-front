<template>
  <form>
    <form-field label="Nome" v-model="me.first_name" type="text"
                :spec="validations.me.first_name"/>
    <form-field label="Sobrenome" v-model="me.surname" type="text"
                :spec="validations.me.surname"/>
    <form-field label="Email" v-model="me.email" type="email"
                :spec="validations.me.email"/>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Marque esta caixa se você concorda com os <a href="#">termos de uso e privacidade</a>.
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <div class="button is-link" @click="create()">Enviar</div>
      </div>
      <div class="control">
        <button class="button is-text" @click="$router.go(-1)">Cancelar</button>
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
      validations: {
        me: {
          first_name: nameVal,
          surname: nameVal,
          email: { required: null }
        }
      }
    }
  },

  create() {
    Api.me.show().then(this.setMe)
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
