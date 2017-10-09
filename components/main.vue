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
        beforeCreate: function () {
            if (!this.$store.state.user.token) {
                this.$router.replace('/login');
            }
        },
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

<style>
    body * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline: none;
    }
</style>