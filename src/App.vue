<template>
  <v-app>
    <Main />
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",
  components: {
    Main
  },
  created() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchCompanies");
  }
};
</script>
