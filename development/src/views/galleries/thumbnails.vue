<!--
	Maybe add outline property to include thumbnail inside elevated card
-->
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-container fluid>
              <v-row justify="center">
                <v-col
                  cols="12"
                  :sm="6"
                  v-for="(image, idx) in images"
                  :key="image.filename"
                  :md="columnSize({ g: gallery.cols, i: image.cols })"
                >
                  <v-card
                    :flat="!image.outline"
                    tile
                    class="d-flex"
                    style="height:100%"
                  >
                    <v-img
                      :contain="!!image.contain"
                      :src="getOptimisedSource(image)"
                      @click="$emit('loadImage', idx)"
                      class="gallery-image-link"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    getOptimisedSource(image) {
      return `/static/galleries/${this.gallery.category}${this.gallery.path}/${image.filename}.optimised.${image.file_type}`;
    },
    columnSize({ g, i }) {
      return i ? i : g ? g : 3;
    }
  },
  data() {
    return {};
  },
  props: {
    images: {
      type: Array,
      required: true
    },
    gallery: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.gallery-image-link {
  cursor: pointer;
}
</style>
