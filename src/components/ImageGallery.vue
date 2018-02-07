<template>
  <div class="root">
    <figure v-if="images.length && images[selected]" class="level is-marginless" :style="figureStyle">
      <span class="level-left arrow"
            @click="setSelected(selected - 1)"
            :class="{ 'is-invisible': selected === 0 }">
        <f-a i="arrow-circle-left 2x"></f-a>
      </span>
      <div @click="openFullscreen()" class="description is-size-4">
        <p>{{ selected + 1 }}/{{ images.length }} {{ images[selected].description }}</p>
        <div v-if="canFullscreen" class="fullscreen-icon level"
             :class="{ clickable: canFullscreen }"><f-a i="expand 2x" class="level-item"></f-a></div>
      </div>
      <span :class="{ 'is-invisible': selected + 1 === images.length }"
            @click="setSelected(selected + 1)" class="level-right arrow">
        <f-a i="arrow-circle-right 2x"></f-a>
      </span>
    </figure>
    <nav class="level thumbnails" v-if="thumbnails" >
      <span class="level-left arrow"
            @click="setSelected(thumbsPerRow * (selectedThumbs - 1))"
            :class="{ 'is-invisible': selectedThumbs === 0 }">
        <f-a i="arrow-circle-left 2x"></f-a>
      </span>
      <div v-for="(image, i) in visibleThumbs" :key="i"
           class="level-item" :style="{ height: ''+ (height / 6) + 'px'}"
           @click="setSelected(selectedThumbs * thumbsPerRow + i)">
        <img :src="image.thumbnail"/>
      </div>
      <span class="level-right arrow"
            @click="setSelected(thumbsPerRow * (selectedThumbs + 1))"
            :class="{ 'is-invisible': selectedThumbs + 1 >= images.length / thumbsPerRow }">
        <f-a i="arrow-circle-right 2x"></f-a>
      </span>
    </nav>
  </div>
</template>

<script>
// import { Listing } from '../services/listing'
// GalleryImage {thumb, medium, big, url, description}
export const fullscreenGalleryData = {input: null} // = new EventEmitter();

export default {
  name: 'ImageGallery',
  components: {},
  props: {
    images: {default: [], required: true},
    height: {type: Number, required: true},
    canFullscreen: {type: Boolean, default: true, required: false},
    thumbnails: {type: Boolean, required: true},
    thumbsPerRow: {type: Number, default: 4, required: false},
    selected: {type: Number, default: 0, required: false}
  },

  computed: {
    selectedThumbs() {
      return Math.floor(this.selected / this.thumbsPerRow)
    },

    figureStyle() {
      return {
        height: '' + this.height + 'px',
        backgroundImage: 'url(' + this.images[this.selected].medium + ')'
      }
    },

    visibleThumbs() {
      return this.images.slice(this.selectedThumbs * this.thumbsPerRow,
                               (this.selectedThumbs + 1) * this.thumbsPerRow)
    }
  },

  methods: {
    setSelected(n) {
      this.selected = n
      if (this.selected >= this.images.length)
        this.selected = this.images.length - 1
      if (this.selected < 0) this.selected = 0
    },

    openFullscreen() {
      if (this.canFullscreen)
        fullscreenGalleryData.input = { images: this.images, i: this.selected }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';

.root {
  background-color: rgba(0, 0, 0, 0.9);
  padding: .5em;
  border-radius: $radius-large;
}

figure {
  overflow: hidden;
  width: 100%;
  height: 90%;
  margin-bottom: 1em;
  // background: rgba(0, 0, 0, 0.5);
  border-radius: $radius-large;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

f-a, i, svg {
  color: $primary-invert;

  .thumbnails & {
    color: $primary-invert;
  }
}

.arrow {
  padding: 1em;
  height: 100%;
  cursor: pointer;

  figure &.level-right { paddileft: 20%;}
  figure &.level-left { paddiright: 20%; }

  &:hover {
    f-a, i, svg { color: $primary; }
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.thumbnails {
  margin-top: .5em;
  // height: 10%;

  .level-item {
    max-height: 100% !important;
    cursor: pointer;

    img {
      max-height: 100%;
      max-width: 100%;
      // padding: 0.2em;
    }
  }
}

.description {
  vertical-align: text-top;
  text-align: center;
  width: 100%;
  height: 100%;

  p {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 5px;
    border-radius: $radius;
  }

  .fullscreen-icon {
    height: 100%;

    &.clickable { cursor: pointer; }
    f-a, i, svg {
      visibility: hidden;
      margin: auto;
    }
    &:hover f-a, &:hover i, &:hover svg {
      visibility: initial;
    }
  }
}
</style>
