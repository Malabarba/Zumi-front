<template>
  <form id="UserForm" class="columns is-multiline"
        @submit.prevent="submit">
    <form-field v-model="me.email" class="column is-6"
                label="Email" name="email" type="email"
                @error="e => errors.email = e"
                :spec="{ required: null, email: null }"/>
    <form-field v-if="isCreate" v-model="me.password" class="column is-6"
                label="Senha" name="password" type="password"
                @error="e => errors.password = e"
                :spec="{ required: null, minLength: [7] }"/>
    <form-field v-else v-model="me.phone" class="column is-6"
                placeholder="DD000000000"
                label="Telefone de contato" name="phone" type="tel"
                @error="e => errors.phone = e"
                :spec="{ minLength: [11], maxLength: [11] }"/>

    <form-field v-model="me.first_name" class="column is-6"
                label="Nome" name="first_name" type="text" id="name"
                @error="e => errors.first_name = e"
                :spec="{ required: null, minLength: [2] }"/>
    <form-field v-model="me.surname" class="column is-6"
                label="Sobrenome" name="surname" type="text"
                @error="e => errors.surname = e"
                :spec="{ required: null, minLength: [2] }"/>

    <form-field v-model="me.cpf" class="column is-6"
                :disabled="!isCreate"
                label="CPF (somente dígitos)" name="cpf" type="tel"
                @error="e => errors.cpf = e"
                :spec="{ required: null, minLength: [11], maxLength: [11] }"/>
    <form-field v-model="me.birth_date" class="column is-6"
                label="Data de Nascimento" name="birth_date" type="date"
                @error="e => errors.birth_date = e"
                :spec="{}"/>

    <form-field v-if="isCreate" v-model="me.phone" class="column is-6"
                placeholder="DD000000000"
                label="Telefone de contato" name="phone" type="tel"
                @error="e => errors.phone = e"
                :spec="{ minLength: [11], maxLength: [11] }"/>

    <div class="field column is-12">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" value="1.0" v-model="me.privacy_contract" required>
          Marque esta caixa se você concorda com os <a href="#">termos de uso e privacidade</a>.
        </label>
      </div>
    </div>

    <div class="field is-grouped column is-12">
      <div class="control" :title="firstError">
        <btn :l="isCreate ? 'Enviar' : 'Salvar'" type="submit"
             :class="{ 'is-loading': !firstError && running() }"
             :disabled="!me.privacy_contract || !!firstError || running()"/>
      </div>
      <div class="control">
        <btn l="Cancelar" as="text" type="reset" @click="$router.go(-1)"/>
      </div>
    </div>
  </form>
</template>

<script>
// import { User } from '@/models'
import Api from '@/api'
import FormField from '@/components/FormField.vue'

export default {
  components: {FormField},
  props: {
    mode: { required: true, type: String }
  },
  data() {
    const create = this.mode === 'create'
    return {
      me: Api.me.state,
      isCreate: create,
      errors: { first_name: true, surname: true, email: true, password: create, phone: true, cpf: create, birth_date: true }
    }
  },

  computed: {
    firstError() {
      return Object.values(this.errors).find(x => x) ||
             (!this.me.privacy_contract ? 'É necessário aceitar os termos.' : null)
    }
  },

  methods: {
    running: Api.me.pending,

    showMe() {
      window.vform = this
      console.log(this)
      console.log(this.me)
      console.log(this.errors)
      console.log(this.firstError)
    },

    submit() {
      this.showMe()
      if (this.firstError) return false
      if (this.isCreate) Api.me.create(this.me)
      else Api.me.update(this.me)
    }
  }
}
</script>

<style lang="scss">
#UserForm {
  .column {
    margin: 0;
    padding-top: 0;
  }
}
</style>
