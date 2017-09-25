<template>
  <aside v-bind:class="{ open: opened }" class="right-sidebar">
    <div class="container-fluid">
    </div>
  </aside>
</template>

<script>
  module.exports = {
    computed: {
      opened: {
        return this.$store.state.sidebar.opened
      }
    }
  }
</script>