<template>
    <div class="switch">
        <label>OFF<input type="checkbox"><span class="lever" v-bind:class="'switch-col-' + color"></span>ON</label>
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