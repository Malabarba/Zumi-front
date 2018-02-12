<template>
  <button type="button" class="button" :class="['is-' + as]">{{l}}</button>
</template>

<script>
export default {
  props: {
    as: { required: false, type: String, default: 'link' },
    l: { required: true, type: String }
  }
}
</script>
