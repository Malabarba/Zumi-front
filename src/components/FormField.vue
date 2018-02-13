<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control" :class="{ 'has-icons-right': hasError }">
      <input class="input" :type="type" :name="name"
             v-model="innerValue"
             :required="'required' in spec"
             :class="{ 'is-danger': hasError }"
             @input="$emit('input', $event.target.value)"
             @blur="$v.innerValue.$touch()">
      <span v-if="hasError" class="icon is-small is-right"
            style="color: inherit !important">
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
    name: {type: String, required: false},
    label: {type: String, required: true}
  },

  data() {
    return { innerValue: this.value,
             validations: Object.keys(this.spec) }
  },

  create() { this.emitError() },

  validations() {
    const spec = {}
    for (const k of this.validations) {
      if (this.spec[k]) spec[k] = validators[k](...this.spec[k])
      else spec[k] = validators[k]
    }
    return { innerValue: spec }
  },

  methods: {
    emitError() {
      this.$emit('error', this.errorMessage || this.$v.innerValue.$invalid)
    }
  },

  computed: {
    hasError() {
      this.emitError()
      return this.$v.innerValue.$error
    },

    errorMessage() {
      const goodKeys = this.$v.innerValue
      const errorKey = this.validations.find(k => !goodKeys[k])
      if (!errorKey || !errorKey.length) return

      const p = this.$v.innerValue.$params
      let m
      if (errorKey === 'required') m = `não pode ficar em branco.`
      else if (errorKey === 'email') m = `não é um email válido.`
      else if (errorKey === 'minLength') m = `deve ter ${p.minLength.min} ou mais caracteres.`
      else if (errorKey === 'maxLength') m = `deve ter no máximo ${p.maxLength.max} caracteres.`
      else if (errorKey === 'minValue') m = `deve ser pelo menos ${p.minValue.min}.`
      else if (errorKey === 'maxValue') m = `deve ser no máximo ${p.maxValue.max}.`
      return m ? `${this.label} ${m}` : ''
    }
  }
}
</script>
