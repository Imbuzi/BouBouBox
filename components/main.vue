<template>
    <main v-bind:class="'theme-' + color">
        <template v-if="user">
            <navbar></navbar>
            <sidebar></sidebar>
            <main-section></main-section>
        </template>
        <template v-else>
            <login></login>
        </template>
    </main>
</template>

<script>
    import NavBar from './navbar.vue';
    import MainSection from './main-section.vue';
    import SideBar from './sidebar.vue';
    import Login from './login.vue';

    export default {
        computed: {
            color: function() {
                return this.$store.state.theme.color;
            },
            user: function () {
                return this.$store.state.user;
            }
        },
        components: {
            'navbar': NavBar,
            'main-section': MainSection,
            'sidebar': SideBar,
            'login': Login
        }
    }
</script>

<style scoped>
    main {
        padding-top: 90px;
    }
</style>