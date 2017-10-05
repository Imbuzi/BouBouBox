<template>
    <div>
        <navbar></navbar>
        <sidebar></sidebar>
        <main-section></main-section>
    </div>
</template>

<script>
    import NavBar from './navbar.vue';
    import MainSection from './main-section.vue';
    import SideBar from './sidebar.vue';

    export default {
        computed: {
            user: function () {
                return this.$store.state.user;
            }
        },
        components: {
            'navbar': NavBar,
            'main-section': MainSection,
            'sidebar': SideBar
        }
    }
</script>

<style scoped>
    main {
        padding-top: 90px;
    }
</style>