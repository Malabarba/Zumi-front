<template><i class="fas" :class="classes"></i></template>

<script>
export default {
  name: 'AppIcon',
  props: ['i'],
  computed: {
    classes() { return this.i.split(' ').map(x => 'fa-' + x) }
  }
}
</script>
