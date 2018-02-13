<template>
  <div id="app">
    <fullscreen-gallery/>
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
import Api from '@/api'
import AppHeader from './components/AppHeader.vue'
import FullscreenGallery from './components/FullscreenGallery.vue'

export default {
  name: 'App',
  components: { AppHeader, FullscreenGallery },
  created() { Api.me.show() }
}
</script>

<style lang="scss">
// Core Declarations
@import 'assets/_variables.scss';
@import "~bulma/bulma";

.si-content {
  width: 400px;
  max-width: calc(90vw) !important;
  max-height: calc(60vh) !important;
}

.si-content-wrapper {
  padding: 5px !important;
}

section.hero {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
