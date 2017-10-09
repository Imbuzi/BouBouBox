<template>
    <main v-bind:class="'theme-' + color">
        <alert></alert>
        <router-view></router-view>
    </main>
</template>

<script>
    import AlertComponent from './alert.vue';

    export default {
        beforeCreate: function () {
            if (this.$localStorage.get('accessToken')) {
                this.$store.commit('setToken', {
                    token: this.$localStorage.get('accessToken')
                });
            }
        },
        components: {
            'alert': AlertComponent
        },
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            }
        }
    }
</script>

<style scoped>
    main {
        padding-top: 90px;
    }
</style>