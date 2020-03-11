<template>
  <div>
    <comp-parallax />
    <v-container class="mt-8">
      <v-row class="justify-center mx-auto" style="max-width: 830px">
        <v-col class="white-copy glacial pl-0" cols="12" md="6">
          <h1 class="text-center">Hi, I'm Ren</h1>
          <p class="text-center mt-4">
            And I believe that if a picture is worth a thousand words, design is
            using those words to tell a story. Whether it's a story about your
            brand, your product, or your event, my design philosophy revolves
            around telling that story in a way that makes your audience want to
            know more.
          </p>
          <div class="text-center">
            <v-btn text small to="#galleries-section">Galleries</v-btn>
            <v-btn text small to="#recent-projects-section"
              >Recent Projects</v-btn
            ><br />
            <v-btn text small to="/about">About Me</v-btn>
            <v-btn text small to="/pricing">Pricing</v-btn>
          </div>
        </v-col>
        <v-col class="pr-0" cols="12" md="6">
          <v-img
            :src="portrait"
            lazy-src="https://picsum.photos/id/11/10/6"
            aspect-ratio="1.25"
            max-width="500"
            max-height="400"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      class="mb-8"
      id="galleries-section"
      name="recent-projects-section"
    >
      <v-row>
        <v-col>
          <kinesis-image-grid
            :src="ImageGrid"
            resize
            hover
            gap="10px"
            :sm-options="{ cols: 3, rows: 3, width: 200, height: 200 }"
            :xs-options="{ cols: 2, rows: 4, width: 150, height: 200 }"
            :options="{ cols: 4, rows: 2, width: 200, height: 200 }"
          >
            <template v-slot:overlay1>
              <router-link
                to="/gallery/events/1"
                tag="div"
                class="image-grid-link align-end glacial text-uppercase"
                >Event Graphics</router-link
              >
            </template>
            <template v-slot:overlay2>
              <div class="align-end glacial text-uppercase">Web Media</div>
            </template>
            <template v-slot:overlay3>
              <router-link
                tag="div"
                to="/gallery/brand/3"
                class="image-grid-link align-end glacial text-uppercase"
                >Brand Design</router-link
              >
            </template>
            <template v-slot:overlay4>
              <router-link
                tag="div"
                to="/gallery/portrait/4"
                class="image-grid-link align-end glacial text-uppercase"
                >Portrait Art</router-link
              >
            </template>
            <template v-slot:overlay5>
              <div class="align-end glacial text-uppercase">Report Design</div>
            </template>
            <template v-slot:overlay6>
              <div class="align-end glacial text-uppercase">Logo Design</div>
            </template>
            <template v-slot:overlay7>
              <router-link
                tag="div"
                to="/gallery/photography/8"
                class="image-grid-link align-end glacial text-uppercase"
                >Photography</router-link
              >
            </template>
            <template v-slot:overlay8>
              <div class="align-end glacial text-uppercase">Website Design</div>
            </template>
          </kinesis-image-grid>
        </v-col>
      </v-row>
    </v-container>

    <comp-banner-stripe
      :background-image="banner"
      :background-size="'cover'"
      :background-repeat="'no-repeat'"
      :background-position="'bottom'"
      color="white"
    >
      <div class="glacial headline">
        <p style="padding:0;margin:0">Styles come and go.</p>
        <p>Good <b>design is a language,</b> not a style.</p>
      </div>
      <div class="glacial">- Massimo Vignelli</div>
    </comp-banner-stripe>

    <v-container class="home-buttons my-6" id="recent-projects-section">
      <v-row class="justify-center">
        <div class="button-grid">
          <template v-for="button in buttons">
            <a v-if="button.href" :href="button.href" :key="button.src">
              <img :src="require('../assets/home-buttons/' + button.src)" />
            </a>
            <img
              v-else
              :src="require('../assets/home-buttons/' + button.src)"
              :key="button.src"
            />
          </template>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CompParallax from "../components/Parallax";
import portrait from "../assets/images/portrait_ren.jpg";
import banner from "../assets/images/banner1.png";
import KinesisImageGrid from "../../../../lib/vue/components/ImageGrid";
import CompBannerStripe from "../components/BannerStripe";
import ImageGrid from "../assets/images/indexgrid.png";

export default {
  data() {
    return {
      portrait,
      banner,
      ImageGrid,
      buttons: [
        { src: "1.png" },
        { src: "2.png", href: "/gallery/portrait/4" },
        { src: "3.png" },
        { src: "4.png" },
        { src: "6.png" },
        { src: "5.png" }
      ],
      isActive: false
    };
  },
  components: {
    KinesisImageGrid,
    CompBannerStripe,
    CompParallax
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/globals.scss";

.image-grid-link {
  cursor: pointer;
}

.white-copy {
  color: $default-text-colour;
}

.hero-subheading {
  text-transform: uppercase;
}

.home-buttons {
  img {
    padding: 5px;
    max-width: 100%;
  }
}

.button-grid {
  display: grid;
  grid-template-columns: auto;
}

@media screen and (min-width: 600px) {
  .button-grid {
    grid-template-columns: 200px 200px;

    img {
      max-width: 200px;
    }
  }
}

@media screen and (min-width: 960px) {
  .button-grid {
    grid-template-columns: 200px 200px 200px;
  }
}
</style>
