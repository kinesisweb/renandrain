<template>
  <v-app>
    <router-view />
    <comp-footer />
  </v-app>
</template>

<script>
import CompFooter from "./components/Footer.vue";

export default {
  name: "App",

  components: {
    CompFooter
  },

  data: () => ({
    //
  }),
  beforeCreate() {
    this.$store.subscribe(mutation => {
      if (mutation.type === "setJWT") {
        localStorage.setItem("accessToken", mutation.payload);
        const decoded = mutation.payload
          ? JSON.parse(atob(mutation.payload.split(".")[1]))
          : {};
        this.$store.commit("setUserData", decoded);
      }
    });

    const token = localStorage.getItem("accessToken");

    if (!token) return;

    this.$store.commit("initialising", true);
    this.$store.commit("setJWT", token);

    this.$api({
      url: "/api/user/init"
    })
      .then(() => {
        this.$store.commit("initialising", false);
        console.log("Init complete");
      })
      .catch(() => {
        console.log("Init failed");
      });
  }
};
</script>

<style>
.glacial {
  font-family: "GlacialIndifferenceRegular" !important;
}

.glacial-bold {
  font-family: "GlacialIndifferenceBold" !important;
}

.v-application--wrap {
  justify-content: space-between;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

a {
  color: #5b7d87 !important;
  text-decoration: none !important;
  font-weight: bold;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ccc;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2b4251;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
