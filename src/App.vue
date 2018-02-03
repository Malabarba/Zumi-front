<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// Core Declarations
@import 'assets/_variables.scss';

@import "~bulma/bulma";

.hidden-mobile {
  display: none;
}

@media only screen and (min-width: $tabletBreakpoint) {
  .hidden-mobile {
    display: block;
  }
}

.si-content {
  width: 400px;
  max-width: calc(90vw) !important;
  max-height: calc(60vh) !important;
}

.si-content-wrapper {
  padding: 5px !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
