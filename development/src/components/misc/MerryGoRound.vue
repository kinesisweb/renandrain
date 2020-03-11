<template>
  <transition name="fade">
    <div class="merry-modal" v-if="active" @click="closeModal">
      <div class="merry-close">
        <v-btn class="mx-2" fab dark small @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="merry-carousel-container">
        <transition-group name="fade" tag="ul">
          <li
            v-for="(item, idx) in filteredImages"
            :key="item.src"
            v-show="image === idx"
            :style="imageWidth"
            class="image-container"
          >
            <div style="position: relative;">
              <img
                style="max-height: 100vh; max-width: 100vw;"
                :src="item.src"
              />
              <div class="image-caption glacial" v-if="item.caption">
                {{ item.caption }}
              </div>
            </div>
          </li>
        </transition-group>
      </div>
      <div class="merry-arrow-left">
        <v-btn class="mx-2" fab dark small @click.stop="prev">
          <v-icon dark large>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <div class="merry-arrow-right">
        <v-btn class="mx-2" fab dark small @click.stop="next">
          <v-icon dark large>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      image: null
    };
  },
  props: {
    images: {
      type: Array,
      required: true
    },
    active: {
      type: Boolean,
      default: () => false
    },
    selected: {
      type: Number,
      default: () => 0
    },
    arrows: {
      type: Boolean,
      default: () => true
    }
  },
  watch: {
    selected(v) {
      this.image = v;
    },
    active() {
      this.image = this.selected;
    }
  },
  created() {
    this.image = this.selected;
  },
  computed: {
    currentImage() {
      return this.images[Math.abs(this.image) % this.images.length];
    },
    filteredImages() {
      return this.images.map(item => {
        if (typeof item === "string") {
          return { src: item };
        } else return item;
      });
    },
    imageWidth() {
      const style = {};
      if (this.$vuetify.breakpoint.name === "xs") style.maxWidth = "100%";
      else style.maxWidth = "calc(100% - 80px)";
      return style;
    }
  },
  methods: {
    next() {
      let pending = this.image + 1;
      this.image = pending >= this.images.length ? 0 : pending;
    },
    prev() {
      let pending = this.image - 1;
      this.image = pending < 0 ? this.images.length - 1 : pending;
    },
    closeModal(ev) {
      const tag = ev.target.tagName.toLowerCase();
      if (tag !== "img" && tag !== "i") this.$emit("close");
    }
  }
};
</script>

<style scoped>
.image-container {
  top: 50%;
  left: 50%;
  max-height: 100%;
  width: 100%;
  height: auto;
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.5)
  );
  color: white;
  padding: 5px 4em;
  font-weight: bold;
  max-width: 100%;
}

ul {
  list-style-type: none;
}
.merry-modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
}

.merry-carousel-container img {
  max-width: 100%;
  max-height: 100%;
  height: auto;
}

.merry-close {
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 1;
}

.merry-arrow-left,
.merry-arrow-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.merry-arrow-left {
  left: 0;
}

.merry-arrow-right {
  right: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
