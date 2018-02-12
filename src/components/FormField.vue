<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control" :class="{ 'has-icons-right': hasError }">
      <input class="input" :type="type" v-model="innerValue"
             :class="{ 'is-danger': hasError }"
             @input="$emit('input', $event.target.value)"
             @blur="$v.innerValue.$touch()">
      <span class="icon is-small is-right" v-if="hasError">
        <f-a i="exclamation-triangle"/>
      </span>
    </div>
    <p class="help is-danger">
      <span v-if="hasError">{{ errorMessage }}</span>&nbsp;
    </p>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import * as validators from 'vuelidate/lib/validators'
// import { required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    spec: {type: Object, required: true},
    value: {type: [Number, String, Date]},
    type: {type: String, required: true},
    label: {type: String, required: true}
  },

  data() {
    return { innerValue: this.value,
             validations: Object.keys(this.spec) }
  },
  validations() {
    const spec = {}
    for (const k of this.validations) {
      if (this.spec[k]) spec[k] = validators[k](...this.spec[k])
      else spec[k] = validators[k]
    }
    return { innerValue: spec }
  },

  computed: {
    hasError() { return this.$v.innerValue.$error },
    errorMessage() {
      const goodKeys = this.$v.innerValue
      const errorKey = this.validations.find(k => !goodKeys[k])
      if (errorKey === 'required') 
        return `${ this.label } não pode ficar em branco.`
      else if (errorKey === 'minLength') 
        return `${ this.label } deve ter ${ this.$v.innerValue.$params.minLength.min } ou mais caracteres.`
      else if (errorKey === 'maxLength') 
        return `${ this.label } deve ter no máximo ${ this.$v.innerValue.$params.maxLength.max } caracteres.`
    }
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
