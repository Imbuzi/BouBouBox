<template>
    <main v-bind:class="'theme-' + color">
        <alert></alert>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
</style>