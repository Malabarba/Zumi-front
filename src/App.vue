<template>
  <div id="app">
    <login-modal/>
    <fullscreen-gallery/>
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import FullscreenGallery from '@/components/FullscreenGallery.vue'
import LoginModal from '@/components/LoginModal.vue'

export default {
  components: { AppHeader, FullscreenGallery, LoginModal }
}
</script>

<style lang="scss">
// Core Declarations
@import 'assets/_variables.scss';
@import "~bulma/bulma";

article.form-description > p:not(last-child) {
  margin-bottom: 1rem;
}

.button.is-primary:hover,
.button.is-primary.is-hovered {
  background-color: $primary-hover;
  border-color: $secondary-hover;
}

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
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
