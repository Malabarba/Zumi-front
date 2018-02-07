<template>
  <div v-if="input" id="FullscreenGallery" class="root is-overlay">
    <a class="delete" @click="input = null"></a>
    <image-gallery :images="input.images" :height="550"
                   :canFullscreen="false" :thumbnails="true"
                   :selected="input.i"/>
  </div>
</template>

<script>
import ImageGallery, { fullscreenGalleryData } from './ImageGallery'

export default {
  components: {ImageGallery},
  data() { return fullscreenGalleryData }
  // private sub = fullscreenGallery.subscribe(e => this.input = e);
}
</script>

<style lang="scss">
@import '../assets/_variables.scss';

#FullscreenGallery.root {
  position: fixed;
  width: calc(100vw);
  height: calc(100vh);
  background-color: rgba(0, 0, 0, 0.9);
  z-index: $index_overlay;

  a.delete {
    position: absolute;
    top: 5px;
    left: calc(90vw);
    height: calc(8vw) !important;
    width: calc(8vw) !important;
    max-height: calc(8vw) !important;
    max-width: calc(8vw) !important;
    z-index: $index_above_overlay;

    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
