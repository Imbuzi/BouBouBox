<template>
    <div class="container-fluid">
        <div class="row">
            <button v-bind:class="'bg-' + color" class="btn btn-default btn-circle">
                <i class="material-icons">person</i>
            </button>
            <span class="badge">XX</span>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            }
        }
    }
</script>