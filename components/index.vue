<template>
    <main v-bind:class="'theme-' + color">
        <alert></alert>
        <transition name="slide">
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

    .slide-enter-active {
        transition: all .2s ease-out;
    }

    .slide-leave-active {
        transition: all .2s ease-in;
    }

    .slide-enter {
        transform: translateX(100vw);
    }

    .slide-leave-to {
        transform: translateX(-100vw);
    }
</style>