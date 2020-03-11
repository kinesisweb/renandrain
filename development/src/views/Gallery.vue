<template>
  <div class="mb-10">
    <comp-header
      :background-image="require('../assets/images/banner1.png')"
      background-colour="#5B7D87"
      :title="gallery.title"
      :minimal="true"
    />
    <h1
      v-if="gallery.description"
      :style="'color:' + $store.state.colours[2]"
      class="text-center mt-10"
    >
      {{ gallery.description }}
    </h1>
    <gallery-thumbnails
      v-if="gallery.gallery_id"
      :images="images"
      :gallery="gallery"
      @loadImage="loadImage"
    />
    <merry-go-round
      v-if="gallery.gallery_id"
      :active="showCarousel"
      :selected="selectedImage"
      :images="galleryArray"
      @close="showCarousel = false"
    />
  </div>
</template>

<script>
import galleryThumbnails from "./galleries/thumbnails.vue";
import MerryGoRound from "../components/misc/MerryGoRound.vue";

export default {
  beforeCreate() {
    const cat = this.$route.params.category;
    const id = this.$route.params.id || "";

    const url = `/api/content/galleries/${cat}/${id}`;

    this.$api({ url, method: "get" }).then(res => {
      this.images = res.galleryImages;
      this.gallery = res.galleryInfo[0];
    });
  },
  data() {
    return {
      images: null,
      gallery: {},
      showCarousel: false,
      selectedImage: 0
    };
  },
  components: {
    galleryThumbnails,
    MerryGoRound
  },
  methods: {
    loadImage(img) {
      this.selectedImage = img;
      this.showCarousel = true;
    }
  },
  computed: {
    galleryRoot() {
      return `/static/galleries/${this.gallery.category}${this.gallery.path}/`;
    },
    galleryArray() {
      return this.images.map(item => {
        const obj = {};
        obj.src = this.galleryRoot + item.filename + "." + item.file_type;
        if (item.caption) obj.caption = item.caption;
        return obj;
      });
    }
  }
};
</script>
