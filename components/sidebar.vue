<template>
  <aside v-bind:class="{ open: opened }" class="right-sidebar">
    <div class="container-fluid">
    </div>
  </aside>
</template>

<script>
    export default {
        computed: {
            opened: function() {
                return this.$store.state.sidebar.opened
            }
        }
    }
</script>