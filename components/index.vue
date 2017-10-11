<template>
    <main v-bind:class="'theme-' + color">
        <alert></alert>
        <transition v-bind:name="transitionName" mode="out-in">
            <router-view></router-view>
        </transition>
        <modal></modal>
    </main>
</template>

<script>
    import AlertComponent from './alert.vue';
    import ModalComponent from './modal.vue';

    export default {
        components: {
            'alert': AlertComponent,
            'modal': ModalComponent
        },
        computed: {
            color: function () {
                return this.$store.state.theme.color;
            }
        },
        watch: {
            '$route': function (to, from) {
                if (from.path === '/') {
                    this.transitionName = 'fade-instant-leave';
                } else if (to.path === '/') {
                    this.transitionName = 'slide-out-fade-in';
                } else {
                    this.transitionName = 'slide';
                }
            }
        }
    }
</script>

<style scoped>
    main {
        padding-top: 90px;
    }

    .fade-instant-leave-enter-active {
        transition: opacity .2s;
    }

    .fade-instant-leave-leave-active {
        transition: opacity 0s;
    }

    .fade-instant-leave-enter, .fade-instant-leave-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
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

    .slide-out-fade-in-enter-active {
        transition: opacity .2s;
    }

    .slide-out-fade-in-leave-active {
        transition: transform .2s ease-in;
    }

    .slide-out-fade-in-enter {
        opacity: 0;
    }

    .slide-out-fade-in-leave-to {
        transform: translateY(100vh);
    }
</style>