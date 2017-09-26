<template>
  <main v-bind:class="'theme-' + color">
    <navbar></navbar>
    <sidebar></sidebar>
    <main-section></main-section>
  </main>
</template>

<script>
  import NavBar from './navbar.vue';
  import MainSection from './main-section.vue';
  import SideBar from './sidebar.vue';

  export default {
    computed: {
      color: function() {
        return this.$store.state.theme.color;
      }
    },
    components: {
      'navbar': NavBar,
      'main-section': MainSection,
      'sidebar': SideBar
    }
  }
</script>

<style scoped>
  body {
    padding-top: 90px;
  }
</style>