<template>
    <main v-bind:class="'theme-' + color">
        <alert></alert>
        <transition v-bind:name="transitionName" mode="out-in">
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
        },
        watch: {
            '$route': function(to, from) {
                this.transitionName = (from.path === '/') ? 'fade-instant-leave' : 'slide';
            }
        }
    }
</script>

<style scoped>
    main {
        padding-top: 90px;
    }

    .fade-instant-leave-enter-active {
        transition: opacity .2s
    }

    .fade-instant-leave-enter, .fade-instant-leave-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
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