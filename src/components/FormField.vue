<template>
  <div class="field" :title="disabled ? shortLabel + ' não pode ser alterado' : '' ">
    <label class="label">{{ label }}</label>
    <div class="control" :class="{ 'has-icons-right': hasError }">
      <input class="input" :type="type" :name="name"
             v-model="value"
             :placeholder="placeholder"
             :disabled="disabled"
             :maxlength="maxLength"
             :minlength="minLength"
             :required="'required' in spec"
             :class="{ 'is-danger': hasError }"
             @input="$emit('input', $event.target.value)"
             @blur="$v.value.$touch()">
      <span v-if="hasError" class="icon is-small is-right"
            style="color: inherit !important">
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

export default {
  mixins: [validationMixin],
  props: {
    spec: {type: Object, required: true},
    value: {type: [Number, String, Date]},
    type: {type: String, required: true},
    name: {type: String, required: false},
    placeholder: {type: String, required: false},
    disabled: {type: Boolean, required: false, default: false},
    label: {type: String, required: true}
  },

  data() { return { validations: Object.keys(this.spec) } },

  create() { this.emitError() },

  validations() {
    const spec = {}
    for (const k of this.validations) {
      if (this.spec[k]) spec[k] = validators[k](...this.spec[k])
      else spec[k] = validators[k]
    }
    return { value: spec }
  },

  methods: {
    emitError() {
      this.$emit('error', this.errorMessage || this.$v.value.$invalid)
    }
  },

  computed: {
    maxLength() { return (this.spec.maxLength || [])[0] },
    minLength() { return (this.spec.minLength || [])[0] },
    fixedLength() { return this.minLength && this.minLength === this.maxLength },

    shortLabel() { return this.label.replace(/ *\(.*/, '') },

    hasError() {
      this.emitError()
      return this.$v.value.$error
    },

    errorMessage() {
      const goodKeys = this.$v.value
      const errorKey = this.validations.find(k => !goodKeys[k])
      if (!errorKey || !errorKey.length) return

      const p = this.$v.value.$params
      let m
      if (errorKey === 'required') m = `não pode ficar em branco.`
      else if (errorKey === 'email') m = `não é um email válido.`
      else if ((errorKey === 'minLength' || errorKey === 'maxLength') && this.fixedLength)
        m = `deve ter ${p.minLength.min} caracteres.`
      else if (errorKey === 'minLength') m = `deve ter ${p.minLength.min} ou mais caracteres.`
      else if (errorKey === 'maxLength') m = `deve ter no máximo ${p.maxLength.max} caracteres.`
      else if (errorKey === 'minValue') m = `deve ser pelo menos ${p.minValue.min}.`
      else if (errorKey === 'maxValue') m = `deve ser no máximo ${p.maxValue.max}.`
      return m ? `${this.shortLabel} ${m}` : ''
    }
  }
}
</script>
