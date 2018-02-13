<template>
  <button type="button" class="button" :class="classBinding"
          :disabled="disabled"
          @click.prevent="$emit('click', $event)">{{l}}</button>
</template>

<script>
export default {
  props: {
    as: { required: false, type: String, default: 'link' },
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
