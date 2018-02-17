<template>
  <form ref="root" @submit.prevent="submit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  mounted() { this.children('input')[0].focus() },

  methods: {
    children(tag) { return this.$refs.root.getElementsByTagName(tag) },
    submit(event) {
      const submit = [...this.children('button')].find(b => b.type === 'submit')
      if (submit) submit.focus()
      this.$emit('submit', event)
    }
  }
}
</script>
