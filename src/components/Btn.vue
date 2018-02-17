<template>
  <button type="button" class="button" :class="classBinding"
          @click="$emit('click', $event)"
          :disabled="disabled">{{l}}</button>
</template>

<script>
export default {
  props: {
    as: { required: false, type: String, default: 'primary' },
    l: { required: true, type: String },
    disabled: { required: false, type: Boolean, default: false }
  },

  computed: {
    classBinding() {
      const binding = { 'is-disabled': this.disabled }
      binding['is-' + this.as] = true
      return binding
    }
  }
}
</script>
