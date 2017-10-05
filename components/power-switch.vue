<template>
    <div class="switch">
        <label><input type="checkbox" v-on:change="$emit('value', $event.target.checked);"><span class="lever" v-bind:class="'switch-col-' + color"></span></label>
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