<template>
  <comp-modal :value="showOverlay" @close="closeModal">
    <v-card>
      <v-carousel hide-delimiters continuous v-model="show">
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i"
          :src="getPath(root, item)"
          style="max-width: 100%; max-height: 100vh;"
        ></v-carousel-item>
      </v-carousel>
    </v-card>
  </comp-modal>
</template>

<script>
import CompModal from "../../components/Modal";
export default {
  props: {
    showOverlay: {
      type: Boolean,
      default: () => false
    },
    images: {
      type: Array,
      required: true
    },
    selectedImage: {
      type: Number,
      default: 0
    },
    root: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: 0
    };
  },
  created() {
    this.show = this.selectedImage;
    this.preload();
  },
  watch: {
    selectedImage(v) {
      this.show = v;
    }
  },
  methods: {
    preload() {
      this.images.forEach(image => {
        const obj = new Image();
        obj.src = this.getPath(this.root, image);
      });
    },
    getPath(root, item) {
      return root + item.filename + "." + item.file_type;
    },
    closeModal() {
      this.$emit("closeModal");
    }
  },
  components: {
    CompModal
  }
};
</script>
