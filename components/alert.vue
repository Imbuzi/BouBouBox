<template>
    <div v-bind:class="{ open: opened }" class="bootstrap-notify-container alert alert-dismissible bg-black p-r-35">
        <button v-on:click.prevent="close" type="button" class="close">×</button>
        {{message}}
    </div>
</template>

<script>
    export default {
        methods: {
            close: function () {
                clearTimeout(this.$store.state.alert.timeout);
                this.$store.commit('toggleAlert', false);
            }
        },
        computed: {
            message: function () {
                return this.$store.state.alert.message;
            },
            opened: function () {
                return this.$store.state.alert.opened;
            }
        }
    }
</script>

<style scoped>
    .bootstrap-notify-container {
        display: inline-block;
        margin: 0px auto;
        position: fixed;
        transition: all 0.5s ease-in-out;
        z-index: 1000;
        top: -50px;
        left: 0px;
        right: 0px;
    }
    .bootstrap-notify-container.open {
        top: 20px;
    }

    .bootstrap-notify-container button.close {
        position: absolute;
        right: 10px;
        top: 5px;
        z-index: 1033;
    }
</style>