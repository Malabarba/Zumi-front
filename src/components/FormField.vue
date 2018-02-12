<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control" :class="{ 'has-icons-right': hasError }">
      <input class="input" :type="type" v-model="innerValue"
             :required="'required' in spec"
             :class="{ 'is-danger': hasError }"
             @input="$emit('input', $event.target.value)"
             @blur="$v.innerValue.$touch()">
      <span class="icon is-small is-right" v-if="hasError">
        <f-a i="exclamation-triangle"/>
      </span>
    </div>
    <p class="help is-danger">
      <span v-if="hasError">{{ label }} {{ errorMessage }}</span>&nbsp;
    </p>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import * as validators from 'vuelidate/lib/validators'

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

  create() { this.$emit('valid', !iv.$invalid) },

  validations() {
    const spec = {}
    for (const k of this.validations) {
      if (this.spec[k]) spec[k] = validators[k](...this.spec[k])
      else spec[k] = validators[k]
    }
    return { innerValue: spec }
  },

  computed: {
    hasError() {
      const iv = this.$v.innerValue
      this.$emit('valid', !iv.$invalid)
      return iv.$error
    },

    errorMessage() {
      const goodKeys = this.$v.innerValue
      const errorKey = this.validations.find(k => !goodKeys[k])
      if (!errorKey || !errorKey.length) return

      const p = this.$v.innerValue.$params
      if (errorKey === 'required') return `não pode ficar em branco.`
      else if (errorKey === 'email') return `não é um email válido.`
      else if (errorKey === 'minLength') return `deve ter ${p.minLength.min} ou mais caracteres.`
      else if (errorKey === 'maxLength') return `deve ter no máximo ${p.maxLength.max} caracteres.`
      else if (errorKey === 'minValue') return `deve ser pelo menos ${p.minValue.min}.`
      else if (errorKey === 'maxValue') return `deve ser no máximo ${p.maxValue.max}.`
    }
  }
}
</script>
